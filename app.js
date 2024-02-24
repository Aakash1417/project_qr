const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Load environment variables
dotenv.config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// URL routes
// QR page
app.get(["/", "/qr/", "/qr/:value/"], (req, res) => {
  const value = req.params.value || "No value provided";
  // You can pass the value to your QR page using a template engine or as a query parameter
  res.sendFile(__dirname + "/public/qr_page.html");
});

// Example Firebase write
app.get("/write-to-firebase/", async (req, res) => {
  try {
    await addDoc(collection(db, "myCollection"), { key: "value" });
    res.send("Data written to Firebase");
  } catch (error) {
    console.error("Error writing to Firebase:", error);
    res.status(500).send("Error writing to Firebase");
  }
});

// Path: app.js

app.post("/api", (req, res) => {
  console.log(req.body); // Log the request body
  res.json({ message: "Data received", receivedData: req.body });
});

// Handle 404
app.use((req, res, next) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
