import express from "express";
import cors from "cors";
import session from "express-session";
import mysql from "mysql";

import cookieParser from "cookie-parser";

const app = express();
app.set("trust proxy", 1);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Specify the origin of your client application
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(cookieParser());

app.options("*", cors());

const PORT = 3001;

app.use(express.json());

const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "E_MentalHealth",
});

// Enable sessions
app.use(
  session({
    secret: "admin123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // set to true if using HTTPS
      httpOnly: true,
      maxAge: 3600000, // 1 hour in milliseconds
    },
  })
);

// Registration endpoint
app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const sql =
    "INSERT INTO Users (`userName`, `email`, `phone`, `userPass`, `otp`) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, phone, password, otp];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.json({ status: "Success" });
  });
});

//LOGIN
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userSql =
    "SELECT * FROM Users WHERE email = ? AND userPass = ? LIMIT 1";
  const psychologistSql =
    "SELECT * FROM Psychologists WHERE email = ? AND psyPass = ? LIMIT 1";
  const adminSql =
    "SELECT * FROM Admin WHERE email = ? AND adminPass = ? LIMIT 1";

  // Note: Update the column names for password in Psychologists and Admin tables

  db.query(userSql, [email, password], (err, userData) => {
    if (err) {
      console.error("Error in user query:", err);
      return res.status(500).json({ Error: "Error in user query" });
    }

    if (userData.length > 0) {
      // Set user session
      req.session.user = {
        userID: userData[0].userID,
        userName: userData[0].userName,
        email: userData[0].email,
      };
      console.log(req.session);
      return res.json({ Status: "Success", UserData: userData[0] });
    } else {
      db.query(psychologistSql, [email, password], (err, psychologistData) => {
        if (err) {
          console.error("Error in psychologist query:", err);
          return res.status(500).json({ Error: "Error in psychologist query" });
        }

        if (psychologistData.length > 0) {
          // Set psychologist session
          req.session.user = {
            userID: psychologistData[0].psyID,
            psyName: psychologistData[0].psyName,
            email: psychologistData[0].email,
          };

          return res.json({ Status: "Success", UserData: psychologistData[0] });
        } else {
          db.query(adminSql, [email, password], (err, adminData) => {
            if (err) {
              console.error("Error in admin query:", err);
              return res.status(500).json({ Error: "Error in admin query" });
            }

            if (adminData.length > 0) {
              // Set admin session
              req.session.user = {
                adminID: adminData[0].adminID,
                adminName: adminData[0].adminName,
                email: adminData[0].email,
              };

              return res.json({
                Status: "adminSuccess",
                UserData: adminData[0],
              });
            } else {
              return res.status(401).json({ Error: "Invalid credentials" });
            }
          });
        }
      });
    }
  });
});

// New endpoint to get user data
app.get("/login", (req, res) => {
  // Check if there is a user session
  if (req.session.user) {
    return res.json({ userData: req.session.user });
  } else {
    return res.status(401).json({ error: "User not logged in" });
  }
});

// Check if logged in
app.post("/check-auth", (req, res) => {
  if (req.session.user) {
    return res.json({ authenticated: true });
  } else {
    return res.json({ authenticated: false });
  }
});

//Logout
app.post("/logout", (req, res) => {
  try {
    // Destroy the user session or token (depends on your authentication method)
    // For example, if you're using express-session:
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying user session:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("User logout successful");
      res.json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Unexpected error during user logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// New route to get a list of psychologists
app.get("/psychologists", (req, res) => {
  const psychologistSql = "SELECT * FROM Psychologists";

  db.query(psychologistSql, (err, psychologistsData) => {
    if (err) {
      console.error("Error fetching psychologists:", err);
      return res.json({ Error: "Error fetching psychologists" });
    }

    // Send the list of psychologists to the client
    res.json(psychologistsData);
  });
});

// Endpoint to get all users
app.get("/userList", (req, res) => {
  const sql = "SELECT * FROM Users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error retrieving users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
});

// Endpoint to remove a user
app.delete("/userList/:userID", (req, res) => {
  const userId = req.params.userID;
  const sql = "DELETE FROM Users WHERE userID = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error removing user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "User removed successfully" });
  });
});

// Update a user
app.put("/userList/:userID", (req, res) => {
  const userID = req.params.userID;
  const { name, email, phone } = req.body;

  const sql =
    "UPDATE Users SET userName = ?, email = ?, phone = ? WHERE userID = ?";
  db.query(sql, [name, email, phone, userID], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ status: "Success", message: "User updated successfully" });
  });
});

// Handle retrieving all blog posts
app.get("/blog/posts", (req, res) => {
  const selectPostsQuery = "SELECT title FROM BlogPosts";

  db.query(selectPostsQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving blog posts:", err);
      return res.status(500).json({ error: "Error retrieving blog posts" });
    }

    return res.status(200).json({ posts: results });
  });
});

// Handle creating a new blog post
app.post("/blog/posts", (req, res) => {
  const { userID, title, content } = req.body;

  const insertPostQuery =
    "INSERT INTO BlogPosts (userID, title, content, Timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";

  db.query(insertPostQuery, [userID, title, content], (err, result) => {
    if (err) {
      console.error("Error inserting blog post:", err);
      return res.status(500).json({ error: "Error creating blog post" });
    }

    const postID = result.insertId;
    return res.status(200).json({ postID });
  });
});

// Handle creating a new comment
app.post("/blog/comments", (req, res) => {
  const { userID, postID, content } = req.body;

  const insertCommentQuery =
    "INSERT INTO Comments (userID, postID, content, Timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";

  db.query(insertCommentQuery, [userID, postID, content], (err, result) => {
    if (err) {
      console.error("Error inserting comment:", err);
      return res.status(500).json({ error: "Error creating comment" });
    }

    const commentID = result.insertId;
    return res.status(200).json({ commentID });
  });
});

//APP listen and DB CONNECT

app.listen(PORT, () => {
  console.log(`Express App is listening to ${PORT}`);
});
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});
