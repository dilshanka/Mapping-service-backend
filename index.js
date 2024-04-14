
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


const mongoDBURI = "mongodb+srv://dilshankavindu076:517672@cluster0.rp26uom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoDBURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in Connecting to Database"));
db.once("open", () => {
    console.log("Connected to Database");
});

app.post("/", async (req, res) => {
    try {
        const { name, city, phno, address } = req.body;

        const  data = {
            name,
            city,
            phno,
            address
        };

        await db.collection("users").insertOne(data);
        console.log("Record Inserted Successfully");
        console.log(data);

    } catch (error) {
        console.error("Error inserting record:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
