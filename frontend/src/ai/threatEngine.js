export function calculateServiceRisk(
  service,
  allServices
) {

  let risk = 0;

  /* LATENCY */

  risk +=
    service.latency * 0.28;

  /* TRAFFIC */

  risk +=
    service.traffic * 0.006;

  /* STATUS */

  if (
    service.status ===
    "warning"
  ) {

    risk += 18;

  }

  if (
    service.status ===
    "critical"
  ) {

    risk += 42;

  }

  /* DEPENDENCY RISK */

  service.dependencies.forEach(
    (dependencyName) => {

      const dependency =
        allServices.find(
          (service) =>
            service.name ===
            dependencyName
        );

      if (!dependency) {
        return;
      }

      if (
        dependency.status ===
        "warning"
      ) {

        risk += 16;

      }

      if (
        dependency.status ===
        "critical"
      ) {

        risk += 34;

      }

    }
  );

  /* ISOLATION */

  if (service.isolated) {

    risk += 25;

  }

  /* REROUTING */

  if (service.rerouting) {

    risk += 14;

  }

  return Math.min(
    100,
    Math.floor(risk)
  );

}

/* SYSTEM THREAT LEVEL */

export function evaluateThreatLevel(
  services
) {

  const totalRisk =
    services.reduce(
      (acc, service) =>

        acc + service.riskScore,

      0
    );

  const averageRisk =
    totalRisk / services.length;

  if (averageRisk >= 80) {
    return "CRITICAL";
  }

  if (averageRisk >= 55) {
    return "HIGH";
  }

  if (averageRisk >= 30) {
    return "MEDIUM";
  }

  return "LOW";

}

/* AI REASONING */

export function generateAIReasoning(
  services
) {

  const criticalServices =
    services.filter(
      (service) =>
        service.status ===
        "critical"
    );

  if (
    criticalServices.length === 0
  ) {

    return {
      summary:
        "Infrastructure stable. No active threat propagation detected.",

      recommendation:
        "Maintain passive monitoring protocols.",

      prediction:
        "Failure probability minimal.",
    };

  }

  const highestRisk =
    [...services].sort(
      (a, b) =>

        b.riskScore -
        a.riskScore
    )[0];

  return {

    summary:
      `${highestRisk.name} instability propagating through infrastructure topology.`,

    recommendation:

      highestRisk.dependencies
        .length > 0

        ? `AI recommends dependency isolation and traffic rerouting.`

        : `AI recommends immediate failover deployment.`,

    prediction:

      highestRisk.riskScore >= 85

        ? "Cascading infrastructure failure probability elevated."

        : "Localized degradation detected with moderate escalation risk.",

  };

}