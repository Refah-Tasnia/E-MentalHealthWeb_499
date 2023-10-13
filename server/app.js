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
  const sql =
    "INSERT INTO Users (`userName`,`email`,`phone`,`userPass`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.password,
  ];
  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json({ Error: "Inserting data Error in server" });
    }
    return res.json({ Status: "Success" });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM Users WHERE email = ? LIMIT 1";

  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });

    if (data.length > 0) {
      const storedPassword = data[0].userPass;

      if (req.body.password === storedPassword) {
        return res.json({ Status: "Success" });
      } else {
        return res.json({ Error: "Invalid Password" });
      }
    } else {
      return res.json({ Error: "Email is not registered" });
    }
  });
});
app.listen(PORT, () => {
  console.log(`Express App is listening to ${PORT}`);
});
