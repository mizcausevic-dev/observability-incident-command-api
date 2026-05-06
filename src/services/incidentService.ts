import { incidents, playbooks, responders, services } from "../data.js";
import type {
  AnalysisResponse,
  IncidentAnalysisInput,
  IncidentStatus,
  PlaybookResponse,
} from "../types.js";

function statusFromScore(score: number): IncidentStatus {
  if (score >= 85) {
    return "critical";
  }

  if (score >= 55) {
    return "degraded";
  }

  return "contained";
}

export function analyzeIncident(input: IncidentAnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 25;

  if (input.environment === "production") {
    issues.push("Customer-facing production degradation is ongoing.");
    score += 20;
  } else {
    passedChecks.push("Incident is not affecting production.");
  }

  if (input.minutesOpen > 30) {
    issues.push("Incident duration exceeds first-response containment target.");
    score += 18;
  } else {
    passedChecks.push("Incident is within the first-response containment window.");
  }

  if (input.affectedCustomers > 1000) {
    issues.push("Large customer impact increases command urgency.");
    score += 18;
  } else {
    passedChecks.push("Blast radius remains below the major-incident threshold.");
  }

  if (input.isRevenueImpacting) {
    issues.push("Revenue-impacting symptoms raise escalation priority.");
    score += 16;
  } else {
    passedChecks.push("No direct revenue-impacting signal is present.");
  }

  if (!input.primaryResponderAvailable) {
    issues.push("Primary responder availability gap increases coordination risk.");
    score += 10;
  } else {
    passedChecks.push("Primary responder is available.");
  }

  if (input.executiveVisibility) {
    issues.push("Executive visibility requires structured communication and command discipline.");
    score += 10;
  } else {
    passedChecks.push("Executive visibility is not yet required.");
  }

  if (input.severitySignals.includes("error-rate-breach")) {
    score += 8;
  }

  if (input.severitySignals.includes("customer-login-failures")) {
    score += 8;
  }

  passedChecks.push("Service ownership is clearly defined.");

  const finalScore = Math.min(100, score);
  const status = statusFromScore(finalScore);
  const recommendedNextAction =
    status === "critical"
      ? "Activate incident command, publish stakeholder update, and escalate to platform leadership immediately."
      : status === "degraded"
        ? "Maintain incident bridge, assign owner actions, and continue customer-impact monitoring."
        : "Route to the owning team, monitor, and avoid broad escalation unless severity increases.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeEscalation(input: IncidentAnalysisInput): AnalysisResponse {
  return analyzeIncident(input);
}

export function analyzePlaybook(input: IncidentAnalysisInput): PlaybookResponse {
  const rationale: string[] = [];
  let priority: PlaybookResponse["priority"] = "medium";
  let playbook = playbooks[2].title;

  if (
    input.environment === "production" &&
    input.isRevenueImpacting &&
    input.executiveVisibility
  ) {
    priority = "critical";
    playbook = playbooks[0].title;
    rationale.push("Production impact, revenue risk, and executive visibility demand formal incident command.");
  }

  if (
    input.environment === "production" &&
    input.primaryResponderAvailable &&
    input.affectedCustomers < 1000 &&
    !input.executiveVisibility
  ) {
    priority = "high";
    playbook = playbooks[1].title;
    rationale.push("The incident is active but still fits a controlled engineering-bridge response.");
  }

  if (rationale.length === 0) {
    rationale.push("Current symptoms fit an engineering-owned issue without immediate command expansion.");
  }

  if (input.minutesOpen > 30) {
    rationale.push("Open duration increases escalation urgency.");
    if (priority === "medium") {
      priority = "high";
    }
  }

  const playbookEntry = playbooks.find((entry) => entry.title === playbook) ?? playbooks[2];

  return {
    priority,
    playbook,
    rationale,
    recommendedNextAction: playbookEntry.recommendedAction,
  };
}

export function getDashboardSummary() {
  const criticalIncidents = incidents.filter(
    (incident) => incident.status === "critical",
  ).length;
  const productionServices = services.filter(
    (service) => service.environment === "production",
  ).length;
  const availableResponders = responders.filter(
    (responder) => responder.available,
  ).length;

  return {
    serviceCount: services.length,
    productionServiceCount: productionServices,
    openIncidentCount: incidents.length,
    criticalIncidentCount: criticalIncidents,
    availableResponders,
    topCommandPriorities: [
      "Revenue-impacting authentication degradation",
      "Executive-visible stakeholder communication",
      "Responder coordination and containment timing",
    ],
  };
}
