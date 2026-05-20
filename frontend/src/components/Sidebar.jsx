import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuItems = [
    {
      name: "Overview",
      path: "/",
    },
    {
      name: "Infrastructure",
      path: "/infrastructure",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
    {
      name: "Incidents",
      path: "/incidents",
    },
    {
      name: "Simulation",
      path: "/simulation",
    },
  ];

  return (

    <div
      className="
      w-[220px]

      h-screen

      bg-[#050b14]

      border-r border-white/5

      px-4
      py-5

      flex
      flex-col

      shrink-0
      "
    >

      {/* LOGO */}

      <div className="mb-10">

        <div className="flex items-center gap-2">

          <div
            className="
            w-2
            h-2

            rounded-full

            bg-cyan-400

            animate-pulse
            "
          />

          <h1
            className="
            text-2xl
            font-bold
            text-cyan-400

            tracking-wider
            "
          >
            NEXUS
          </h1>

        </div>

        <p
          className="
          text-gray-600
          text-[11px]

          mt-2
          ml-4

          tracking-wide
          "
        >
          AI Infrastructure Core
        </p>

      </div>

      {/* NAVIGATION */}

      <div className="flex flex-col gap-1.5">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}

            className={({ isActive }) => `
              
              px-3
              py-2.5

              rounded-xl

              text-sm

              transition-all
              duration-200

              border

              ${
                isActive

                  ? `
                    bg-cyan-500/10
                    text-cyan-400
                    border-cyan-500/20
                    `

                  : `
                    border-transparent
                    text-gray-500
                    hover:bg-white/5
                    hover:text-white
                    `
              }
            `}
          >

            {item.name}

          </NavLink>

        ))}

      </div>

      {/* FOOTER */}

      <div className="mt-auto">

        <div
          className="
          border-t border-white/5

          pt-4
          "
        >

          <div className="flex items-center gap-2">

            <div
              className="
              w-2
              h-2

              rounded-full

              bg-green-400

              animate-pulse
              "
            />

            <p
              className="
              text-gray-500
              text-xs
              tracking-wide
              "
            >
              System Operational
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Sidebar;