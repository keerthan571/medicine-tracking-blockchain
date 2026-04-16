const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const contractData = require("./contractDetails.json");

// ================= AUTH =================
const fs = require("fs");

let users = [];
const SECRET = "secret123";

// 🔥 Load users from file
if (fs.existsSync("users.json")) {
  users = JSON.parse(fs.readFileSync("users.json"));
}

// 🔥 Save users
const saveUsers = () => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

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

  saveUsers(); // ✅ IMPORTANT LINE ADDED

  res.send("Signup successful ✅");
});
// ================= BLOCKCHAIN =================
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");

const signer = new ethers.Wallet(
  "0x6a207bed435e81006443720df940e52211c3c205eed46c87159c62c220811c19",
  provider
);

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

    // 🔥 Extract all previous statuses
    const doneStatuses = history.map(h => h.status);

    // ❌ Block if already done ANYTIME before
    if (doneStatuses.includes(status)) {
      return res.status(400).send(`${status} already completed ❌`);
    }

    // 🟡 First step MUST be Order Placed
    if (history.length === 0) {
      if (status !== "Order Placed") {
        return res.status(400).send("First status must be Order Placed ❌");
      }
    } else {
      const lastStatus = history[history.length - 1].status;

      const lastIndex = flow.indexOf(lastStatus);
      const newIndex = flow.indexOf(status);

      // ❌ enforce strict order
      if (newIndex !== lastIndex + 1) {
        return res.status(400).send(
          `Next step must be: ${flow[lastIndex + 1]} ❌`
        );
      }
    }

    const tx = await contract.updateStatus(id, status, location);
    await tx.wait();

    res.send("Status updated ✅");

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).send("Error updating status ❌");
  }
});
// ================= TRACK =================
app.get("/track/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const existing = await contract.medicines(id);

    if (!existing.id || existing.id === "") {
      return res.status(400).send("Medicine not found ❌");
    }

    const history = await contract.getHistory(id);

    if (!history || history.length === 0) {
      return res.json([]); // 👈 no error
    }

    const formatted = history.map(h => ({
      status: h.status,
      location: h.location,
      timestamp: Number(h.timestamp),
    }));

    res.json(formatted);

  } catch (err) {
    console.log("TRACK ERROR:", err);
    res.status(500).send("Error fetching history ❌");
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});