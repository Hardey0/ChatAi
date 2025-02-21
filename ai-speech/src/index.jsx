import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Typing.css";

const TypingEffect = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  
  const arr = ["Welcome to AI Processing Text"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (wordIndex < arr[0].length) {
          setText((prev) => prev + arr[0][wordIndex]);
          setWordIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText((prev) => prev.slice(0, -1));
        } else {
          setShowLoading(true); // Show "Loading AI..."
          setTimeout(() => {
            setFadeOut(true); // Fade out effect before navigating
            setTimeout(() => navigate("/ai"), 700);
          }, 1500);
        }
      }
    }, 70);

    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, navigate]);

  return (
    <div className={`container ${fadeOut ? "fade-out" : ""}`}>
      {!showLoading ? (
        <h1 className="gradient-text">{text}<span className="cursor">|</span></h1>
      ) : (
        <h1 className="loading-text">Loading AI...</h1>
      )}
    </div>
  );
};

export default TypingEffect;
