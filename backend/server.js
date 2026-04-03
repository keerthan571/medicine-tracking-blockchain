const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let medicines = [];

// 🔹 LOGIN API
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (username === "admin") {
    res.json({ role: "admin" });
  } else if (username === "distributor") {
    res.json({ role: "distributor" });
  } else {
    res.json({ role: "viewer" });
  }
});

// 🔹 ADD MEDICINE
app.post("/medicine", (req, res) => {
  const { id, name } = req.body;

  medicines.push({ id, name, status: "Manufactured" });

  res.json({ message: "Medicine added" });
});

// 🔹 UPDATE STATUS
app.put("/status", (req, res) => {
  const { id, status } = req.body;

  const medicine = medicines.find(m => m.id === id);

  if (medicine) {
    medicine.status = status;
    res.json({ message: "Status updated" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// 🔹 VIEW HISTORY
app.get("/history/:id", (req, res) => {
  const medicine = medicines.find(m => m.id === req.params.id);

  if (medicine) {
    res.json(medicine);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// 🔹 START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
