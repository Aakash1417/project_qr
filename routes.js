const express = require("express");
const {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} = require("firebase/firestore");
const StudyData = require("./public/studyData");

const router = express.Router();

function routes(firebaseApp) {
    const db = getFirestore(firebaseApp);

    // QR page
    router.get(["/", "/qr/"], (req, res) => {
        const value = req.params.value || "No value provided";
        res.sendFile(__dirname + "/public/qr_page.html");
    });

    router.get(["/qr/:value/"], (req, res) => {
        const value = req.params.value || "No value provided";
        res.sendFile(__dirname + "/public/qr_view.html");
    });

    router.post("/api", async (req, res) => {
        const searchValue = req.body.searchValue;
        try {
            const q = query(
                collection(db, "things"),
                where("id", "==", searchValue)
            );
            const querySnapshot = await getDocs(q);
            let studyDataList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const studyData = new StudyData({
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    author: data.author,
                });
                studyDataList.push(studyData);
            });
            res.json({ message: "Data received", receivedData: studyDataList });
        } catch (error) {
            console.error("Error searching Firestore:", error);
            res.status(500).send("Error searching Firestore");
        }
    });

    return router;
}

module.exports = routes;
