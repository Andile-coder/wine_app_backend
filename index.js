const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

app.use(express.json());
const port = process.env.PORT || 3001;

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const wineRoutes = require("./routes/wineRoutes");
app.use("/wine", wineRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
