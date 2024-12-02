import React, { useEffect } from "react";
import "./MatrixRain.css";

const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Custom character set: Binary, symbols, emojis, and words
    const letters = "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ".split("");

    // Column setup
    const fontSize = 28; // Slightly larger font for better visibility
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    // Draw function
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Faint trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient for characters
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#00ff00");
      gradient.addColorStop(0.5, "#00cc00");
      gradient.addColorStop(1, "#009900");
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop down
        drops[i]++;

        // Reset drop randomly
        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
      }
    };

    const interval = setInterval(draw, 33); // Smooth 30 FPS animation

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <canvas className="matrix-rain"></canvas>;
};

export default MatrixRain;
