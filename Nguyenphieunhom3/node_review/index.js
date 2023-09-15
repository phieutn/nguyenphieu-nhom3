import express from "express";
import "dotenv/config";
import { connectToDatabase } from "./db.js";
import router from "./routes/route.js";

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use("/api/v1", router)

app.listen(PORT, () => {
  console.log(`App is running at port: ${PORT}`);
});
