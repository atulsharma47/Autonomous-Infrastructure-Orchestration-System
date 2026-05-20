import mongoose from "mongoose";

const incidentSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default:
        "Realtime infrastructure incident detected.",
    },

    severity: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
      ],
      default:
        "medium",
    },

    source: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default:
        "active",
    },

    lifecycle: {
      type: String,
      default:
        "detected",
    },

    escalationCount: {
      type: Number,
      default: 1,
    },

    parent: {
      type: String,
      default: null,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

  },

  {
    timestamps: true,
  }
);

const Incident =
  mongoose.model(
    "Incident",
    incidentSchema
  );

export default Incident;