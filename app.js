const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeApp } = require("firebase/app");

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

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Import and use routes
const routes = require("./routes")(firebaseApp);
app.use(routes);

app.use((req, res, next) => {
    if (req.path.endsWith(".js")) {
        res.type("application/javascript");
    }
    next();
});

// Handle 404
app.use((req, res, next) => {
    res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
