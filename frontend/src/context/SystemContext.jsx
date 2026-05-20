import {
  useEffect,
  useState,
  useRef,
} from "react";

import servicesData
from "../data/services";

import criticalAlertSound
from "../assets/audio/critical-alert.mp3";

import recoveryChimeSound
from "../assets/audio/recovery-chime.mp3";

import socket
from "../services/socket";

import {

  calculateServiceRisk,

  evaluateThreatLevel,

  generateAIReasoning,

} from "../ai/threatEngine";

import {
  SystemContext,
} from "./systemContextObject";

const MAX_INCIDENTS = 15;

export function SystemProvider({
  children,
}) {

  /* SERVICES */

  const [
    services,
    setServices,
  ] = useState(servicesData);

  /* INCIDENTS */

  const [
    incidents,
    setIncidents,
  ] = useState([]);

  /* LOGS */

  const [
    logs,
    setLogs,
  ] = useState([
    "[SYSTEM] NEXUS initialized",
  ]);

  /* AUDIO */

  const [
    audioEnabled,
    setAudioEnabled,
  ] = useState(true);

  const audioCooldownRef =
    useRef(false);

  /* SYSTEM MODE */

  const [
    systemMode,
    setSystemMode,
  ] = useState("stable");

  /* AI THREAT STATE */

  const [
    threatLevel,
    setThreatLevel,
  ] = useState("LOW");

  const [
    aiReasoning,
    setAIReasoning,
  ] = useState({

    summary:
      "Infrastructure stable.",

    recommendation:
      "Passive monitoring active.",

    prediction:
      "No escalation predicted.",

  });

  /* ACTIVE INCIDENT */

  const [
    activeIncident,
    setActiveIncident,
  ] = useState({

    attack:
      "No active threat",

    state:
      "Infrastructure Stable",

    response:
      "All systems operating normally.",

    level:
      "Low",

  });

  /* REFS */

  const trafficInterval =
    useRef(null);

  const incidentMemoryRef =
    useRef({});

  const rerouteCooldownRef =
    useRef({});

  /* AUDIO ENGINE */

  const playCriticalAlert = () => {

    if (
      !audioEnabled ||
      audioCooldownRef.current
    ) {
      return;
    }

    audioCooldownRef.current =
      true;

    const sound =
      new Audio(
        criticalAlertSound
      );

    sound.volume = 0.28;

    sound.play().catch(
      (err) => {

        console.log(
          "Critical audio blocked:",
          err
        );

      }
    );

    setTimeout(() => {

      audioCooldownRef.current =
        false;

    }, 9000);

  };

  const playRecoveryTone = () => {

    if (!audioEnabled) {
      return;
    }

    const sound =
      new Audio(
        recoveryChimeSound
      );

    sound.volume = 0.7;

    sound.play().catch(
      (err) => {

        console.log(
          "Recovery audio blocked:",
          err
        );

      }
    );

  };

  /* LOG ENGINE */

  const addLog = (
    message
  ) => {

    const time =
      new Date()
      .toLocaleTimeString();

    setLogs((prev) => [

      `[${time}] ${message}`,

      ...prev,
    ].slice(0, 30));

  };

  /* INCIDENT ENGINE */

  const createIncident = ({
    title,
    description,
    severity,
    source,
    parent,
  }) => {

    setIncidents((prev) => {

      const existing =
        prev.find(
          (incident) =>

            incident.source ===
              source

            &&

            incident.lifecycle !==
              "resolved"
        );

      if (existing) {

        return prev.map(
          (incident) => {

            if (
              incident.id !==
              existing.id
            ) {
              return incident;
            }

            return {

              ...incident,

              escalationCount:
                incident.escalationCount + 1,

              severity,

              lastUpdated:
                new Date()
                .toLocaleTimeString(),

            };

          }
        );

      }

      const newIncident = {

        id:
          crypto.randomUUID(),

        title,
        description,
        severity,

        source,
        parent,

        lifecycle:
          "detected",

        escalationCount:
          1,

        createdAt:
          new Date()
          .toLocaleTimeString(),

        lastUpdated:
          new Date()
          .toLocaleTimeString(),

        resolvedAt:
          null,

      };

      return [

        newIncident,

        ...prev,
      ].slice(0, MAX_INCIDENTS);

    });

  };

  /* STATUS ENGINE */

  const evaluateStatus = (
    latency
  ) => {

    if (latency >= 220) {
      return "critical";
    }

    if (latency >= 110) {
      return "warning";
    }

    return "healthy";

  };

  /* ORCHESTRATION */

  const orchestrateInfrastructure = (
    currentServices
  ) => {

    return currentServices.map(
      (service) => {

        let propagatedLatency = 0;

        let rerouting = false;

        let isolated = false;

        service.dependencies.forEach(
          (dependencyName) => {

            const dependency =
              currentServices.find(
                (s) =>
                  s.name ===
                  dependencyName
              );

            if (!dependency) {
              return;
            }

            if (
              dependency.status ===
              "critical"
            ) {

              propagatedLatency += 55;

              rerouting = true;

              if (
                service.name ===
                "Payment API"
              ) {

                isolated = true;

              }

            }

            else if (
              dependency.status ===
              "warning"
            ) {

              propagatedLatency += 25;

              rerouting = true;

            }

          }
        );

        propagatedLatency =
          Math.min(
            propagatedLatency,
            90
          );

        let updatedLatency =
          Math.min(
            320,
            Math.max(
              10,
              service.latency +
                propagatedLatency
            )
          );

        let updatedTraffic =

          isolated

            ? Math.max(
                300,
                service.traffic - 220
              )

            : rerouting

            ? service.traffic + 140

            : service.traffic;

        updatedTraffic =
          Math.min(
            updatedTraffic,
            5000
          );

        const rerouteKey =
          `${service.name}-reroute`;

        if (
          rerouting &&
          !rerouteCooldownRef.current[
            rerouteKey
          ]
        ) {

          rerouteCooldownRef.current[
            rerouteKey
          ] = true;

          setTimeout(() => {

            rerouteCooldownRef.current[
              rerouteKey
            ] = false;

          }, 10000);

        }

        const updatedStatus =

          isolated

            ? "critical"

            : evaluateStatus(
                updatedLatency
              );

        const updatedService = {

          ...service,

          rerouting:
            rerouting &&
            rerouteCooldownRef.current[
              rerouteKey
            ],

          isolated,

          traffic:
            updatedTraffic,

          latency:
            updatedLatency,

          status:
            updatedStatus,

        };

        updatedService.riskScore =

          calculateServiceRisk(
            updatedService,
            currentServices
          );

        return updatedService;

      }
    );

  };

  /* LIVE ENGINE */

  useEffect(() => {

    trafficInterval.current =
      setInterval(() => {

        setServices((prev) => {

          let updatedServices =

            prev.map((service) => {

              let trafficShift =
                Math.floor(
                  Math.random() * 120
                ) - 60;

              let latencyShift =
                Math.floor(
                  Math.random() * 10
                ) - 5;

              if (
                systemMode ===
                "critical"
              ) {

                latencyShift += 7;
                trafficShift += 110;

              }

              if (
                systemMode ===
                "recovering"
              ) {

                latencyShift -= 6;
                trafficShift -= 50;

              }

              const updatedLatency =
                Math.max(
                  10,
                  Math.min(
                    service.latency +
                      latencyShift,
                    320
                  )
                );

              const updatedTraffic =
                Math.max(
                  300,
                  Math.min(
                    service.traffic +
                      trafficShift,
                    5000
                  )
                );

              return {

                ...service,

                traffic:
                  updatedTraffic,

                latency:
                  updatedLatency,

                status:
                  evaluateStatus(
                    updatedLatency
                  ),

              };

            });

          updatedServices =
            orchestrateInfrastructure(
              updatedServices
            );

          return updatedServices;

        });

      }, 2600);

    return () => {

      clearInterval(
        trafficInterval.current
      );

    };

  }, [systemMode]);

  /* INCIDENT DETECTION */

  /* AI THREAT ENGINE */

  useEffect(() => {

    const level =
      evaluateThreatLevel(
        services
      );

    setThreatLevel(level);

    const reasoning =
      generateAIReasoning(
        services
      );

    setAIReasoning(
      reasoning
    );

    if (level === "CRITICAL") {

      setSystemMode(
        "critical"
      );

    }

    else if (
      level === "HIGH"
    ) {

      if (
        systemMode !==
        "critical"
      ) {

        setSystemMode(
          "recovering"
        );

      }

    }

    else {

      if (
        incidents.length === 0
      ) {

        setSystemMode(
          "stable"
        );

      }

    }

  }, [
    services,
    incidents,
    systemMode,
  ]);

  useEffect(() => {

    services.forEach((service) => {

      const incidentKey =
        `${service.name}-${service.status}`;

      if (
        incidentMemoryRef.current[
          incidentKey
        ]
      ) {
        return;
      }

      if (
        service.latency >= 220
      ) {

        incidentMemoryRef.current[
          incidentKey
        ] = true;

        createIncident({

          title:
            `${service.name} instability detected`,

          description:
            service.rerouting

              ? "Traffic rerouting initiated due to dependency instability."

              : "Infrastructure degradation detected across service topology.",

          severity:
            "critical",

          source:
            service.name,

          parent:
            service.dependencies[0] ||
            null,

        });

        playCriticalAlert();

        addLog(
          `[AUTO] ${service.name} exceeded infrastructure threshold`
        );

        setTimeout(() => {

          delete incidentMemoryRef.current[
            incidentKey
          ];

        }, 25000);

      }

    });

  }, [services]);

  /* INCIDENT LIFECYCLE */

  useEffect(() => {

    const lifecycleInterval =
      setInterval(() => {

        setIncidents((prev) => {

          const updated =
            prev.map((incident) => {

              if (
                incident.lifecycle ===
                "resolved"
              ) {
                return incident;
              }

              if (
                incident.lifecycle ===
                "detected"
              ) {

                return {

                  ...incident,

                  lifecycle:
                    "investigating",

                };

              }

              if (
                incident.lifecycle ===
                  "investigating"

                &&

                systemMode !==
                "critical"
              ) {

                return {

                  ...incident,

                  lifecycle:
                    "mitigated",

                };

              }

              if (
                incident.lifecycle ===
                  "mitigated"

                &&

                systemMode ===
                "stable"
              ) {

                playRecoveryTone();

                return {

                  ...incident,

                  lifecycle:
                    "resolved",

                  severity:
                    "resolved",

                  resolvedAt:
                    Date.now(),

                };

              }

              return incident;

            });

          return updated.filter(
            (incident) => {

              if (
                incident.lifecycle !==
                "resolved"
              ) {
                return true;
              }

              return (
                Date.now() -
                  incident.resolvedAt <
                12000
              );

            }
          );

        });

      }, 5000);

    return () => {

      clearInterval(
        lifecycleInterval
      );

    };

  }, [systemMode]);

  /* REALTIME INCIDENT SOCKETS */

  useEffect(() => {

    socket.on(
      "incident:new",
      (incident) => {

        const normalizedIncident = {

          ...incident,

          description:
            incident.description ||
            "Realtime infrastructure incident detected.",

          lifecycle:
            "detected",

          escalationCount:
            1,

          parent:
            null,

          lastUpdated:
            new Date()
            .toLocaleTimeString(),

          resolvedAt:
            null,

        };

        setIncidents((prev) => {

          const alreadyExists =
            prev.some(
              (item) =>

                item.title ===
                  normalizedIncident.title

                &&

                item.lifecycle !==
                  "resolved"
            );

          if (alreadyExists) {
            return prev;
          }

          return [

            normalizedIncident,

            ...prev,

          ];

        });

        addLog(
          `[SOCKET] ${incident.title}`
        );

        playCriticalAlert();

      }
    );

    return () => {

      socket.off(
        "incident:new"
      );

    };

  }, []);

  /* DDOS */

  const triggerDDoS = () => {

    playCriticalAlert();

    setSystemMode(
      "critical"
    );

    addLog(
      "[ALERT] DDoS simulation activated"
    );

  };

  /* DATABASE FAILURE */

  const triggerDatabaseFailure =
    () => {

      playCriticalAlert();

      setSystemMode(
        "critical"
      );

      addLog(
        "[CRITICAL] Database cluster offline"
      );

    };

  /* RECOVERY */

  const triggerRecovery = () => {

    setSystemMode(
      "recovering"
    );

    addLog(
      "[AI] Autonomous recovery initialized"
    );

    const recoveryInterval =
      setInterval(() => {

        setServices((prev) =>

          prev.map((service) => {

            const reducedLatency =
              Math.max(
                18,
                service.latency - 20
              );

            return {

              ...service,

              rerouting:
                false,

              isolated:
                false,

              latency:
                reducedLatency,

              status:
                evaluateStatus(
                  reducedLatency
                ),

              traffic:
                Math.max(
                  600,
                  service.traffic - 120
                ),

            };

          })

        );

      }, 1500);

    setTimeout(() => {

      clearInterval(
        recoveryInterval
      );

      stabilizeSystem();

    }, 7000);

  };

  /* RESET + STABILIZATION */

  const stabilizeSystem = () => {

    setSystemMode(
      "stable"
    );

    setServices((prev) =>

      prev.map((service) => {

        const latency =
          Math.floor(
            Math.random() * 25
          ) + 18;

        return {

          ...service,

          rerouting:
            false,

          isolated:
            false,

          status:
            "healthy",

          latency,

          traffic:
            Math.floor(
              Math.random() * 900
            ) + 700,

        };

      })

    );

    setActiveIncident({

      attack:
        "No active threat",

      state:
        "Infrastructure Stable",

      response:
        "All systems operating normally.",

      level:
        "Low",

    });

    addLog(
      "[SYSTEM] Infrastructure stabilized"
    );

  };

  /* CONTEXT */

  const contextValue = {

    services,
    incidents,
    logs,

    threatLevel,
    aiReasoning,

    systemMode,
    activeIncident,

    audioEnabled,
    setAudioEnabled,

    addLog,
    createIncident,

    triggerDDoS,
    triggerDatabaseFailure,
    triggerRecovery,
    stabilizeSystem,

  };

  return (

    <SystemContext.Provider
      value={contextValue}
    >

      {children}

    </SystemContext.Provider>

  );

}