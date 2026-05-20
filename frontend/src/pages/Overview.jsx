import { useMemo } from "react";

import StatsCard
from "../components/StatsCard";

import InfrastructureGraph
from "../components/InfrastructureGraph";

import ServiceCard
from "../components/ServiceCard";

import NexusEntity
from "../components/NexusEntity";

import {
  useSystem,
} from "../context/useSystem";

function Overview() {

  const {
    services,
  } = useSystem();

  /* LIVE METRICS */

  const totalTraffic =
    useMemo(() => {

      return services.reduce(
        (acc, service) =>
          acc + service.traffic,
        0
      );

    }, [services]);

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

  const criticalCount =
    useMemo(() => {

      return services.filter(
        (service) =>
          service.status ===
          "critical"
      ).length;

    }, [services]);

  return (

    <div className="space-y-6">

      {/* HERO SECTION */}

      <div
        className="
        relative

        grid
        grid-cols-[1.2fr_0.8fr]

        gap-8

        items-center

        min-h-[420px]

        overflow-hidden

        rounded-3xl

        border
        border-cyan-400/10

        bg-gradient-to-br
        from-cyan-500/[0.03]
        via-transparent
        to-blue-500/[0.03]

        px-10
        py-10
        "
      >

        {/* BACKGROUND GLOW */}

        <div
          className="
          absolute

          right-[-120px]
          top-[-120px]

          w-[340px]
          h-[340px]

          rounded-full

          bg-cyan-500/10

          blur-3xl
          "
        />

        {/* LEFT */}

        <div className="relative z-10">

          {/* STATUS BADGE */}

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-4
            py-1.5

            rounded-full

            border
            border-cyan-400/20

            bg-cyan-400/5

            mb-6
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

            <span
              className="
              text-xs

              uppercase

              tracking-[0.3em]

              text-cyan-300
              "
            >
              AI ORCHESTRATION ACTIVE
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
            text-7xl
            font-black

            leading-none

            text-white
            "
          >
            NEXUS
          </h1>

          <h2
            className="
            mt-3

            text-3xl
            font-semibold

            text-cyan-300
            "
          >
            Autonomous Infrastructure Entity
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
            mt-6

            max-w-2xl

            text-[15px]
            leading-relaxed

            text-gray-400
            "
          >
            Real-time distributed infrastructure
            orchestration powered by an adaptive
            autonomous AI entity capable of
            live telemetry analysis, incident
            response coordination, recovery
            automation, and critical threat
            stabilization.
          </p>

          {/* LIVE METRICS INLINE */}

          <div
            className="
            mt-8

            flex
            items-center

            gap-10
            "
          >

            <div>

              <p
                className="
                text-sm
                text-gray-500
                "
              >
                Active Nodes
              </p>

              <h3
                className="
                mt-1

                text-3xl
                font-bold

                text-white
                "
              >
                {services.length}
              </h3>

            </div>

            <div>

              <p
                className="
                text-sm
                text-gray-500
                "
              >
                Live Traffic
              </p>

              <h3
                className="
                mt-1

                text-3xl
                font-bold

                text-cyan-300
                "
              >
                {totalTraffic.toLocaleString()}
              </h3>

            </div>

            <div>

              <p
                className="
                text-sm
                text-gray-500
                "
              >
                Critical Alerts
              </p>

              <h3
                className="
                mt-1

                text-3xl
                font-bold

                text-red-400
                "
              >
                {criticalCount}
              </h3>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
          relative
          z-10

          flex
          items-center
          justify-center
          "
        >

          <NexusEntity />

        </div>

      </div>

      {/* STATS */}

      <div
        className="
        grid
        grid-cols-4
        gap-3
        "
      >

        <StatsCard
          title="Total Services"
          value={services.length}
          color="text-cyan-400"
        />

        <StatsCard
          title="Traffic"
          value={totalTraffic.toLocaleString()}
          color="text-green-400"
        />

        <StatsCard
          title="Avg Latency"
          value={`${averageLatency}ms`}
          color="text-pink-400"
        />

        <StatsCard
          title="Critical Alerts"
          value={criticalCount}
          color="text-red-400"
        />

      </div>

      {/* MAIN CONTENT */}

      <div
        className="
        grid
        grid-cols-12
        gap-4
        "
      >

        {/* INFRASTRUCTURE GRAPH */}

        <div className="col-span-9">

          <InfrastructureGraph
            services={services}
          />

        </div>

        {/* LIVE SERVICES */}

        <div className="col-span-3">

          <div
            className="
            flex
            items-center
            justify-between

            mb-3
            "
          >

            <h2
              className="
              text-xl
              font-semibold

              text-white
              "
            >
              Live Services
            </h2>

            <p
              className="
              text-[11px]

              uppercase

              tracking-wide

              text-gray-500
              "
            >
              realtime
            </p>

          </div>

          <div
            className="
            flex
            flex-col
            gap-2.5
            "
          >

            {services.map((service) => (

              <ServiceCard
                key={service.id}
                service={service}
              />

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Overview;