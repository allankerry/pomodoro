import { useState, useEffect } from "react";
import "./App.css";

const FOCUS = 25 * 60;
const BREAK = 5 * 60;
const CYCLE = FOCUS + BREAK;

const format = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export default function App() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const pos = elapsed % CYCLE;
  const inFocus = pos < FOCUS;
  const timeLeft = inFocus ? FOCUS - pos : CYCLE - pos;
  const sessions = Math.floor(elapsed / CYCLE) + (inFocus ? 0 : 1);

  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <div className={`app ${inFocus ? "focus" : "break"}`}>

      <h1>Pomodoro Timer</h1>
      <p className="mode">{inFocus ? "Focus time" : "Break time"}</p>
      <div className="time">{format(timeLeft)}</div>

      <div className="buttons">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>

      <p className="sessions">Sessions completed: {sessions}</p>
    </div>
  );
}