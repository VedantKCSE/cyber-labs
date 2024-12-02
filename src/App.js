import React, { useState } from "react";
import db from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "newsletter"), { email });
      setMessage("Email successfully added!");
      setEmail("");
    } catch (error) {
      console.error("Error adding email: ", error);
      setMessage("Failed to add email. Please try again.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cyber Labs Newsletter</h1>
        <p>Stay updated with the latest in cybersecurity and hacking!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
}

export default App;
