import express from "express";
//import chatRouter from "./features/chat/api/chatController";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
// app.use("/chat", chatRouter);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("API escuchando en http://localhost:3000");
});