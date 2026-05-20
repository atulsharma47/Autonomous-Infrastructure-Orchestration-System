function StatsCard({
  title,
  value,
  color,
}) {

  return (

    <div
      className="
      relative

      bg-[#08111b]

      border border-white/5

      rounded-xl

      px-4
      py-3

      min-h-27

      flex
      flex-col
      justify-between

      transition-all
      duration-200

      hover:border-white/8
      "
    >

      {/* TOP */}

      <div className="flex items-start justify-between">

        <div>

          <p
            className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-gray-500
            "
          >
            {title}
          </p>

        </div>

        {/* LIVE */}

        <div
          className="
          flex
          items-center
          gap-1.5

          mt-0.5
          "
        >

          <div
            className="
            w-1.5
            h-1.5

            rounded-full

            bg-cyan-400
            animate-pulse
            "
          />

          <span
            className="
            text-[10px]
            text-gray-600
            uppercase
            tracking-wide
            "
          >
            Live
          </span>

        </div>

      </div>

      {/* VALUE */}

      <div className="mt-3">

        <h2
          className={`
          text-[34px]
          leading-none
          font-semibold

          tracking-tight

          ${color}
          `}
        >
          {value}
        </h2>

      </div>

      {/* BAR */}

      <div
        className="
        mt-4

        h-0.5

        rounded-full

        bg-white/4

        overflow-hidden
        "
      >

        <div
          className={`
          h-full
          w-[68%]

          rounded-full

          opacity-90

          ${color.replace("text", "bg")}
          `}
        />

      </div>

    </div>

  );
}

export default StatsCard;