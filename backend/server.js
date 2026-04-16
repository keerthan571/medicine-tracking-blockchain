const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const contractData = require("./contractDetails.json");

// ================= AUTH =================
const users = [];
const SECRET = "secret123";

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.status(400).send("Invalid credentials ❌");

  const token = jwt.sign({ role: user.role }, SECRET);
  res.json({ token, role: user.role });
});

// ================= SIGNUP =================
app.post("/signup", (req, res) => {
  const { username, password, role } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).send("User exists ❌");

  users.push({ username, password, role });
  res.send("Signup successful ✅");
});

// ================= BLOCKCHAIN =================
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

const signer = provider.getSigner(0);

const contract = new ethers.Contract(
  contractData.address,
  contractData.abi,
  signer
);

// ================= ADD MEDICINE =================
app.post("/addMedicine", async (req, res) => {
  try {
    const { id, name, manufacturer } = req.body;

    const existing = await contract.medicines(id);

    if (existing.id && existing.id !== "") {
      return res.status(400).send("Medicine already exists ❌");
    }

    const tx = await contract.addMedicine(id, name, manufacturer);
    await tx.wait();

    res.send("Medicine added ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding medicine");
  }
});
//================Load all medicine================
app.get("/getAllMedicines", async (req, res) => {
  try {
    const ids = await contract.getAllMedicineIds();

    const medicines = [];

    for (let id of ids) {
      const med = await contract.medicines(id);

      // skip empty ones
      if (!med.id || med.id === "") continue;

      medicines.push({
        id: med.id,
        name: med.name,
        manufacturer: med.manufacturer
      });
    }

    res.json(medicines);

  } catch (err) {
    console.log("FETCH ERROR:", err);
    res.status(500).send("Error fetching medicines ❌");
  }
});
// ================= UPDATE STATUS =================
app.post("/updateStatus", async (req, res) => {
  try {
    const { id, status, location } = req.body;

    const existing = await contract.medicines(id);

    if (!existing.id || existing.id === "") {
      return res.status(400).send("Medicine not found ❌");
    }

    const history = await contract.getHistory(id);

    const flow = [
      "Order Placed",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered"
    ];

    // 🟡 If no history → only allow Order Placed
    if (history.length === 0) {
      if (status !== "Order Placed") {
        return res.status(400).send("First status must be Order Placed ❌");
      }
    } else {
      const lastStatus = history[history.length - 1].status;

      // ❌ Prevent duplicate
      if (lastStatus === status) {
        return res.status(400).send(`${status} already updated ❌`);
      }

      // ❌ Prevent wrong order
      const lastIndex = flow.indexOf(lastStatus);
      const newIndex = flow.indexOf(status);

      if (newIndex !== lastIndex + 1) {
        return res.status(400).send(
          `Invalid status flow ❌. Next should be: ${flow[lastIndex + 1]}`
        );
      }
    }

    const tx = await contract.updateStatus(id, status, location);
    await tx.wait();

    res.send("Status updated ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating status");
  }
});
// ================= TRACK =================
app.get("/track/:id", async (req, res) => {
  try {
    const history = await contract.getHistory(req.params.id);

    const formatted = history.map(h => ({
      status: h.status,
      location: h.location,
      timestamp: Number(h.timestamp),
    }));

    res.json(formatted);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching history");
  }
});

app.get("/track/:id", async (req, res) => {
  try {
    console.log("Tracking ID:", req.params.id);

    const history = await contract.getHistory(req.params.id);

    const formatted = history.map(h => ({
      status: h.status,
      location: h.location,
      timestamp: Number(h.timestamp),
    }));

    res.json(formatted);
  } catch (err) {
    console.log("TRACK ERROR:", err);
    res.status(500).send("Error fetching history");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});