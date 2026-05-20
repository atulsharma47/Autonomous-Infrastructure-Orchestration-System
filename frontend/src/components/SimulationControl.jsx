import { motion } from "framer-motion";

import { useSystem }
from "../context/useSystem";

function SimulationControl() {

  const {

    triggerDDoS,
    triggerDatabaseFailure,
    triggerRecovery,
    stabilizeSystem,

    systemMode,

  } = useSystem();

  const actions = [

    {
      title: "Launch DDoS",

      description:
        "Simulate distributed traffic saturation attack propagation.",

      color:
        "from-red-500/20 to-red-500/5",

      border:
        "border-red-500/20",

      glow:
        "shadow-red-500/20",

      disabled:
        systemMode === "critical",

      action:
        triggerDDoS,
    },

    {
      title: "Database Failure",

      description:
        "Simulate replication instability and storage degradation.",

      color:
        "from-pink-500/20 to-pink-500/5",

      border:
        "border-pink-500/20",

      glow:
        "shadow-pink-500/20",

      disabled:
        systemMode === "critical",

      action:
        triggerDatabaseFailure,
    },

    {
      title: "AI Recovery",

      description:
        "Autonomous orchestration stabilization and rerouting recovery.",

      color:
        "from-cyan-500/20 to-cyan-500/5",

      border:
        "border-cyan-500/20",

      glow:
        "shadow-cyan-500/20",

      disabled:
        systemMode === "recovering",

      action:
        triggerRecovery,
    },

    {
      title: "Reset System",

      description:
        "Restore baseline infrastructure topology and telemetry.",

      color:
        "from-green-500/20 to-green-500/5",

      border:
        "border-green-500/20",

      glow:
        "shadow-green-500/20",

      disabled: false,

      action:
        stabilizeSystem,
    },

  ];

  return (

    <div
      className="
      grid
      grid-cols-2
      gap-5
      "
    >

      {actions.map((item) => (

        <motion.button

          key={item.title}

          whileHover={

            item.disabled

              ? {}

              : {
                  scale: 1.02,
                }

          }

          whileTap={

            item.disabled

              ? {}

              : {
                  scale: 0.98,
                }

          }

          disabled={item.disabled}

          onClick={item.action}

          className={`
            relative
            overflow-hidden

            rounded-2xl
            border

            p-5

            text-left

            bg-gradient-to-br
            ${item.color}

            ${item.border}

            backdrop-blur-xl

            transition-all
            duration-300

            hover:shadow-2xl
            ${item.glow}

            ${
              item.disabled

                ? "opacity-40 cursor-not-allowed"

                : "opacity-100"
            }
          `}
        >

          {/* OVERLAY */}

          <div
            className="
            absolute
            inset-0

            opacity-0
            hover:opacity-100

            transition-opacity
            duration-500

            bg-white/[0.03]
            "
          />

          {/* STATUS BADGE */}

          {

            item.disabled && (

              <div
                className="
                absolute
                top-3
                right-3

                px-2
                py-1

                rounded-full

                text-[10px]

                tracking-wider

                bg-white/5

                text-gray-400
                "
              >
                ACTIVE
              </div>

            )

          }

          {/* TITLE */}

          <h2
            className="
            relative
            z-10

            text-white
            text-lg
            font-semibold
            "
          >
            {item.title}
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
            relative
            z-10

            text-sm
            text-gray-400

            mt-2
            leading-relaxed
            "
          >
            {item.description}
          </p>

        </motion.button>

      ))}

    </div>

  );
}

export default SimulationControl;