import express from "express";
import cors from "cors";
import session from "express-session";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Server as SocketIOServer } from "socket.io";
import { spawn } from "child_process";

// Create an Express app
const app = express();

// Set trust proxy
app.set("trust proxy", 1);

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.options("*", cors());

// Define port
const PORT = process.env.PORT || 3001;

// Database connection
const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "E_MentalHealth",
});

// Set trust proxy
app.set("trust proxy", 1);

// Enable sessions
app.use(
  session({
    secret: "admin123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

//PRECRIPTION

// Endpoint to handle prescription submission
app.post("/prescription", (req, res) => {
  const {
    issuedTo,
    issuedBy,
    age,
    gender,
    suspectedCategory,
    prescriptionText,
  } = req.body;

  const sql =
    "INSERT INTO Prescriptions (`issuedTo`, `issuedBy`, `age`, `gender`, `suspectedCategory`, `prescriptionText`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    issuedTo,
    issuedBy,
    age,
    gender,
    suspectedCategory,
    prescriptionText,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting prescription:", err);
      return res.status(500).json({ error: "Error saving prescription" });
    }

    console.log("Prescription saved successfully");
    res.json({ message: "Prescription submitted successfully" });
  });
});

// Endpoint to fetch prescription details by ID
app.get("/prescriptions/:id", (req, res) => {
  const prescriptionId = req.params.id;
  const sql = "SELECT * FROM Prescriptions WHERE id = ?";

  db.query(sql, [prescriptionId], (err, result) => {
    if (err) {
      console.error("Error retrieving prescription:", err);
      return res.status(500).json({ error: "Error retrieving prescription" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.json(result[0]);
  });
});

// Registration endpoint

app.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  const sql =
    "INSERT INTO Users (`userName`, `email`, `phone`, `userPass`) VALUES (?, ?, ?, ?)";
  const values = [name, email, phone, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.json({ Status: "Success" });
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
      // Generate a JWT token
      const token = jwt.sign(
        { userId: userData[0].userID, userEmail: userData[0].email },
        "1234", // Replace with a secure secret key
        { expiresIn: "1h" } // Set the expiration time
      );

      // Send the token in the response
      return res.json({ status: "Success", UserData: userData[0], token });
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

          return res.json({
            Status: "Success2",
            UserData: psychologistData[0],
          });
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
    console.log("Logout route triggered");

    // Destroy the session and clear the session cookie
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying user session:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Clear the session cookie
      res.clearCookie("connect.sid");

      // Expire the session cookie immediately
      res.cookie("connect.sid", "", { expires: new Date(0) });

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
app.get("/blogPosts", (req, res) => {
  const selectPostsQuery = "SELECT * FROM BlogPosts";

  db.query(selectPostsQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving blog posts:", err);
      return res.status(500).json({ error: "Error retrieving blog posts" });
    }

    return res.json({ results });
  });
});
app.get("/blog/:postId", (req, res) => {
  /*
  const postId = req.params.postId;
  const selectPostQuery = `SELECT * FROM BlogPosts WHERE PostID = ?`;

  db.query(selectPostQuery, [postId], (err, results) => {
    if (err) {
      console.error("Error retrieving blog post:", err);
      return res.status(500).json({ error: "Error retrieving blog post" });
    }

    return res.json({ results });
  });
  */
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
app.post("/blog/:postId/comments", (req, res) => {
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

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Attach Socket.IO to the Express server
const io = new SocketIOServer(server, {
  transports: ["websocket", "polling"],
});

// Socket.IO event handling
// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("stream", (roomId, stream, userId) => {
    io.to(roomId).emit("stream", stream, userId);
  });

  socket.on("emotionFrame", (roomId, imageData) => {
    const emotionDetectionProcess = spawn("python", [
      "realtimedetection.py", // Update with the correct path
    ]);

    emotionDetectionProcess.stdout.on("data", (data) => {
      const detectedEmotion = data.toString().trim(); // Assuming emotion is sent as a string
      io.to(roomId).emit("detectedEmotion", detectedEmotion);
    });

    emotionDetectionProcess.stderr.on("data", (data) => {
      console.error(`Emotion detection error: ${data}`);
      io.to(roomId).emit("emotionDetectionError", data.toString());
    });

    // Write imageData to the stdin of the child process
    emotionDetectionProcess.stdin.write(imageData);
    emotionDetectionProcess.stdin.end();
  });

  socket.on("joinRoomScript", (roomId) => {
    // Execute the Python script here
    const pythonScriptProcess = spawn("python", [
      "realtimedetection.py", // Update with the correct path
    ]);

    pythonScriptProcess.stdout.on("data", (data) => {
      console.log(`Python script output: ${data}`);
      // Handle output from the Python script if needed
    });

    pythonScriptProcess.stderr.on("data", (data) => {
      console.error(`Error executing Python script: ${data}`);
      // Handle error from the Python script if needed
    });

    pythonScriptProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      // Handle script exit if needed
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//APP listen and DB CONNECT

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});
