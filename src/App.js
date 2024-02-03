import { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
  const [displayText, setDisplayText] = useState("");

  // Wrap the initialization of drumPads in useMemo
  const drumPads = useMemo(
    () => [
      {
        name: "Heater 1",
        keyTrigger: "Q",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      },
      {
        name: "Heater 2",
        keyTrigger: "W",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      },
      {
        name: "Heater 3",
        keyTrigger: "E",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      },
      {
        name: "Heater 4",
        keyTrigger: "A",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      },
      {
        name: "Clap",
        keyTrigger: "S",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      },
      {
        name: "Open HH",
        keyTrigger: "D",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      },
      {
        name: "Kick n' Hat",
        keyTrigger: "Z",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      },
      {
        name: "Kick",
        keyTrigger: "X",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      },
      {
        name: "Closed HH",
        keyTrigger: "C",
        soundSrc: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      },
    ],
    []
  ); // Empty dependency array as there are no external dependencies

  const playSound = (id, name) => {
    const audioElement = document.getElementById(id);
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
    setDisplayText(name);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keyTrigger = event.key.toUpperCase();
      const drumPad = drumPads.find((pad) => pad.keyTrigger === keyTrigger);
      if (drumPad) {
        playSound(drumPad.keyTrigger, drumPad.name);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drumPads]);

  return (
    <div className="App">
      <main id="drum-machine">
        <section className="header">
          <h1>Drum Machine</h1>
        </section>
        <section className="main">
          <div id="display">{displayText}</div>
          <div className="buttons">
          {drumPads.map((drumPad) => (
            <button
              key={drumPad.name}
              onClick={() => playSound(drumPad.keyTrigger, drumPad.name)}
              className="drum-pad"
              id={drumPad.name}
            >
              {drumPad.keyTrigger}
              <audio
                src={drumPad.soundSrc}
                className="clip"
                id={drumPad.keyTrigger}
              ></audio>
            </button>
          ))}
          </div>
        </section>
        <section className="footer">
          <p>
            &copy; {new Date().getFullYear()} Drum Machine. All rights
            reserved.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
