import {
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Sidebar
from "./components/Sidebar";

import Topbar
from "./components/Topbar";

import Overview
from "./pages/Overview";

import Infrastructure
from "./pages/Infrastructure";

import Analytics
from "./pages/Analytics";

import Incidents
from "./pages/Incidents";

import Simulation
from "./pages/Simulation";

import Login
from "./pages/Login";

import Register
from "./pages/Register";

import ProtectedRoute
from "./auth/ProtectedRoute";

function App() {

  const location =
    useLocation();

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* PUBLIC ROUTES */}

        <Route
          path="/login"
          element={
            <PageTransition>

              <Login />

            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>

              <Register />

            </PageTransition>
          }
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <DashboardLayout />

            </ProtectedRoute>

          }
        >

          <Route
            index
            element={
              <PageTransition>

                <Overview />

              </PageTransition>
            }
          />

          <Route
            path="infrastructure"
            element={
              <PageTransition>

                <Infrastructure />

              </PageTransition>
            }
          />

          <Route
            path="analytics"
            element={
              <PageTransition>

                <Analytics />

              </PageTransition>
            }
          />

          <Route
            path="incidents"
            element={
              <PageTransition>

                <Incidents />

              </PageTransition>
            }
          />

          <Route
            path="simulation"
            element={
              <PageTransition>

                <Simulation />

              </PageTransition>
            }
          />

        </Route>

      </Routes>

    </AnimatePresence>

  );

}

/* DASHBOARD LAYOUT */

function DashboardLayout() {

  return (

    <div
      className="
      flex
      min-h-screen

      bg-[#020617]
      text-white
      antialiased
      "
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN AREA */}

      <main
        className="
        flex-1
        flex
        flex-col

        bg-[#020617]
        "
      >

        {/* TOPBAR */}

        <Topbar />

        {/* PAGE CONTENT */}

        <div
          className="
          flex-1
          px-5
          py-4
          "
        >

          <Outlet />

        </div>

      </main>

    </div>

  );

}

/* PAGE TRANSITIONS */

function PageTransition({
  children,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 4,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -4,
      }}

      transition={{
        duration: 0.14,
        ease: "easeOut",
      }}

      className="
      min-h-full
      "
    >

      {children}

    </motion.div>

  );

}

export default App;