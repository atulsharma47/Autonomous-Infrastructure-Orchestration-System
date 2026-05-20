import {
  useEffect,
  useMemo,
  useState,
} from "react";

import AnalyticsChart
from "../components/AnalyticsChart";

import { useSystem }
from "../context/useSystem";

function Analytics() {

  const {
    services,
    incidents,
    systemMode,
  } = useSystem();

  /* TELEMETRY */

  const [
    trafficData,
    setTrafficData,
  ] = useState([]);

  const [
    latencyData,
    setLatencyData,
  ] = useState([]);

  const [
    healthHistory,
    setHealthHistory,
  ] = useState([]);

  /* TOTAL TRAFFIC */

  const totalTraffic =
    useMemo(() => {

      return services.reduce(
        (acc, service) =>

          acc + service.traffic,

        0
      );

    }, [services]);

  /* AVG LATENCY */

  const averageLatency =
    useMemo(() => {

      const total =
        services.reduce(
          (acc, service) =>

            acc + service.latency,

          0
        );

      return Math.floor(
        total / services.length
      );

    }, [services]);

  /* COUNTS */

  const criticalServices =
    services.filter(
      (service) =>

        service.status ===
        "critical"
    ).length;

  const reroutingServices =
    services.filter(
      (service) =>
        service.rerouting
    ).length;

  const isolatedServices =
    services.filter(
      (service) =>
        service.isolated
    ).length;

  /* INFRASTRUCTURE HEALTH */

  const infrastructureHealth =
    useMemo(() => {

      let score = 100;

      score -=
        criticalServices * 18;

      score -=
        reroutingServices * 8;

      score -=
        isolatedServices * 15;

      score -=
        Math.floor(
          averageLatency / 12
        );

      score -=
        incidents.filter(
          (incident) =>

            incident.lifecycle !==
            "resolved"
        ).length * 2;

      return Math.max(
        5,
        Math.min(score, 100)
      );

    }, [

      criticalServices,
      reroutingServices,
      isolatedServices,
      averageLatency,
      incidents,

    ]);

  /* RISK LEVEL */

  const riskLevel =
    useMemo(() => {

      if (
        infrastructureHealth <= 35
      ) {
        return "Critical Risk";
      }

      if (
        infrastructureHealth <= 60
      ) {
        return "High Risk";
      }

      if (
        infrastructureHealth <= 80
      ) {
        return "Medium Risk";
      }

      return "Stable";

    }, [infrastructureHealth]);

  /* AI INSIGHT */

  const aiInsight =
    useMemo(() => {

      /* CRITICAL */

      if (
        criticalServices >= 2
      ) {

        return "Critical dependency instability detected across infrastructure topology.";

      }

      /* REROUTING */

      if (
        reroutingServices >= 2
      ) {

        return "Traffic rerouting intensity increasing due to dependency degradation.";

      }

      /* ISOLATION */

      if (
        isolatedServices >= 1
      ) {

        return "Infrastructure isolation protocols active to contain propagation spread.";

      }

      /* RECOVERY */

      if (
        systemMode ===
        "recovering"
      ) {

        return "Autonomous orchestration stabilizing infrastructure latency progressively.";

      }

      /* WARNING */

      if (
        averageLatency >= 120
      ) {

        return "Latency escalation indicates elevated saturation pressure across services.";

      }

      return "Infrastructure operating within acceptable operational thresholds.";

    }, [

      criticalServices,
      reroutingServices,
      isolatedServices,
      averageLatency,
      systemMode,

    ]);

  /* CONFIDENCE */

  const confidence =
    useMemo(() => {

      let value =

        infrastructureHealth -

        criticalServices * 4 -

        isolatedServices * 5;

      return Math.max(
        40,
        Math.min(
          value,
          99
        )
      );

    }, [

      infrastructureHealth,
      criticalServices,
      isolatedServices,

    ]);

  /* TELEMETRY ENGINE */

  useEffect(() => {

    setTrafficData((prev) => {

      const updated = [

        ...prev,

        {
          value:
            totalTraffic,
        },

      ];

      return updated.slice(-10);

    });

    setLatencyData((prev) => {

      const updated = [

        ...prev,

        {
          value:
            averageLatency,
        },

      ];

      return updated.slice(-10);

    });

    setHealthHistory((prev) => {

      const updated = [

        ...prev,

        {
          value:
            infrastructureHealth,
        },

      ];

      return updated.slice(-10);

    });

  }, [

    totalTraffic,
    averageLatency,
    infrastructureHealth,

  ]);

  return (

    <div
      className="
      h-full

      grid
      grid-cols-12

      gap-4
      "
    >

      {/* LEFT */}

      <div
        className="
        col-span-8

        flex
        flex-col

        gap-4
        "
      >

        {/* TRAFFIC */}

        <AnalyticsChart
          title="Infrastructure Traffic"
          data={trafficData}
          color="#00d9ff"
        />

        {/* LATENCY */}

        <AnalyticsChart
          title="Latency Intelligence"
          data={latencyData}
          color="#ff4d9d"
        />

        {/* HEALTH */}

        <AnalyticsChart
          title="Infrastructure Health"
          data={healthHistory}
          color="#22c55e"
        />

      </div>

      {/* RIGHT */}

      <div
        className="
        col-span-4

        flex
        flex-col

        gap-4
        "
      >

        {/* AI INSIGHT */}

        <div
          className="
          relative

          bg-[#071018]

          border border-cyan-500/10

          rounded-2xl

          px-4
          py-4

          overflow-hidden
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

          {/* HEADER */}

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

              tracking-[0.18em]

              uppercase
              "
            >
              AI INFRASTRUCTURE ANALYSIS
            </p>

          </div>

          {/* INSIGHT */}

          <h2
            className="
            text-white

            text-[18px]

            leading-[1.45]

            font-semibold
            "
          >
            {aiInsight}
          </h2>

          {/* CONFIDENCE */}

          <div className="mt-6">

            <div
              className="
              flex
              items-center
              justify-between
              "
            >

              <p
                className="
                text-gray-500

                text-xs
                "
              >
                Analysis Confidence
              </p>

              <p
                className="
                text-green-400

                text-xl

                font-bold
                "
              >
                {confidence}%
              </p>

            </div>

            {/* BAR */}

            <div
              className="
              mt-3

              h-1.5

              rounded-full

              bg-white/5

              overflow-hidden
              "
            >

              <div
                className="
                h-full

                rounded-full

                bg-green-400
                "
                style={{
                  width:
                    `${confidence}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* RISK PANEL */}

        <div
          className="
          bg-[#071018]

          border border-white/5

          rounded-2xl

          px-4
          py-4

          flex-1
          "
        >

          {/* HEADER */}

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
              text-white

              text-[22px]

              font-semibold
              "
            >
              Infrastructure Forecast
            </h2>

            <div
              className={`
              w-2
              h-2

              rounded-full

              animate-pulse

              ${
                infrastructureHealth <= 35

                  ? "bg-red-400"

                  : infrastructureHealth <= 60

                  ? "bg-yellow-400"

                  : "bg-green-400"
              }
              `}
            />

          </div>

          {/* ITEMS */}

          <div
            className="
            flex
            flex-col

            gap-5
            "
          >

            {/* HEALTH */}

            <div>

              <p
                className="
                text-gray-500

                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Infrastructure Health
              </p>

              <p
                className="
                text-green-400

                text-2xl

                font-bold

                mt-1
                "
              >
                {infrastructureHealth}%
              </p>

            </div>

            {/* RISK */}

            <div>

              <p
                className="
                text-gray-500

                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Operational Risk
              </p>

              <p
                className={`
                text-base

                font-medium

                mt-1

                ${
                  riskLevel ===
                  "Critical Risk"

                    ? "text-red-400"

                    : riskLevel ===
                      "High Risk"

                    ? "text-orange-400"

                    : riskLevel ===
                      "Medium Risk"

                    ? "text-yellow-400"

                    : "text-green-400"
                }
                `}
              >
                {riskLevel}
              </p>

            </div>

            {/* ACTIVE FAILURES */}

            <div>

              <p
                className="
                text-gray-500

                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Critical Services
              </p>

              <p
                className="
                text-red-400

                text-base

                font-medium

                mt-1
                "
              >
                {criticalServices}
                {" "}
                active failures
              </p>

            </div>

            {/* PREDICTION */}

            <div>

              <p
                className="
                text-gray-500

                text-[11px]

                uppercase

                tracking-wider
                "
              >
                Predictive Analysis
              </p>

              <p
                className="
                text-cyan-400

                text-sm

                leading-relaxed

                mt-1
                "
              >
                {

                  infrastructureHealth <= 40

                    ? "Cascading infrastructure instability likely within next orchestration cycle."

                    : averageLatency >= 140

                    ? "Elevated latency patterns indicate possible topology congestion escalation."

                    : reroutingServices >= 2

                    ? "Failover traffic balancing stabilizing degraded dependencies."

                    : "Infrastructure telemetry indicates stable operational continuity."

                }

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Analytics;