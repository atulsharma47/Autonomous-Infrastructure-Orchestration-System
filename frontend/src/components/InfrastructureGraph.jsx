import { motion } from "framer-motion";

import { useSystem }
from "../context/useSystem";

function InfrastructureGraph({
  services,
}) {

  const {
    systemMode,
  } = useSystem();

  const statusColors = {

    healthy: "#22c55e",

    warning: "#facc15",

    critical: "#ef4444",

  };

  /* CONNECTION ENGINE */

  const connections = [];

  services.forEach((service) => {

    service.dependencies.forEach(
      (dependencyName) => {

        const dependency =
          services.find(
            (s) =>
              s.name ===
              dependencyName
          );

        if (dependency) {

          connections.push({

            from: dependency,
            to: service,

            status:
              dependency.status,

          });

        }

      }
    );

  });

  /* PARTICLE SPEED */

  const getParticleSpeed = (
    status
  ) => {

    if (
      systemMode ===
      "critical"
    ) {

      return status ===
        "critical"

        ? 0.5
        : 0.9;
    }

    if (
      systemMode ===
      "recovering"
    ) {

      return 2.4;
    }

    return 3.4;
  };

  return (

    <div
      className="
      relative

      h-[340px]

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
          backgroundSize:
            "36px 36px",
        }}
      />

      {/* GLOBAL AMBIENT */}

      <motion.div

        animate={{
          opacity:

            systemMode ===
            "critical"

              ? [0.08, 0.18, 0.08]

              : systemMode ===
                "recovering"

              ? [0.03, 0.08, 0.03]

              : [0.02, 0.04, 0.02],
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
        }}

        className="
        absolute
        inset-0

        blur-3xl
        "

        style={{
          background:

            systemMode ===
            "critical"

              ? "rgba(239,68,68,0.18)"

              : systemMode ===
                "recovering"

              ? "rgba(6,182,212,0.12)"

              : "rgba(34,197,94,0.04)",
        }}
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

        <h2
          className="
          text-[16px]
          font-semibold
          text-white
          "
        >
          Infrastructure Network
        </h2>

        <p
          className="
          text-xs
          text-gray-500
          mt-1
          "
        >
          Reactive dependency topology
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

        {/* EDGES */}

        {connections.map(
          (connection, index) => {

            const edgeColor =
              statusColors[
                connection.status
              ];

            const isCritical =
              connection.status ===
              "critical";

            return (

              <motion.line

                key={index}

                x1={`${connection.from.position.x}%`}
                y1={`${connection.from.position.y}%`}

                x2={`${connection.to.position.x}%`}
                y2={`${connection.to.position.y}%`}

                stroke={edgeColor}

                strokeWidth={
                  isCritical
                    ? 2.2
                    : 1.5
                }

                strokeDasharray={
                  isCritical
                    ? "6 6"
                    : "0"
                }

                animate={{

                  opacity:

                    isCritical

                      ? [0.2, 1, 0.2]

                      : [0.3, 0.7, 0.3],

                  pathLength:

                    isCritical

                      ? [0.85, 1, 0.85]

                      : [1, 1],
                }}

                transition={{
                  duration:
                    isCritical
                      ? 0.8
                      : 2,

                  repeat:
                    Infinity,
                }}
              />

            );

          }
        )}

        {/* TRAFFIC FLOW */}

        {connections.map(
          (connection, index) => (

            <motion.circle

              key={`particle-${index}`}

              r={
                connection.status ===
                "critical"

                  ? 5

                  : 4
              }

              fill={
                statusColors[
                  connection.status
                ]
              }

              style={{
                filter:
                  `drop-shadow(0 0 8px ${
                    statusColors[
                      connection.status
                    ]
                  })`,
              }}

              animate={{
                cx: [

                  `${connection.from.position.x}%`,

                  `${connection.to.position.x}%`,
                ],

                cy: [

                  `${connection.from.position.y}%`,

                  `${connection.to.position.y}%`,
                ],
              }}

              transition={{
                duration:
                  getParticleSpeed(
                    connection.status
                  ) + index * 0.4,

                repeat:
                  Infinity,

                ease:
                  "linear",
              }}
            />

          )
        )}

      </svg>

      {/* NODES */}

      {services.map((service) => (

        <motion.div

          key={service.id}

          animate={{
            scale:

              service.status ===
              "critical"

                ? [1, 1.1, 1]

                : service.status ===
                  "warning"

                ? [1, 1.05, 1]

                : [1, 1.01, 1],
          }}

          transition={{
            duration:

              service.status ===
              "critical"

                ? 0.7

                : 2,

            repeat:
              Infinity,
          }}

          className="
          absolute
          z-10
          "

          style={{
            left:
              `${service.position.x}%`,

            top:
              `${service.position.y}%`,

            transform:
              "translate(-50%, -50%)",
          }}
        >

          {/* NODE AURA */}

          <motion.div

            animate={{
              opacity:

                service.status ===
                "critical"

                  ? [0.2, 0.6, 0.2]

                  : [0.08, 0.2, 0.08],
            }}

            transition={{
              duration: 1,
              repeat: Infinity,
            }}

            className="
            absolute

            inset-0

            rounded-full

            blur-2xl
            "

            style={{
              background:
                statusColors[
                  service.status
                ],
            }}
          />

          {/* NODE */}

          <div
            className="
            relative

            w-[74px]
            h-[74px]

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
                statusColors[
                  service.status
                ],

              background:
                "rgba(8,17,27,0.92)",
            }}
          >

            {/* LIVE DOT */}

            <motion.div

              animate={{
                scale:

                  service.status ===
                  "critical"

                    ? [1, 2, 1]

                    : [1, 1.2, 1],
              }}

              transition={{
                duration: 1,
                repeat: Infinity,
              }}

              className="
              absolute
              top-2
              right-2

              w-2
              h-2

              rounded-full
              "

              style={{
                background:
                  statusColors[
                    service.status
                  ],
              }}
            />

            {/* NAME */}

            <p
              className="
              text-[11px]
              font-medium
              text-white

              px-1

              leading-tight
              "
            >
              {service.name}
            </p>

            {/* LATENCY */}

            <p
              className="
              text-[10px]
              text-gray-500
              mt-1
              "
            >
              {service.latency}ms
            </p>

          </div>

        </motion.div>

      ))}

    </div>

  );
}

export default InfrastructureGraph;