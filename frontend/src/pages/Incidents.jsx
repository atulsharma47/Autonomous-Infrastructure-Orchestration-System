import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useMemo,
} from "react";

import IncidentCard
from "../components/IncidentCard";

import { useSystem }
from "../context/useSystem";

function Incidents() {

  const {
    incidents,
    activeIncident,
    systemMode,
    logs,
  } = useSystem();

  /* ACTIVE CRITICAL */

  const criticalCount =
    useMemo(() => {

      return incidents.filter(
        (incident) =>

          incident.severity ===
            "critical"

          &&

          incident.lifecycle !==
            "resolved"

      ).length;

    }, [incidents]);

  /* RESOLVED */

  const resolvedCount =
    useMemo(() => {

      return incidents.filter(
        (incident) =>

          incident.lifecycle ===
          "resolved"

      ).length;

    }, [incidents]);

  /* INVESTIGATING */

  const investigatingCount =
    useMemo(() => {

      return incidents.filter(
        (incident) =>

          incident.lifecycle ===
          "investigating"

      ).length;

    }, [incidents]);

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

      {/* LEFT */}

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

        <div
          className="
          flex
          items-start
          justify-between
          "
        >

          <div>

            <h1
              className="
              text-[32px]
              font-bold
              text-white
              "
            >
              Incident Command
            </h1>

            <p
              className="
              text-sm
              text-gray-500

              mt-1
              "
            >
              Correlated infrastructure incident intelligence
            </p>

          </div>

          {/* COUNTS */}

          <div
            className="
            flex
            items-center

            gap-3
            "
          >

            {/* ACTIVE */}

            <div
              className="
              px-4
              py-2

              rounded-xl

              border border-red-500/10

              bg-[#071018]
              "
            >

              <p
                className="
                text-[10px]

                tracking-[0.22em]

                text-gray-500

                uppercase
                "
              >
                Active
              </p>

              <h2
                className="
                mt-1

                text-xl
                font-semibold

                text-red-400
                "
              >
                {criticalCount}
              </h2>

            </div>

            {/* INVESTIGATING */}

            <div
              className="
              px-4
              py-2

              rounded-xl

              border border-yellow-500/10

              bg-[#071018]
              "
            >

              <p
                className="
                text-[10px]

                tracking-[0.22em]

                text-gray-500

                uppercase
                "
              >
                Investigating
              </p>

              <h2
                className="
                mt-1

                text-xl
                font-semibold

                text-yellow-400
                "
              >
                {investigatingCount}
              </h2>

            </div>

            {/* RESOLVED */}

            <div
              className="
              px-4
              py-2

              rounded-xl

              border border-green-500/10

              bg-[#071018]
              "
            >

              <p
                className="
                text-[10px]

                tracking-[0.22em]

                text-gray-500

                uppercase
                "
              >
                Resolved
              </p>

              <h2
                className="
                mt-1

                text-xl
                font-semibold

                text-green-400
                "
              >
                {resolvedCount}
              </h2>

            </div>

          </div>

        </div>

        {/* INCIDENT FEED */}

        <div
          className="
          flex-1

          overflow-y-auto

          pr-1

          flex
          flex-col

          gap-3
          "
        >

          <AnimatePresence>

            {incidents.length > 0 ? (

              incidents.map((incident) => (

                <motion.div

                  key={incident.id}

                  initial={{
                    opacity: 0,
                    y: -10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  exit={{
                    opacity: 0,
                    y: 10,
                  }}

                  transition={{
                    duration: 0.25,
                  }}

                  className="
                  rounded-2xl

                  border border-white/[0.05]

                  bg-[#071018]

                  overflow-hidden
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                    flex
                    items-start
                    justify-between

                    px-4
                    py-3

                    border-b border-white/[0.04]
                    "
                  >

                    <div>

                      <h2
                        className="
                        text-white
                        font-medium
                        "
                      >
                        {incident.title}
                      </h2>

                      <p
                        className="
                        text-xs
                        text-gray-500

                        mt-1
                        "
                      >
                        {incident.description}
                      </p>

                    </div>

                    {/* SEVERITY */}

                    <div
                      className={`
                      px-3
                      py-1

                      rounded-full

                      text-[10px]

                      uppercase
                      tracking-[0.18em]

                      ${
                        incident.severity ===
                        "critical"

                          ? "bg-red-500/10 text-red-400"

                          : incident.severity ===
                            "resolved"

                          ? "bg-green-500/10 text-green-400"

                          : "bg-yellow-500/10 text-yellow-400"
                      }
                      `}
                    >
                      {incident.severity}
                    </div>

                  </div>

                  {/* META */}

                  <div
                    className="
                    px-4
                    py-3

                    grid
                    grid-cols-4

                    gap-4
                    "
                  >

                    {/* LIFECYCLE */}

                    <div>

                      <p
                        className="
                        text-[10px]

                        uppercase

                        tracking-[0.18em]

                        text-gray-600
                        "
                      >
                        Lifecycle
                      </p>

                      <p
                        className="
                        mt-1

                        text-sm
                        text-cyan-400
                        "
                      >
                        {incident.lifecycle}
                      </p>

                    </div>

                    {/* ESCALATIONS */}

                    <div>

                      <p
                        className="
                        text-[10px]

                        uppercase

                        tracking-[0.18em]

                        text-gray-600
                        "
                      >
                        Escalations
                      </p>

                      <p
                        className="
                        mt-1

                        text-sm
                        text-yellow-400
                        "
                      >
                        {incident.escalationCount}
                      </p>

                    </div>

                    {/* SOURCE */}

                    <div>

                      <p
                        className="
                        text-[10px]

                        uppercase

                        tracking-[0.18em]

                        text-gray-600
                        "
                      >
                        Source
                      </p>

                      <p
                        className="
                        mt-1

                        text-sm
                        text-white
                        "
                      >
                        {incident.source}
                      </p>

                    </div>

                    {/* PARENT */}

                    <div>

                      <p
                        className="
                        text-[10px]

                        uppercase

                        tracking-[0.18em]

                        text-gray-600
                        "
                      >
                        Parent
                      </p>

                      <p
                        className="
                        mt-1

                        text-sm
                        text-pink-400
                        "
                      >
                        {incident.parent ||
                          "Root"}
                      </p>

                    </div>

                  </div>

                  {/* FOOTER */}

                  <div
                    className="
                    flex
                    items-center
                    justify-between

                    px-4
                    py-3

                    border-t border-white/[0.04]

                    text-xs
                    text-gray-500
                    "
                  >

                    <p>
                      Created:
                      {" "}
                      {
                        incident.createdAt
                      }
                    </p>

                    <p>
                      Updated:
                      {" "}
                      {
                        incident.lastUpdated
                      }
                    </p>

                  </div>

                </motion.div>

              ))

            ) : (

              <div
                className="
                flex-1

                flex
                items-center
                justify-center

                rounded-2xl

                border border-white/5

                bg-[#071018]
                "
              >

                <div className="text-center">

                  <h2
                    className="
                    text-xl
                    font-semibold
                    text-white
                    "
                  >
                    No Active Incidents
                  </h2>

                  <p
                    className="
                    text-sm
                    text-gray-500

                    mt-2
                    "
                  >
                    Infrastructure operating normally.
                  </p>

                </div>

              </div>

            )}

          </AnimatePresence>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
        col-span-4

        flex
        flex-col

        gap-4

        min-h-0
        "
      >

        {/* ACTIVE ALERTS */}

        <div
          className="
          relative

          overflow-hidden

          rounded-2xl

          border border-red-500/10

          bg-[#071018]

          px-4
          py-4
          "
        >

          <div
            className="
            absolute
            top-0
            right-0

            w-24
            h-24

            bg-red-500/10

            blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
              flex
              items-center
              justify-between

              mb-5
              "
            >

              <h2
                className="
                text-lg
                font-semibold
                text-white
                "
              >
                Incident Intelligence
              </h2>

              <div
                className={`
                w-2
                h-2

                rounded-full

                animate-pulse

                ${
                  systemMode === "critical"
                    ? "bg-red-400"

                    : systemMode === "recovering"
                    ? "bg-yellow-400"

                    : "bg-green-400"
                }
                `}
              />

            </div>

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
                  Infrastructure Risk
                </p>

                <p
                  className="
                  mt-1.5

                  text-sm

                  text-yellow-400
                  "
                >
                  {activeIncident.level}
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
                  Active State
                </p>

                <p
                  className="
                  mt-1.5

                  text-sm

                  text-red-400
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

        {/* LIVE AI LOG */}

        <div
          className="
          flex-1

          rounded-2xl

          border border-cyan-500/10

          bg-[#071018]

          px-4
          py-4

          overflow-hidden
          "
        >

          <div
            className="
            flex
            items-center

            gap-2

            mb-4
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
              LIVE AI LOG
            </p>

          </div>

          <div
            className="
            flex
            flex-col

            gap-2

            overflow-y-auto

            h-[320px]

            pr-1
            "
          >

            {logs.map((log, index) => (

              <div

                key={index}

                className="
                rounded-lg

                border border-white/[0.04]

                bg-black/20

                px-3
                py-2.5

                text-[12px]

                text-gray-300

                font-mono
                "
              >
                {log}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default Incidents;