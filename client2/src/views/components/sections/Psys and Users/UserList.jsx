import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [deletedUser, setDeletedUser] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [undone, setUndone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of users from the server
    axios.get("http://localhost:3001/userList").then((res) => {
      setUsers(res.data);
    });
  }, [selectedUser, undone]); // Add undone as a dependency

  const handleRemoveUser = (userId) => {
    const shouldDelete = window.confirm("Are you sure you want to remove this user?");
    if (shouldDelete) {
      // Store the user to enable undo
      const userToDelete = users.find((user) => user.userID === userId);
      setDeletedUser(userToDelete);

      // Delete the user from the server
      axios.delete(`http://localhost:3001/userList/${userID}`).then((res) => {
        setUsers(users.filter((user) => user.userID !== userId));
        setSelectedUser(null);

        // Set a timeout for undo
        const timeout = setTimeout(() => {
          setDeletedUser(null);
          setUndone(false); // Reset undone state
        }, 5000); // 5 seconds

        setUndoTimeout(timeout);
      });
    }
  };

  const handleUndoDelete = () => {
    // Restore the deleted user
    if (deletedUser) {
      axios.post("http://localhost:3001/userList", deletedUser).then((res) => {
        setUsers([...users, deletedUser]);
        setDeletedUser(null);
        setSelectedUser(null);
        clearTimeout(undoTimeout); // Clear the undo timeout
        setUndone(true); // Set undone state
      });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditedUser({
      name: user.userName,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleUpdateUser = () => {
    axios
      .put(`http://localhost:3001/userList/${selectedUser.userID}`, editedUser)
      .then((res) => {
        // Clear the selected user and reset the edited user
        setSelectedUser(null);
        setEditedUser({ name: "", email: "", phone: "" });
      });
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", padding: "20px", fontFamily: "Times New Roman" }}>
      <h1 style={{ color: "#333", fontWeight: "bold" }}>List of Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userID} style={{ marginBottom: "16px" }}>
            <p style={{ color: "#333", fontWeight: "bold" }}>ID: {user.userID}</p>
            <p style={{ color: "#333", fontWeight: "bold" }}>Name: {user.userName}</p>
            <p style={{ color: "#333", fontWeight: "bold" }}>Email: {user.email}</p>
            <p style={{ color: "#333", fontWeight: "bold" }}>Phone: {user.phone}</p>
            <button
              style={{
                padding: "6px 10px",
                backgroundColor: "#04487A",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "8px",
                fontSize: "14px",
              }}
              onClick={() => handleRemoveUser(user.userID)}
            >
              Remove User
            </button>
            <button
              style={{
                padding: "6px 10px",
                backgroundColor: "#3498db",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "8px",
                fontSize: "14px",
              }}
              onClick={() => handleEditUser(user)}
            >
              Edit User
            </button>
          </li>
        ))}
      </ul>

      {deletedUser && !undone && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "#e74c3c", fontWeight: "bold" }}>
            User deleted!{" "}
            <span
              style={{
                color: "#e74c3c",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={handleUndoDelete}
            >
              Undo
            </span>
          </p>
        </div>
      )}

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333", fontWeight: "bold" }}>Edit User</h2>
          <form>
            <label style={{ color: "#333", fontWeight: "bold" }}>Name:</label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => setEditedUser({ ...editedUser, userName: e.target.value })}
            />
            <label style={{ color: "#333", fontWeight: "bold" }}>Email:</label>
            <input
              type="text"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            />
            <label style={{ color: "#333", fontWeight: "bold" }}>Phone:</label>
            <input
              type="text"
              value={editedUser.phone}
              onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            />
            <button
              style={{
                padding: "6px 10px",
                backgroundColor: "#2ecc71",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "8px",
                fontSize: "14px",
              }}
              type="button"
              onClick={handleUpdateUser}
            >
              Update User
            </button>
            <button
              style={{
                padding: "6px 10px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                marginLeft: "8px",
                fontSize: "14px",
              }}
              type="button"
              onClick={() => setSelectedUser(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Back to Home button */}
      <button
        style={{
          padding: "6px 10px",
          backgroundColor: "#04487A",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "14px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default UserList;
