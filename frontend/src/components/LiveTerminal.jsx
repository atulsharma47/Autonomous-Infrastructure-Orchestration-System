import {
  useEffect,
  useRef,
  useState,
} from "react";

const logPool = [
  "[INFO] AI monitoring initialized",
  "[INFO] Traffic balancing active",
  "[WARN] API latency spike detected",
  "[CRITICAL] Database instability detected",
  "[SYSTEM] Recovery engine activated",
  "[INFO] AI rerouting traffic",
  "[INFO] Node synchronization completed",
  "[WARN] Packet loss increasing",
  "[INFO] Infrastructure stabilized",
  "[SECURITY] Suspicious traffic pattern detected",
];

function getRandomLog() {

  return logPool[
    Math.floor(Math.random() * logPool.length)
  ];

}

function getCurrentTime() {

  return new Date().toLocaleTimeString();

}

function getLogColor(log) {

  if (log.includes("[CRITICAL]")) {
    return "text-red-400";
  }

  if (log.includes("[WARN]")) {
    return "text-yellow-400";
  }

  if (log.includes("[SECURITY]")) {
    return "text-pink-400";
  }

  if (log.includes("[SYSTEM]")) {
    return "text-cyan-400";
  }

  return "text-green-400";
}

function LiveTerminal() {

  const [logs, setLogs] = useState([
    `[${getCurrentTime()}] NEXUS monitoring initialized`,
  ]);

  const terminalRef = useRef(null);

  /* LIVE LOG ENGINE */

  useEffect(() => {

    const interval = setInterval(() => {

      setLogs((prev) => {

        const updatedLogs = [
          ...prev,
          `[${getCurrentTime()}] ${getRandomLog()}`,
        ];

        return updatedLogs.slice(-12);

      });

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  /* AUTO SCROLL */

  useEffect(() => {

    if (terminalRef.current) {

      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;

    }

  }, [logs]);

  return (

    <div
      className="
      h-full

      bg-[#050b12]

      border border-white/5

      rounded-2xl

      px-4
      py-3

      flex
      flex-col

      overflow-hidden
      "
    >

      {/* HEADER */}

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

          <h2
            className="
            text-cyan-400
            text-sm
            font-medium
            tracking-wider
            "
          >
            LIVE EVENT STREAM
          </h2>

        </div>

        <div className="text-[10px] text-gray-500">
          REALTIME
        </div>

      </div>

      {/* TERMINAL */}

      <div
        ref={terminalRef}
        className="
        flex-1

        overflow-y-auto

        font-mono
        text-[12px]

        leading-relaxed

        space-y-1.5

        pr-1

        [&::-webkit-scrollbar]:w-0
        "
      >

        {logs.map((log, index) => (

          <div
            key={index}
            className={`
            ${getLogColor(log)}

            opacity-90

            tracking-wide

           wrap-break-words

            flex
            items-start
            gap-2
            `}
          >

            <span className="text-gray-600">
              ›
            </span>

            <span>
              {log}
            </span>

          </div>

        ))}

        {/* COMMAND LINE */}

        <div
          className="
          flex
          items-center
          gap-1

          text-cyan-400

          pt-1
          "
        >

          <span>
            root@nexus:~$
          </span>

          <span className="animate-pulse">
            █
          </span>

        </div>

      </div>

    </div>

  );
}

export default LiveTerminal;