import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import morgan from 'morgan'
// import compression from 'compression'

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import tweetRoutes from "./routes/tweet.js"

import { register } from "./controllers/auth.js";
import { fileURLToPath } from "url";
import { customAlphabet } from "nanoid";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const nanoid = customAlphabet('1234567890abcdef', 22)

const app = express();

app.use(express.json());
// app.use(compression());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        const fileName = nanoid() + '.' + extension;
        req.body.profile_path = fileName;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
    res.status(200).json({ "Health": "OK" });
});

app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);

/* SERVER SETUP */
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => console.log(`server running on http://localhost:${PORT}`));
    })
    .catch(err => console.log("Error with setup" + err));