import React, { useState } from 'react';
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const App = () => {
  const [text_copy, settext_copy] = useState("");
  const [isCopied, setCopied] = useClipboard(text_copy.toString());
  const Start_Listening = () => SpeechRecognition.startListening({ continuous: true });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleCopy = () => {
    setCopied();
  }

  return (
    <>
      <div className="container">
        <h2><span>S</span>peak<span>W</span>rite</h2>
        <br />
        <p>Transform Your Words into Text.</p>

        <div className="main-content" onClick={() => settext_copy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={handleCopy}>{isCopied ? "copied" : "Copy"}</button>
          <button onClick={Start_Listening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      </div>
    </>
  );
};

export default App;
