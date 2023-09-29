import express from "express";
import cors from "cors";

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

// GET REQUEST
app.get("/getData", (reqData, resData) => {
  resData.send("data");
});

app.post("/data", (reqData, resData) => {
  const { name, spirit } = reqData.body;

  const newString = name + spirit;

  resData.json({ newString });
});

app.listen(PORT, () => {
  console.log(`Express App is listening to ${PORT}`);
});
