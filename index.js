const express = require("express");
const path = require("path");

const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const { connectToMongoDb } = require("./connect");
//variables
const PORT = 8000;
const app = express();

//mongo
connectToMongoDb("mongodb://127.0.0.1:27017/studease").then(() =>
  console.log("Mongodb connected")
);

//views(ejs)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/", staticRoute);

//routes
app.use("/user", userRoute);

app.get("/about", (req, res) => {
  res.end("hello about is running :)");
});

//PORT
app.listen(PORT, () => console.log(`Server started at Port ${PORT}`));
