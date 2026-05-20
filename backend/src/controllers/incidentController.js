import crypto from "crypto";

import Incident
from "../models/Incident.js";

/* GET INCIDENTS */

export const getIncidents =
  async (
    req,
    res
  ) => {

    try {

      const incidents =
        await Incident.find()
        .sort({
          createdAt: -1,
        });

      res.json(
        incidents
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch incidents",
      });

    }

  };

/* CREATE INCIDENT */

export const createIncident =
  async (
    req,
    res
  ) => {

    try {

      const {
        title,
        severity,
        source,
        description,
      } = req.body;

      const newIncident =
        await Incident.create({

          id:
            crypto.randomUUID(),

          title,

          severity,

          source,

          description,

          status:
            "active",

          lifecycle:
            "detected",

          escalationCount:
            1,

          parent:
            null,

        });

      req.io.emit(
        "incident:new",
        newIncident
      );

      res.status(201).json(
        newIncident
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to create incident",
      });

    }

  };