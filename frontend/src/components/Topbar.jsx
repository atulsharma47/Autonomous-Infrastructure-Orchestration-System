import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../auth/AuthContext";

function Topbar() {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <div
      className="
      w-full
      flex
      items-center
      justify-between

      px-6
      py-4

      border-b
      border-cyan-500/10

      bg-[#020617]
      "
    >

      <div>

        <h1
          className="
          text-lg
          font-semibold
          text-white
          "
        >
          NEXUS Control Center
        </h1>

        <p
          className="
          text-sm
          text-gray-400
          "
        >
          Authenticated Infrastructure Session
        </p>

      </div>

      <div
        className="
        flex
        items-center
        gap-4
        "
      >

        <div
          className="
          text-right
          "
        >

          <p
            className="
            text-sm
            text-white
            font-medium
            "
          >
            {user?.name}
          </p>

          <p
            className="
            text-xs
            text-cyan-400
            "
          >
            {user?.email}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="
          px-4
          py-2

          rounded-lg

          bg-red-500/20
          hover:bg-red-500/30

          border
          border-red-500/30

          text-red-400
          text-sm
          font-medium

          transition
          "
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Topbar;