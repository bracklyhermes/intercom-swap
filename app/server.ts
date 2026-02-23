import express from "express";
import { generateQuote } from "../services/swapEngine.js";
import { simulateSwap } from "../services/executor.js";

const app = express();
app.use(express.json());

app.post("/quote", (req, res) => {
  const { input, output, amount } = req.body;
  res.json(generateQuote(input, output, amount));
});

app.post("/simulate", (req, res) => {
  res.json(simulateSwap(req.body));
});

app.listen(3000, () => {
  console.log("🚀 IntercomSwap running on http://localhost:3000");
});