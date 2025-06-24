// src/components/RightSidebar.js
import React from "react";
import "../styles/RightSidebar.css";

const categoryImages = [
  "/assets/pop.png",
  "/assets/chill.png",
  "/assets/christmas.png",
  "/assets/romance.png",
  "/assets/workout.png",
];

const categories = ["Pop", "Chill", "Christmas", "Romance", "Workout"];

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <div className="top-streams">
        <h3
          style={{
            fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.5px",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            color: "#e94057",
          }}
        >
          Top Streams Real-time
        </h3>
        <ul>
          {["Malibu", "Stay Calm", "Rock Mode", "SOLO MODE", "First Good", "Motherscape"].map((song, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.7rem 1rem",
                borderRadius: "8px",
                marginBottom: "0.5rem",
                background: i === 0 ? "linear-gradient(90deg, #e94057 0%, #8a2387 100%)" : "#232526",
                color: i === 0 ? "#fff" : "#eee",
                fontWeight: i === 0 ? 700 : 500,
                boxShadow: i === 0 ? "0 2px 8px #e9405733" : "none",
                borderLeft: i === 0 ? "4px solid #fff" : "none",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{song}</span>
              <span style={{ fontSize: "0.95rem", opacity: 0.8 }}>3:24</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="categories">
        <h3
          style={{
            fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.5px",
            marginBottom: "1.2rem",
            fontSize: "1.5rem",
            color: "#e94057",
          }}
        >
          Categories
        </h3>
        <div className="category-list">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`category ${cat.toLowerCase()}`}
              style={{
                backgroundImage: `url(${categoryImages[i]})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "120px",
                boxShadow: "0 2px 12px #0002",
                paddingTop: "80px",
                marginBottom: "0.5rem",
                border: "1.5px solid #333",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
            >
              <div
                className="category-overlay"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  borderRadius: "10px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: "1.2rem",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#fff",
                    margin: 0,
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 8px #0008",
                  }}
                >
                  {cat}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
