import express from "express";
import cors from "cors";

import mysql from "mysql";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "E_MentalHealth",
});

app.post("/register", (req, res) => {
  const sql = "INSERT INTO User (`userName`,`email`,`userPass`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.userName, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data Error in server" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Express App is listening to ${PORT}`);
});
