import {
  motion,
} from "framer-motion";

function CoreParticle({
  size,
  x,
  y,
  duration,
  delay,
  critical,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0,
      }}

      animate={{

        opacity:

          critical

            ? [0, 1, 0.2, 0]

            : [0, 1, 0.4, 0],

        scale:

          critical

            ? [0, 1.5, 0.4, 0]

            : [0, 1, 0.7, 0],

        y:

          critical

            ? [0, -80, -140]

            : [0, -40, -80],

        x:

          critical

            ? [0, -8, 8, -4, 0]

            : [0, 0, 0],

      }}

      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}

      className={`
      absolute
      rounded-full
      blur-[1px]

      ${
        critical

          ? "bg-red-400"

          : "bg-cyan-300"
      }
      `}

      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}

    />

  );

}

export default CoreParticle;