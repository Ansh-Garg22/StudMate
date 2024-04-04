const express = require("express");
const path = require("path");
const http = require("http");
const Message = require("./models/message");
const socketIo = require("socket.io");
const authRoutes = require("./routes/chatauth");
const roomController = require("./controllers/room");
const messageController = require("./controllers/message");
const cookieParser = require("cookie-parser");
const User =require("./models/user");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const feedRoute = require("./routes/feedRoute");
const { checkAuth, restrictToLoggedinUserOnly } = require("./middlewares/auth");
const { handleSubjectCreation } = require("./controllers/subject");
const { connectToMongoDb } = require("./connect");
const markAttendanceRoute = require("./routes/markatt");
//io server
const app = express();

const server = http.createServer(app);
const io = socketIo(server); // Attach Socket.IO to the HTTP server

//variables
const PORT = 3000;

//mongo
connectToMongoDb("mongodb+srv://Bandar:bandar0123@cluster0.txh1lwj.mongodb.net/studease?retryWrites=true&w=majority&appName=Cluster0").then(() =>
  console.log("Mongodb connected")
);

//views(ejs)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/feedback-s", feedRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.use(express.static("public"));
//routes
// app.use("/user", userRoute);
app.get("/home", (req, res) => {
  res.render("home");
});

app.use("/markAttendance", markAttendanceRoute);

app.post("/subjects", handleSubjectCreation);

// app.get("/about", (req, res) => {
//   res.end("hello about is running :)");
// });
// Routes

app.use("/chatroom", authRoutes);
app.get("/chatting", restrictToLoggedinUserOnly, roomController.renderChatRoom);
app.get(
  "/get-messages",
  restrictToLoggedinUserOnly,
  messageController.getMessages
);


//PORT
server.listen(PORT, () => {
  console.log(`Server started at Port ${PORT}`);
});
//chat application

// Create the global chat room if it doesn't exist
const Room = require("./models/room");
async function createGlobalChatRoom() {
  try {
    const room = await Room.findOne();
    if (!room) {
      const newRoom = new Room();
      await newRoom.save();
      console.log("Global Chat Room created");
    } else {
      console.log("Global Chat Room already exists");
    }
  } catch (error) {
    console.error("Error creating Global Chat Room:", error);
  }
}

// Call the function to create the global chat room
createGlobalChatRoom();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-room", async (userId) => {
    try {
      const room = await Room.findOne();
      if (room) {
        socket.join(room._id.toString());
        console.log(`User ${userId} joined room ${room._id}`);
      } else {
        console.error("No chat room found");
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  });
  socket.on("send-message", async (data) => {
    const { content, senderId, sendername } = data;
    const room = await Room.findOne();
    const user = await User.findById(senderId);

    const message = new Message({
      content,
      sender: user._id, // Assign the ObjectId reference to the User document
    });
    await message.save();

    io.to(room._id.toString()).emit("new-message", {
      content: message.content,
      sender: {
        _id: user._id, // Use the ObjectId reference
        username: user.name, // Include the username
      },
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
