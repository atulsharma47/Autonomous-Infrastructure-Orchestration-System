import { motion } from "framer-motion";

function InfrastructureCore() {

  const nodes = [
    {
      id: 1,
      name: "Auth",
      x: "28%",
      y: "44%",
      color: "#22c55e",
    },

    {
      id: 2,
      name: "Gateway",
      x: "52%",
      y: "28%",
      color: "#38bdf8",
    },

    {
      id: 3,
      name: "Database",
      x: "78%",
      y: "44%",
      color: "#ef4444",
    },

    {
      id: 4,
      name: "Notifications",
      x: "60%",
      y: "66%",
      color: "#facc15",
    },
  ];

  return (

    <div
      className="
      relative

      h-[620px]

      bg-[#08111b]

      border border-white/[0.05]

      rounded-2xl

      overflow-hidden
      "
    >

      {/* GRID */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.02]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "38px 38px",
        }}
      />

      {/* AMBIENT GLOW */}

      <div
        className="
        absolute
        inset-0

        bg-cyan-500/[0.03]

        blur-3xl
        "
      />

      {/* HEADER */}

      <div
        className="
        absolute

        top-4
        left-5

        z-20
        "
      >

        <h1
          className="
          text-[24px]
          font-bold
          text-white
          leading-none
          "
        >
          Infrastructure Core
        </h1>

        <p
          className="
          text-sm
          text-gray-500
          mt-2
          "
        >
          Distributed topology monitoring
        </p>

      </div>

      {/* SVG */}

      <svg
        className="
        absolute
        inset-0
        w-full
        h-full
        "
      >

        {/* CONNECTIONS */}

        <line
          x1="28%"
          y1="44%"
          x2="52%"
          y2="28%"
          stroke="#243041"
          strokeWidth="1.5"
        />

        <line
          x1="52%"
          y1="28%"
          x2="78%"
          y2="44%"
          stroke="#243041"
          strokeWidth="1.5"
        />

        <line
          x1="52%"
          y1="28%"
          x2="60%"
          y2="66%"
          stroke="#243041"
          strokeWidth="1.5"
        />

        {/* LIVE PARTICLES */}

        <motion.circle
          r="4"
          fill="#38bdf8"

          style={{
            filter:
              "drop-shadow(0 0 6px #38bdf8)",
          }}

          animate={{
            cx: ["28%", "52%"],
            cy: ["44%", "28%"],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.circle
          r="4"
          fill="#22c55e"

          style={{
            filter:
              "drop-shadow(0 0 6px #22c55e)",
          }}

          animate={{
            cx: ["52%", "78%"],
            cy: ["28%", "44%"],
          }}

          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.circle
          r="4"
          fill="#ef4444"

          style={{
            filter:
              "drop-shadow(0 0 6px #ef4444)",
          }}

          animate={{
            cx: ["52%", "60%"],
            cy: ["28%", "66%"],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

      </svg>

      {/* NODES */}

      {nodes.map((node) => (

        <motion.div

          key={node.id}

          animate={{
            scale: [1, 1.02, 1],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          className="absolute z-10"

          style={{
            left: node.x,
            top: node.y,
            transform:
              "translate(-50%, -50%)",
          }}
        >

          {/* GLOW */}

          <div
            className="
            absolute
            inset-0

            rounded-full

            blur-2xl

            opacity-20
            "
            style={{
              background:
                node.color,
            }}
          />

          {/* NODE */}

          <div
            className="
            relative

            w-[84px]
            h-[84px]

            rounded-full

            border

            backdrop-blur-lg

            flex
            flex-col
            items-center
            justify-center

            text-center
            "
            style={{
              borderColor:
                node.color,

              background:
                "rgba(8,17,27,0.92)",
            }}
          >

            {/* LIVE DOT */}

            <div
              className="
              absolute
              top-2
              right-2

              w-2
              h-2

              rounded-full

              animate-pulse
              "
              style={{
                background:
                  node.color,
              }}
            />

            <p
              className="
              text-[13px]
              font-medium
              text-white
              "
            >
              {node.name}
            </p>

            <p
              className="
              text-[11px]
              text-gray-500
              mt-1
              "
            >
              Active
            </p>

          </div>

        </motion.div>

      ))}

    </div>

  );
}

export default InfrastructureCore;