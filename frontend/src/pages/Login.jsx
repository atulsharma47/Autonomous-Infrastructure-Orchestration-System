import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API
from "../services/api";

import {
  useAuth,
} from "../auth/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const response =
          await API.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        const data =
          response.data;

        login(
          data.token,
          data.user
        );

        navigate("/");

      }

      catch (err) {

        setError(

          err.response?.data?.message ||

          "Authentication failed"

        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      bg-[#020617]

      px-4
      "
    >

      <div
        className="
        w-full
        max-w-md

        rounded-3xl

        border
        border-cyan-500/10

        bg-[#081120]

        p-8

        shadow-2xl
        "
      >

        <div className="mb-8">

          <h1
            className="
            text-4xl
            font-bold
            text-cyan-400
            "
          >
            NEXUS
          </h1>

          <p
            className="
            mt-2
            text-gray-400
            "
          >
            Secure Infrastructure Login
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
          space-y-5
          "
        >

          <div>

            <label
              className="
              mb-2
              block

              text-sm
              text-gray-400
              "
            >
              Email
            </label>

            <input
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              required

              className="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#020817]

              px-4
              py-3

              outline-none

              focus:border-cyan-500
              "
            />

          </div>

          <div>

            <label
              className="
              mb-2
              block

              text-sm
              text-gray-400
              "
            >
              Password
            </label>

            <input
              type="password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              required

              className="
              w-full

              rounded-xl

              border
              border-white/10

              bg-[#020817]

              px-4
              py-3

              outline-none

              focus:border-cyan-500
              "
            />

          </div>

          {error && (

            <div
              className="
              rounded-lg

              border
              border-red-500/20

              bg-red-500/10

              px-4
              py-3

              text-sm
              text-red-400
              "
            >
              {error}
            </div>

          )}

          <button
            type="submit"

            disabled={loading}

            className="
            w-full

            rounded-xl

            bg-cyan-500

            py-3

            font-semibold
            text-black

            transition-all

            hover:bg-cyan-400

            disabled:opacity-50
            "
          >

            {

              loading

                ? "Authenticating..."

                : "Login"

            }

          </button>

        </form>

        <p
          className="
          mt-6

          text-sm
          text-gray-500
          "
        >

          Don't have an account?{" "}

          <Link
            to="/register"
            className="
            text-cyan-400
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;