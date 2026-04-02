const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// import routes
const medicineRoutes = require("./routes/medicine");
app.use("/api", medicineRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
