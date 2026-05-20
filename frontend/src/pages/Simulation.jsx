import SimulationControl
from "../components/SimulationControl";

import { useSystem }
from "../context/useSystem";

function Simulation() {

  const {
    logs,
    systemMode,
    activeIncident,
  } = useSystem();

  return (

    <div
      className="
      h-[calc(100vh-40px)]

      grid
      grid-cols-12

      gap-4

      overflow-hidden
      "
    >

      {/* LEFT SIDE */}

      <div
        className="
        col-span-8

        flex
        flex-col

        gap-4

        min-h-0
        "
      >

        {/* HEADER */}

        <div>

          <h1
            className="
            text-[32px]
            font-bold
            text-white
            "
          >
            Simulation Engine
          </h1>

          <p
            className="
            text-gray-500
            text-sm

            mt-1
            "
          >
            AI-driven infrastructure testing environment
          </p>

        </div>

        {/* SYSTEM STATUS */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className={`
              w-2.5
              h-2.5

              rounded-full
              animate-pulse

              ${
                systemMode === "stable"
                  ? "bg-green-400"

                  : systemMode === "recovering"
                  ? "bg-cyan-400"

                  : "bg-red-400"
              }
            `}
          />

          <p
            className="
            text-[11px]
            uppercase

            tracking-[0.22em]

            text-gray-400
            "
          >
            Current Mode

            <span
              className="
              ml-2
              text-white
              "
            >
              {systemMode}
            </span>

          </p>

        </div>

        {/* CONTROLS */}

        <SimulationControl />

        {/* LOGS */}

        <div
          className="
          flex-1

          min-h-0

          rounded-2xl

          border border-white/5

          bg-[#071018]

          px-4
          py-4
          "
        >

          {/* HEADER */}

          <div
            className="
            flex
            items-center
            justify-between

            mb-4
            "
          >

            <h2
              className="
              text-lg
              font-semibold
              text-white
              "
            >
              Live System Logs
            </h2>

            <div
              className="
              flex
              items-center
              gap-2
              "
            >

              <div
                className="
                w-2
                h-2

                rounded-full

                bg-green-400

                animate-pulse
                "
              />

              <p
                className="
                text-[10px]

                tracking-[0.22em]

                text-gray-500
                "
              >
                STREAMING
              </p>

            </div>

          </div>

          {/* LOG LIST */}

          <div
            className="
            flex
            flex-col

            gap-2

            overflow-y-auto

            h-[220px]

            pr-1
            "
          >

            {logs.map((log, index) => (

              <div

                key={index}

                className="
                border border-white/[0.04]

                bg-black/20

                rounded-lg

                px-3
                py-2.5

                text-[12px]

                text-gray-300

                font-mono

                leading-relaxed
                "
              >
                {log}
              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        className="
        col-span-4

        flex
        flex-col

        gap-4

        min-h-0
        "
      >

        {/* AI STATUS */}

        <div
          className="
          relative

          overflow-hidden

          rounded-2xl

          border border-cyan-500/10

          bg-[#071018]

          px-4
          py-4
          "
        >

          {/* GLOW */}

          <div
            className="
            absolute
            top-0
            right-0

            w-24
            h-24

            bg-cyan-500/10

            blur-3xl
            "
          />

          <div className="relative z-10">

            {/* TOP */}

            <div
              className="
              flex
              items-center
              gap-2

              mb-3
              "
            >

              <div
                className="
                w-2
                h-2

                rounded-full

                bg-cyan-400

                animate-pulse
                "
              />

              <p
                className="
                text-cyan-400

                text-[10px]

                tracking-[0.22em]
                "
              >
                AI STATUS
              </p>

            </div>

            {/* STATUS */}

            <h2
              className="
              text-[20px]

              leading-[1.4]

              font-semibold

              text-white
              "
            >
              {activeIncident.response}
            </h2>

            {/* THREAT */}

            <div className="mt-6">

              <p
                className="
                text-gray-500

                text-xs
                "
              >
                Threat Level
              </p>

              <p
                className={`
                mt-1

                text-lg
                font-semibold

                ${
                  activeIncident.level === "Critical"
                    ? "text-red-400"

                    : activeIncident.level === "High"
                    ? "text-orange-400"

                    : activeIncident.level === "Moderate"
                    ? "text-yellow-400"

                    : "text-green-400"
                }
                `}
              >
                {activeIncident.level}
              </p>

            </div>

          </div>

        </div>

        {/* INCIDENT */}

        <div
          className="
          flex-1

          rounded-2xl

          border border-white/5

          bg-[#071018]

          px-4
          py-4
          "
        >

          {/* HEADER */}

          <div
            className="
            flex
            items-center
            justify-between

            mb-4
            "
          >

            <h2
              className="
              text-lg
              font-semibold
              text-white
              "
            >
              Active Incident
            </h2>

            <div
              className={`
              w-2
              h-2

              rounded-full

              animate-pulse

              ${
                activeIncident.level === "Critical"
                  ? "bg-red-400"

                  : activeIncident.level === "High"
                  ? "bg-orange-400"

                  : activeIncident.level === "Moderate"
                  ? "bg-yellow-400"

                  : "bg-green-400"
              }
              `}
            />

          </div>

          {/* CONTENT */}

          <div className="space-y-5">

            <div>

              <p
                className="
                text-gray-500
                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Attack Vector
              </p>

              <p
                className="
                mt-1.5

                text-sm

                text-red-400
                "
              >
                {activeIncident.attack}
              </p>

            </div>

            <div>

              <p
                className="
                text-gray-500
                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Infrastructure State
              </p>

              <p
                className="
                mt-1.5

                text-sm

                text-yellow-400
                "
              >
                {activeIncident.state}
              </p>

            </div>

            <div>

              <p
                className="
                text-gray-500
                text-[11px]

                uppercase

                tracking-wider
                "
              >
                AI Response
              </p>

              <p
                className="
                mt-1.5

                text-sm

                text-cyan-400
                "
              >
                {activeIncident.response}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Simulation;