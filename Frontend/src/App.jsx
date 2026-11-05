import { useState, useEffect } from "react";
import { checkBackendHealth } from "./services/api";

function App() {

  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {

    console.log("Health check started");

    const checkHealth = () => {

      checkBackendHealth()
        .then((data) => {

          console.log("Received data:", data);

          if (data.status === "healthy") {
            setBackendStatus("connected");
          } else {
            setBackendStatus("disconnected");
          }

        })
        .catch((error) => {

          console.error("Health check failed:", error);

          setBackendStatus("disconnected");

        });

    };

    // Check immediately when component loads
    checkHealth();

    // Repeat health check every 3 seconds
    const interval = setInterval(checkHealth, 3000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">

      <div className="w-full max-w-6xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-blue-400 mb-3">
            SignSpeak AI
          </h1>

          <p className="text-slate-400">
            Indian Sign Language to Speech Translator
          </p>

          {/* Backend Connection Status */}
          <div className="mt-4">

            <span className={`text-sm font-medium ${backendStatus === "connected"
                ? "text-green-400"
                : backendStatus === "disconnected"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}>

              {backendStatus === "connected"
                ? "● Backend Connected"
                : backendStatus === "disconnected"
                  ? "● Backend Disconnected"
                  : "● Checking Backend..."}

            </span>

          </div>

        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT SIDE - CAMERA */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-5">
              Live Camera
            </h2>

            <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center mb-6">

              <p className="text-slate-400">
                Camera Preview Coming Soon
              </p>

            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold">
              Start Recognition
            </button>

          </div>

          {/* RIGHT SIDE - GESTURE DETECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-5">
              Gesture Detection
            </h2>

            <div className="bg-slate-800 rounded-xl p-5 mb-5">

              <p className="text-sm text-slate-400 mb-2">
                Detection Status
              </p>

              <h3 className="text-lg font-semibold text-yellow-400">
                Waiting for gesture...
              </h3>

            </div>

            <div className="bg-slate-800 rounded-xl p-5 mb-5">

              <p className="text-sm text-slate-400 mb-3">
                Recognized Sign
              </p>

              <h2 className="text-4xl font-bold text-blue-400">
                ---
              </h2>

            </div>

            <div className="bg-slate-800 rounded-xl p-5">

              <p className="text-sm text-slate-400 mb-3">
                Speech Output
              </p>

              <button className="bg-emerald-600 hover:bg-emerald-700 transition px-5 py-2 rounded-lg font-medium">
                🔊 Speak Word
              </button>

            </div>

          </div>

        </div>

        <p className="text-slate-600 text-sm text-center mt-8">
          Powered by AI and Computer Vision
        </p>

      </div>
    </div>
  );
}

export default App;
