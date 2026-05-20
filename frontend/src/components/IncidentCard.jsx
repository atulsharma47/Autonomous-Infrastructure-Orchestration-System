function IncidentCard({
  title,
  severity,
  time,
  description,
}) {

  const severityStyles = {
    critical: "text-red-400 border-red-500/20 bg-red-500/5",
    warning: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
    resolved: "text-green-400 border-green-500/20 bg-green-500/5",
  };

  return (
    <div
      className="
      bg-[#071018]
      border border-white/5
      rounded-3xl
      p-5
      "
    >

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-white text-lg font-semibold">
            {title}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            {description}
          </p>

        </div>

        <div
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          border
          capitalize
          ${severityStyles[severity]}
          `}
        >
          {severity}
        </div>

      </div>

      <div className="mt-6 flex items-center gap-2">

        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

        <p className="text-gray-500 text-sm">
          {time}
        </p>

      </div>

    </div>
  );
}

export default IncidentCard;