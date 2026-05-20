import {
  motion,
} from "framer-motion";

function OrbitalDrone({
  size = 18,
  distance = 170,
  duration = 10,
  delay = 0,
  color = "cyan",
}) {

  return (

    <motion.div

      animate={{
        rotate: 360,
      }}

      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}

      className="
      absolute
      inset-0

      flex
      items-center
      justify-center
      "
    >

      <div
        className="relative"
        style={{
          width:
            distance * 2,

          height:
            distance * 2,
        }}
      >

        {/* ORBIT PATH */}

        <div
          className={`
          absolute
          inset-0

          rounded-full
          border

          ${
            color === "red"

              ? "border-red-500/10"

              : "border-cyan-400/10"
          }
          `}
        />

        {/* DRONE */}

        <motion.div

          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.4, 1, 0.4],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          className={`
          absolute

          top-1/2
          left-0

          -translate-y-1/2

          rounded-full

          ${
            color === "red"

              ? "bg-red-400"

              : "bg-cyan-300"
          }

          ${
            color === "red"

              ? "shadow-[0_0_25px_rgba(248,113,113,1)]"

              : "shadow-[0_0_25px_rgba(34,211,238,1)]"
          }
          `}

          style={{
            width: size,
            height: size,
          }}
        >

          {/* INNER LIGHT */}

          <div
            className="
            absolute
            inset-1

            rounded-full

            bg-white/80
            blur-[2px]
            "
          />

        </motion.div>

      </div>

    </motion.div>

  );

}

export default OrbitalDrone;