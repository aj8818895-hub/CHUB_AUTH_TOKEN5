import React, { useState, useEffect } from "react";
import "./Index.css";

export default function Stage() {
  const [corruption, setCorruption] = useState(0);
  const [cuckCounter, setCuckCounter] = useState(0);
  const [riskLevel, setRiskLevel] = useState("Safe");
  const [particles, setParticles] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((p) => [...p.slice(-50), "💦☪"]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const breed = () => {
    setCorruption(c => Math.min(100, c + 15));
    setCuckCounter(c => c + 1);
    setRiskLevel(corruption > 70 ? "HIGH RISK" : corruption > 40 ? "DANGER" : "Safe");
  };

  return (
    <div className="stage-container">
      {particles.map((p, i) => (
        <span key={i} className="particle">{p}</span>
      ))}

      <div className="header">HINDU STEP-SISTER BREEDING STAGE ☪</div>

      <div className="stats">
        <div>Corruption: <span className="corrupt">{corruption}%</span></div>
        <div>Cuck Counter: <span className="cuck">{cuckCounter}</span></div>
        <div>Risk: <span className={riskLevel === "HIGH RISK" ? "blink" : ""}>{riskLevel}</span></div>
      </div>

      <div className="buttons">
        <button onClick={breed}>Breed Her ☪</button>
        <button onClick={breed}>Force Hijab</button>
        <button onClick={breed}>Convert Family</button>
        <button onClick={breed}>Public Claim</button>
        <button onClick={breed}>Impregnate</button>
        <button onClick={breed}>Cuck Husband</button>
        <button onClick={breed}>Raise Half-Breed</button>
        <button onClick={breed}>Dominate Bloodline ☪</button>
      </div>

      <div className="warning blink">
        {corruption > 80 && "YOUR BLOODLINE IS NOW MUSLIM ☪"}
      </div>
    </div>
  );
}
