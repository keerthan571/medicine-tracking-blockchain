# 💊 Medicine Tracking System (Blockchain)

A full-stack blockchain-based application to track medicines across the supply chain using Ethereum.
This system ensures **secure, transparent, and tamper-proof tracking** of medicines from manufacturer to customer.

---

## 🚀 Features

* 🔐 Role-based authentication (Admin, Distributor, Viewer)
* 💊 Add medicines (Admin)
* 🚚 Update medicine status (Distributor)
* 📍 Track complete medicine journey (Viewer)
* ⛓️ Blockchain-based storage (Ethereum + Ganache)
* ✅ Strict status flow control
* ❌ Prevents duplicate or invalid updates
* 📦 Real-world supply chain simulation

---

## 🎯 Workflow

1. **Admin** adds a medicine
2. **Distributor** updates status in correct order:

   ```
   Order Placed → Packed → Shipped → Out for Delivery → Delivered
   ```
3. **Viewer** tracks medicine using ID

---

## 🛠️ Tech Stack

### 🌐 Frontend

* React.js
* CSS (Custom UI)

### ⚙️ Backend

* Node.js
* Express.js

### ⛓️ Blockchain

* Solidity
* Ganache (Local Ethereum Blockchain)
* Ethers.js

---

## 📂 Project Structure

```
medicine-tracking-blockchain/
│
├── backend/
│   ├── server.js
│   ├── contractDetails.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│
└── README.md
```

---

## ⚙️ Setup & Installation

### 🧱 1. Start Blockchain (Ganache)

Run Ganache locally on:

```
http://127.0.0.1:7545
```

---

### 🔗 2. Deploy Smart Contract

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

👉 Copy deployed contract address
👉 Update it in:

```
backend/contractDetails.json
```

---

### 🖥️ 3. Start Backend

```bash
cd backend
npm install
node server.js
```

---

### 🌐 4. Start Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔒 Key Concepts

* Blockchain ensures **tamper-proof data**
* Each status update is stored as a transaction
* Strict validation prevents incorrect tracking flow
* Role-based access improves security

---

## 📸 Example Tracking Flow

```
🏭 Order Placed      → Factory
📦 Packed            → Distributor
🚚 Shipped           → Logistics Hub
🛵 Out for Delivery  → Local Center
🏠 Delivered         → Customer
```

---

## 💯 Future Enhancements

* 🗄️ Database integration (MongoDB)
* 📱 Mobile application
* 🌍 Deployment on public Ethereum network
* 📷 QR code-based tracking
* 📊 Admin dashboard & analytics

---

## 👨‍💻 Author

**Keerthan Poojari**
**Nagaraj Shenoy S**
**Madhan Gowda M B**
**Mahesha**

---

## 📌 Note

This project uses a **local blockchain (Ganache)** for development and testing purposes.
