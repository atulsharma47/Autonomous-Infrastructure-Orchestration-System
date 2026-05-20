const services = [

  {
    id: 1,

    name: "Auth Service",

    type: "core",

    status: "healthy",

    traffic: 1200,
    latency: 12,

    health: 96,

    dependencies: [
      "Database Cluster",
    ],

    rerouting: false,
    isolated: false,

    riskScore: 12,

    position: {
      x: 28,
      y: 42,
    },
  },

  {
    id: 2,

    name: "Payment API",

    type: "financial",

    status: "warning",

    traffic: 980,
    latency: 74,

    health: 68,

    dependencies: [
      "Auth Service",
      "Database Cluster",
    ],

    rerouting: false,
    isolated: false,

    riskScore: 48,

    position: {
      x: 74,
      y: 42,
    },
  },

  {
    id: 3,

    name: "Database Cluster",

    type: "database",

    status: "critical",

    traffic: 1800,
    latency: 132,

    health: 24,

    dependencies: [],

    rerouting: false,
    isolated: false,

    riskScore: 91,

    position: {
      x: 52,
      y: 66,
    },
  },

  {
    id: 4,

    name: "Notification Service",

    type: "communication",

    status: "healthy",

    traffic: 760,
    latency: 18,

    health: 89,

    dependencies: [
      "Auth Service",
    ],

    rerouting: false,
    isolated: false,

    riskScore: 16,

    position: {
      x: 52,
      y: 22,
    },
  },

];

export default services;