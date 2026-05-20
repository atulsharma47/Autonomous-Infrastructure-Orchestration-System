import {
  motion,
} from "framer-motion";

import {
  useSystem,
} from "../context/useSystem";

import CoreParticle
from "./CoreParticle";

import OrbitalDrone
from "./OrbitalDrone";

function AICore() {

  const {
    systemMode,
  } = useSystem();

  const isCritical =
    systemMode === "critical";

  const particles =
    Array.from(
      { length: 32 },
      (_, i) => ({

        id: i,

        size:
          Math.random() * 6 + 2,

        x:
          Math.random() * 320,

        y:
          Math.random() * 320,

        duration:
          Math.random() * 4 + 3,

        delay:
          Math.random() * 5,

      })
    );

  return (

    <motion.div

      animate={

        isCritical

          ? {
              scale: [1, 1.02, 0.98, 1],
              rotate: [0, 0.5, -0.5, 0],
            }

          : {
              y: [0, -6, 0],
            }

      }

      transition={{
        duration:
          isCritical ? 0.5 : 4,

        repeat: Infinity,
      }}

      className="
      relative
      flex
      items-center
      justify-center

      w-[420px]
      h-[420px]

      
      "
    >

      {/* PARTICLES */}

      {particles.map(
        (particle) => (

          <CoreParticle

            key={particle.id}

            size={particle.size}

            x={particle.x}

            y={particle.y}

            duration={

              isCritical

                ? particle.duration * 0.45

                : particle.duration

            }

            delay={particle.delay}

            critical={isCritical}

          />

        )
      )}

      {/* ORBITAL DRONES */}

      <OrbitalDrone
        distance={150}
        duration={8}
        color={
          isCritical
            ? "red"
            : "cyan"
        }
      />

      <OrbitalDrone
        distance={115}
        duration={5}
        delay={1.2}
        color={
          isCritical
            ? "red"
            : "cyan"
        }
      />

      <OrbitalDrone
        distance={180}
        duration={14}
        delay={0.8}
        color={
          isCritical
            ? "red"
            : "cyan"
        }
      />

      {/* OUTER ENERGY FIELD */}

      <motion.div

        animate={{
          rotate: 360,
        }}

        transition={{
          duration:
            isCritical ? 5 : 20,

          repeat: Infinity,
          ease: "linear",
        }}

        className={`
        absolute

        w-full
        h-full

        rounded-full
        border

        ${
          isCritical

            ? "border-red-500/30"

            : "border-cyan-400/20"
        }
        `}
      />

      {/* SECOND RING */}

      <motion.div

        animate={{
          rotate: -360,
        }}

        transition={{
          duration:
            isCritical ? 3 : 12,

          repeat: Infinity,
          ease: "linear",
        }}

        className={`
        absolute

        w-[250px]
        h-[250px]

        rounded-full
        border

        ${
          isCritical

            ? "border-orange-400/50"

            : "border-cyan-300/30"
        }
        `}
      />

      {/* ENERGY WAVE */}

      <motion.div

        animate={{
          scale:
            isCritical
              ? [1, 2.2]
              : [1, 1.7],

          opacity: [0.45, 0],
        }}

        transition={{
          duration:
            isCritical ? 1 : 3,

          repeat: Infinity,
          ease: "easeOut",
        }}

        className={`
        absolute

        w-[190px]
        h-[190px]

        rounded-full
        border

        ${
          isCritical

            ? "border-red-400/40"

            : "border-cyan-400/20"
        }
        `}
      />

      {/* CORE GLOW */}

      <motion.div

        animate={{

          scale:

            isCritical

              ? [1, 1.25, 0.95, 1]

              : [1, 1.1, 1],

          opacity:

            isCritical

              ? [0.8, 1, 0.5, 1]

              : [0.7, 1, 0.7],

        }}

        transition={{
          duration:
            isCritical ? 0.7 : 2,

          repeat: Infinity,
        }}

        className={`
        absolute

        w-[170px]
        h-[170px]

        rounded-full

        ${
          isCritical

            ? "bg-red-500/30"

            : "bg-cyan-400/20"
        }

        blur-3xl
        `}
      />

      {/* MAIN ENTITY */}

      <motion.div

        animate={{

          scale:

            isCritical

              ? [1, 1.08, 0.96, 1]

              : [1, 1.03, 1],

        }}

        transition={{
          duration:
            isCritical ? 0.8 : 3,

          repeat: Infinity,
        }}

        className={`
        relative

        flex
        items-center
        justify-center

        w-[130px]
        h-[170px]

        rounded-[45%]

        bg-gradient-to-b

        ${
          isCritical

            ? `
              from-red-400
              via-red-600
              to-orange-700
              `

            : `
              from-cyan-300
              via-cyan-500
              to-blue-700
              `
        }

        ${
          isCritical

            ? "shadow-[0_0_100px_rgba(239,68,68,0.9)]"

            : "shadow-[0_0_90px_rgba(34,211,238,0.8)]"
        }
        `}
      >

        {/* SCAN BEAM */}

        <motion.div

          animate={{
            y: [-35, 35, -35],
            opacity: [0.2, 0.9, 0.2],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
          }}

          className="
          absolute

          w-[90px]
          h-[3px]

          rounded-full

          bg-white/70

          blur-[1px]
          "
        />

        {/* IRIS */}

        <motion.div

          animate={{
            rotate: 360,
          }}

          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}

          className="
          relative

          flex
          items-center
          justify-center

          w-[65px]
          h-[65px]

          rounded-full

          bg-[#03131d]

          shadow-inner
          "
        >
{/* INNER EYE */}

<motion.div

  animate={{

    scale: [1, 0.75, 1],

    x: [0, 6, -5, 4, 0],

    y: [0, -4, 5, -3, 0],

  }}

  transition={{

    duration:
      isCritical ? 1.2 : 4,

    repeat: Infinity,

    ease: "easeInOut",

  }}

  className="
  relative

  w-[24px]
  h-[24px]

  rounded-full

  bg-white

  shadow-[0_0_30px_white]
  "
>

  {/* PUPIL */}

  <motion.div

    animate={{
      scale: [1, 0.6, 1],
    }}

    transition={{
      duration: 2,
      repeat: Infinity,
    }}

    className={`
    absolute

    left-1/2
    top-1/2

    -translate-x-1/2
    -translate-y-1/2

    w-[8px]
    h-[8px]

    rounded-full

    ${
      isCritical
        ? "bg-red-500"
        : "bg-cyan-400"
    }
    `}
  />

</motion.div>

        </motion.div>

      </motion.div>

    </motion.div>

  );

}

export default AICore;