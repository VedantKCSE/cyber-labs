import React, { useState, useEffect } from "react";
import db from "./components/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./App.css";
import "./animation.css"; // Add the new animations CSS
import MatrixRain from "./components/MatrixRain";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ff00", // Bright green for buttons
    },
    background: {
      default: "#000", // Black background for matrix effect
    },
    text: {
      primary: "#00ff00", // Green text
    },
  },
  typography: {
    fontFamily: "Courier New, monospace", // Match the Matrix theme
  },
});

function App() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  const [typedSubtitle, setTypedSubtitle] = useState("");

  // Typing effect for subtitle
  useEffect(() => {
    const subtitle = "Stay updated with the latest in cybersecurity and hacking!";
    let currentText = "";
    let index = 0;

    const typingEffect = setInterval(() => {
      if (index < subtitle.length) {
        currentText += subtitle[index];
        setTypedSubtitle(currentText);
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);

    return () => clearInterval(typingEffect);
  }, []);

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "newsletter"), { 
        email, 
        date: new Date() // Add the current date and time
      });
      setToast({ open: true, message: "🎉 Email successfully added!", severity: "success" });
      setEmail("");
    } catch (error) {
      console.error("Error adding email: ", error);
      setToast({ open: true, message: "⚠️ Failed to add email. Please try again.", severity: "error" });
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MatrixRain />
        <Box
          component="header"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          textAlign="center"
          color="text.primary"
          padding={3}
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Cyber Labs Newsletter
          </Typography>
          <Typography variant="body1" paragraph className="subtitle-cursor">
            {typedSubtitle}
          </Typography>

          {/* Social Proof and Urgency */}
          <Typography variant="body2" color="primary" style={{ marginBottom: "20px" }}>
            Join <strong className="social-proof-item">5000+ subscribers</strong> to stay ahead in cybersecurity! Only a few spots left for this month.
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              color="primary"
              style={{ backgroundColor: "#111", color: "#00ff00", borderColor: "#00ff00" }}
            />
            <Button type="submit" variant="outlined" color="primary" size="large">
              Subscribe
            </Button>
          </form>

          {/* Trust Signals */}
          <Grid container spacing={2} justifyContent="center" style={{ marginTop: "40px" }}>
            <Grid item>
              <Typography variant="body2" className="social-proof-item">
                <strong>✔️ Trusted by professionals</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className="social-proof-item">
                <strong>✔️ Endorsed by leading platforms</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className="social-proof-item">
                <strong>✔️ Exclusive cybersecurity insights</strong>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleToastClose} severity={toast.severity} variant="filled">
            {toast.message}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
}

export default App;