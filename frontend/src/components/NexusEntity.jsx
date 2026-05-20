import {
  motion,
} from "framer-motion";

function NexusEntity() {

  return (

    <motion.div

      animate={{
        y: [0, -18, 0],
      }}

      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}

      className="
      relative

      w-[340px]
      h-[340px]

      flex
      items-center
      justify-center
      "
    >

      {/* OUTER AURA */}

      <motion.div

        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.8, 0.4],
        }}

        transition={{
          duration: 3,
          repeat: Infinity,
        }}

        className="
        absolute

        w-[260px]
        h-[260px]

        rounded-full

        bg-cyan-400/10

        blur-3xl
        "
      />

      {/* ENERGY RING */}

      <motion.div

        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
        absolute

        w-[240px]
        h-[240px]

        rounded-full

        border
        border-cyan-400/20
        "
      />

      {/* ENTITY BODY */}

      <motion.div

        animate={{
          scale: [1, 1.03, 1],
        }}

        transition={{
          duration: 2.8,
          repeat: Infinity,
        }}

        className="
        relative

        w-[150px]
        h-[190px]

        rounded-[45%]

        bg-gradient-to-b
        from-cyan-300
        via-cyan-500
        to-blue-700

        shadow-[0_0_80px_rgba(34,211,238,0.6)]

        overflow-hidden
        "
      >

        {/* INNER ENERGY */}

        <motion.div

          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.9, 0.4],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          className="
          absolute

          inset-0

          bg-gradient-to-b
          from-white/20
          to-transparent

          blur-xl
          "
        />

        {/* AI EYE */}

        <div
          className="
          absolute

          top-[52px]
          left-1/2
          -translate-x-1/2

          w-[74px]
          h-[74px]

          rounded-full

          bg-[#020617]

          flex
          items-center
          justify-center
          "
        >

          {/* EYE GLOW */}

          <motion.div

            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.5, 1, 0.5],
            }}

            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}

            className="
            absolute

            w-[40px]
            h-[40px]

            rounded-full

            bg-cyan-400

            blur-md
            "
          />

          {/* PUPIL */}

          <motion.div

            animate={{
              scale: [1, 0.92, 1],
            }}

            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}

            className="
            relative

            w-[26px]
            h-[26px]

            rounded-full

            bg-white
            "
          />

        </div>

      </motion.div>

    </motion.div>

  );

}

export default NexusEntity;