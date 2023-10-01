import express from "express";
import cors from "cors";

import mysql from "mysql";
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "E_MentalHealth",
});

app.post("/getUser", (reqData, resData) => {
  const email = req.body.email;
  const userPass = req.body.userPass;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    const sqlQuery = "SELECT * FROM User WHERE email = ? AND userPass = ?";

    connection.query(sqlQuery, [email, userPass], (err, rows) => {
      if (!err) {
        if (email == rows[0].email && userPass == rows[0].userPass) {
          res.status(200).json({ loginMessage: true });
        }
      } else {
        console.log(err);
        res.status(403).json({ loginMessage: false });
      }
      connection.release(); // return the connection to pool
    });
  });
});

app.listen(PORT, () => {
  console.log(`Express App is listening to ${PORT}`);
});
