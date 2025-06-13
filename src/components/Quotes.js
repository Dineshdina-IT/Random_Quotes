import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { CgTwitter } from "react-icons/cg";
import "./Quotes.css";

const gradients = [
  "linear-gradient(to right, #2193b0, #6dd5ed)",
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(to right, #373B44, #4286f4)",
  "linear-gradient(to right, #ff758c, #ff7eb3)",
  "linear-gradient(to right, #43cea2, #185a9d)",
];

const Quotes = () => {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");
  const [changeColor, setChangeColor] = useState(gradients[0]);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    const url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const dataQuotes = data.quotes;
        const random = Math.floor(Math.random() * dataQuotes.length);
        const randomQuote = dataQuotes[random];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      });
  };

  const handleClick = () => {
    getQuotes();
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setChangeColor(randomGradient);
  };

  return (
    <div
      id="main"
      className="main-container"
      style={{ background: changeColor }}
    >
      <div id="quote-box">
        <h1 className="title">💬 Dinesh's Quote Generator</h1>
        <div id="text" className="quote-text">
          <FaQuoteLeft className="quote-icon" />
          <span>{quote}</span>
        </div>
        <div id="author" className="quote-author">
          — {author}
        </div>
        <div id="buttons" className="button-group">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote}" - ${author}`
            )}`}
            id="tweet"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter-button"
          >
            <CgTwitter size={25} />
          </a>
          <button id="new-quote" onClick={handleClick}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
