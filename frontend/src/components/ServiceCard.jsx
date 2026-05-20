import { motion } from "framer-motion";

function ServiceCard({
  service,
}) {

  const statusConfig = {

    healthy: {
      dot: "bg-green-400",
      text: "text-green-400",
      label: "Operational",
    },

    warning: {
      dot: "bg-yellow-400",
      text: "text-yellow-400",
      label: "Elevated",
    },

    critical: {
      dot: "bg-red-400",
      text: "text-red-400",
      label: "Critical",
    },

  };

  const config =
    statusConfig[
      service.status
    ];

  return (

    <motion.div

      whileHover={{
        y: -1,
      }}

      transition={{
        duration: 0.15,
      }}

      className="
      relative

      overflow-hidden

      bg-[#08111b]

      border border-white/[0.05]

      rounded-xl

      px-3.5
      py-3

      hover:border-white/[0.08]

      transition-all
      duration-200
      "
    >

      {/* REROUTE GLOW */}

      {service.rerouting && (

        <div
          className="
          absolute
          inset-0

          bg-cyan-500/[0.05]

          blur-2xl
          "
        />

      )}

      {/* ISOLATION OVERLAY */}

      {service.isolated && (

        <div
          className="
          absolute
          inset-0

          bg-red-500/[0.06]
          "
        />

      )}

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-3 min-w-0">

            {/* STATUS */}

            <div
              className={`
              w-2
              h-2

              rounded-full

              animate-pulse

              shrink-0

              ${config.dot}
              `}
            />

            {/* INFO */}

            <div className="min-w-0">

              <h3
                className="
                text-[13px]
                font-medium
                text-white

                truncate
                "
              >
                {service.name}
              </h3>

              <p
                className={`
                text-[10px]

                uppercase
                tracking-[0.16em]

                mt-1

                ${config.text}
                `}
              >
                {config.label}
              </p>

              {/* REROUTING */}

              {service.rerouting && (

                <p
                  className="
                  text-[9px]

                  uppercase

                  tracking-[0.16em]

                  mt-1

                  text-cyan-400
                  "
                >
                  Traffic Rerouting
                </p>

              )}

              {/* ISOLATED */}

              {service.isolated && (

                <p
                  className="
                  text-[9px]

                  uppercase

                  tracking-[0.16em]

                  mt-1

                  text-red-400
                  "
                >
                  Node Isolated
                </p>

              )}

            </div>

          </div>

          {/* METRICS */}

          <div className="flex items-center gap-4 shrink-0">

            {/* TRAFFIC */}

            <div className="text-right">

              <p
                className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-gray-600
                "
              >
                Traffic
              </p>

              <h3
                className="
                text-[13px]
                font-medium
                text-cyan-400
                mt-1
                "
              >
                {service.traffic}
              </h3>

            </div>

            {/* LATENCY */}

            <div className="text-right">

              <p
                className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-gray-600
                "
              >
                Latency
              </p>

              <h3
                className="
                text-[13px]
                font-medium
                text-pink-400
                mt-1
                "
              >
                {service.latency}ms
              </h3>

            </div>

          </div>

        </div>

      </div>

    </motion.div>

  );
}

export default ServiceCard;