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
app.post("/prescriptions", (req, res) => {
  // Changed endpoint from '/prescription' to '/prescriptions'
  const {
    issuedTo,
    issuedBy,
    age,
    gender,
    suspectedCategory,
    prescriptionText,
  } = req.body;

  const sql =
    "INSERT INTO Prescriptions (issuedTo, issuedBy, age, gender, suspectedCategory, prescriptionText) VALUES (?, ?, ?, ?, ?, ?)"; // Removed backticks from column names in SQL query
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

// Endpoint to fetch prescription list

app.get("/prescriptions", (req, res) => {
  const presQuery = "SELECT * FROM Prescriptions"; // Select all columns

  db.query(presQuery, (err, presData) => {
    if (err) {
      console.error("Error fetching prescriptions:", err);
      return res.status(500).json({ error: "Error fetching prescriptions" });
    }

    // Send the list of prescription objects to the client
    res.json(presData);
  });
});

app.get("/prescriptions/:id", (req, res) => {
  const prescriptionId = req.params.id;
  // Format the date part of the createdAt timestamp
  const sql = `
    SELECT 
      id, 
      issuedTo, 
      issuedBy, 
      age, 
      gender, 
      suspectedCategory, 
      prescriptionText, 
      DATE_FORMAT(createdAt, '%Y-%m-%d') as date
    FROM Prescriptions 
    WHERE id = ?`;

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
  const identifier = req.body.email || req.body.phone; // Allow email or phone
  const password = req.body.password;

  const userSql = `
    SELECT * FROM Users 
    WHERE (email = ? OR phone = ?) AND userPass = ? LIMIT 1
  `;
  const psychologistSql = `
    SELECT * FROM Psychologists 
    WHERE email = ? AND psyPass = ? LIMIT 1
  `;
  const adminSql = `
    SELECT * FROM Admin 
    WHERE email = ? AND adminPass = ? LIMIT 1
  `;

  db.query(userSql, [identifier, identifier, password], (err, userData) => {
    if (err) {
      console.error("Error in user query:", err);
      return res.status(500).json({ Error: "Error in user query" });
    }

    if (userData.length > 0) {
      req.session.user = {
        userID: userData[0].userID,
        userName: userData[0].userName,
        email: userData[0].email,
      };

      const token = jwt.sign(
        { userId: userData[0].userID, userEmail: userData[0].email },
        "1234", // Replace with a secure secret key
        { expiresIn: "1h" }
      );

      return res.json({ status: "Success", UserData: userData[0], token });
    } else {
      db.query(
        psychologistSql,
        [identifier, password],
        (err, psychologistData) => {
          if (err) {
            console.error("Error in psychologist query:", err);
            return res
              .status(500)
              .json({ Error: "Error in psychologist query" });
          }

          if (psychologistData.length > 0) {
            req.session.user = {
              psyID: psychologistData[0].psyID, // Store psyID in session
              psyName: psychologistData[0].psyName,
              email: psychologistData[0].email,
            };

            const token = jwt.sign(
              {
                userId: psychologistData[0].psyID,
                userEmail: psychologistData[0].email,
              },
              "1234", // Replace with a secure secret key
              { expiresIn: "1h" }
            );

            return res.json({
              Status: "Success2",
              UserData: psychologistData[0],
              token,
            });
          } else {
            db.query(adminSql, [identifier, password], (err, adminData) => {
              if (err) {
                console.error("Error in admin query:", err);
                return res.status(500).json({ Error: "Error in admin query" });
              }

              if (adminData.length > 0) {
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
        }
      );
    }
  });
});

// New endpoint to get user data
app.get("/login", (req, res) => {
  // Check if there is a user session
  if (req.session.user) {
    const user = req.session.user;
    let userData = { ...user };

    // Check if the user is a psychologist and include psyID in the response
    if (user.psyID && user.psyName) {
      userData = {
        ...userData,
        psyID: user.psyID,
        psyName: user.psyName,
      };
    }

    return res.json({ userData });
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

app.post("/logout", (req, res) => {
  try {
    console.log("Logout route triggered");

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying user session:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.clearCookie("connect.sid");
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

//SEARCHBAR
app.get("/search", (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const searchSql = "SELECT id, name FROM Users WHERE name LIKE ?";
  db.query(searchSql, [`%${query}%`], (err, results) => {
    if (err) {
      console.error("Error executing search query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(results);
  });
});

app.get("/details/:id", (req, res) => {
  const id = req.params.id;

  const detailSql = "SELECT * FROM Users WHERE id = ?";
  db.query(detailSql, [id], (err, results) => {
    if (err) {
      console.error("Error executing detail query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "Detail not found" });
    }
  });
});

// Define route to handle appointment requests
app.post("/appointments", (req, res) => {
  const { userID, psyID, appointmentTime } = req.body;

  // Validate incoming data
  if (!userID || !psyID || !appointmentTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Insert appointment into the database
  const query =
    "INSERT INTO Appointments (`userID`, `psyID`, `appointmentTime`) VALUES (?, ?, ?)";
  db.query(query, [userID, psyID, appointmentTime], (err, result) => {
    if (err) {
      console.error("Error inserting appointment:", err);
      return res.status(500).json({ error: "Failed to book appointment" });
    }
    console.log("Appointment booked successfully");
    res.status(201).json({ message: "Appointment booked successfully" });
  });
});

// Define route to handle fetching all appointments
app.get("/appointments", (req, res) => {
  // Fetch all appointments from the database
  const query = "SELECT * FROM Appointments";
  console.log("Executing query:", query);
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json({ error: "Failed to fetch appointments" });
    }
    console.log("Appointments:", result);
    res.status(200).json(result);
  });
});

// Assuming you have already set up your Express server and connected to your MySQL database

app.post("/confirmation", (req, res) => {
  const { userID, link } = req.body;

  // Insert the data into the Confirmation table
  db.query(
    "INSERT INTO Confirmation (`userID`, `Link`) VALUES (?, ?)",
    [userID, link],
    (error, results, fields) => {
      if (error) {
        console.error("Error inserting confirmation:", error);
        res
          .status(500)
          .json({ error: "An error occurred while inserting confirmation" });
        return;
      }

      res.status(200).json({ message: "Confirmation inserted successfully" });
    }
  );
});

app.get("/confirmation", (req, res) => {
  // Get the userID from the logged-in user's session
  const userID = req.session.user.userID;

  // Fetch appointments from the database for the logged-in user's userID
  db.query(
    "SELECT * FROM Confirmation WHERE userID = ?",
    [userID],
    (error, results) => {
      if (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ error: "Failed to fetch appointments" });
      }
      console.log("Appointments:", results);
      res.status(200).json({ userData2: results[0] }); // Assuming userData2 needs to be set to the first result
    }
  );
});

//APP listen and DB CONNECT

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});
