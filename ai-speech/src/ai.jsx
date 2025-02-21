import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaGlobe, FaMoon, FaSun, FaBook } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import "./AI.css";

const AiSpeech = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);
  

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" },
  ];

  const detectLanguage = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (typeof navigator.detectLanguage === "function") {
        const detectedLang = await navigator.detectLanguage(text);
        simulateTyping(`Detected Language: ${detectedLang || "Unknown"}`, "bot");
      } else {
        throw new Error();
      }
    } catch {
      simulateTyping("Error detecting language", "error", true);
    }
    setLoading(false);
  };

  const translateText = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (typeof navigator.translateText === "function") {
        const translated = await navigator.translateText(text, selectedLang);
        simulateTyping(`Translated (${selectedLang}): ${translated || "Translation error"}`, "bot");
      } else {
        throw new Error();
      }
    } catch {
      simulateTyping("Error translating text", "error", true);
    }
    setLoading(false);
  };

  const summarizeText = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      if (typeof navigator.summarizeText === "function") {
        const summary = await navigator.summarizeText(text);
        const words = summary.split(" ");
        if (words.length > 150) {
          alert("⚠️ The summary exceeds 150 words. Consider shortening the input text.");
        }
        simulateTyping(`Summary: ${summary}`, "bot");
      } else {
        throw new Error();
      }
    } catch {
      simulateTyping("Error summarizing text", "error", true);
    }
    setLoading(false);
  };

  const simulateTyping = (message, type, autoRemove = false) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text: message, type }]);
    
    if (autoRemove) {
      setTimeout(() => {
        setMessages((prev) => prev.filter(msg => msg.id !== id));
      }, 3000);
    }
  };

  return (
    <>


    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>{msg.text}</div>
        ))}
        {loading && <ClipLoader color="#0078ff" size={30} />}
      </div>
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            className="chat-input"
          />
          {text.trim() && <FaPaperPlane className="send-icon" onClick={detectLanguage} />}
        </div>
        <select className="language-selector" value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.name} ({lang.code.toUpperCase()})</option>
          ))}
        </select>
        <div className="btn">
          <button className="translate-btn" onClick={translateText}><FaGlobe /> Translate</button>
          <button className="summarize-btn" onClick={summarizeText}><FaBook /> Summarize</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AiSpeech;
