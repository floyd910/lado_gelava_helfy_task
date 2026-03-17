const express = require("express");
const cors = require("cors");
const tasksRoute = require("./routes/Tasks");
const app = express();
const port = 4000;

const allowedOrigins = ["http://localhost:5173"];

//took from stack overflow
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type"],
};
//

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", tasksRoute);

app.get("/", (req, res) => {
  res.send("Welcome to server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
