const express = require('express');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

const tutorialRoutes = require("./routes/tutorial_routes.js");

app.use(tutorialRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


