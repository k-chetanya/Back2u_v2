import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import itemRoutes from "./routes/item.route.js";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://back2u-v2.vercel.app"
  ],
  credentials: true
}));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/item", itemRoutes);


// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

app.listen(PORT, () => {
    connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
