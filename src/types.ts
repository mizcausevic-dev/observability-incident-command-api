export type IncidentStatus = "contained" | "degraded" | "critical";
export type ServiceTier = "tier-1" | "tier-2" | "tier-3";

export interface Service {
  id: string;
  name: string;
  environment: "production" | "staging" | "development";
  tier: ServiceTier;
  ownerTeam: string;
  customerFacing: boolean;
  revenueImpacting: boolean;
}

export interface Incident {
  id: string;
  serviceId: string;
  title: string;
  status: IncidentStatus;
  startedAt: string;
  minutesOpen: number;
  affectedCustomers: number;
  executiveVisible: boolean;
}

export interface Alert {
  id: string;
  incidentId: string;
  signal: string;
  source: string;
  thresholdBreached: string;
}

export interface Responder {
  id: string;
  team: string;
  role: string;
  available: boolean;
  primaryService: string;
}

export interface StatusUpdate {
  id: string;
  incidentId: string;
  summary: string;
  postedAt: string;
  audience: string;
}

export interface EscalationPolicy {
  id: string;
  serviceTier: ServiceTier;
  trigger: string;
  escalationPath: string;
}

export interface IncidentPlaybook {
  id: string;
  title: string;
  trigger: string;
  recommendedAction: string;
}

export interface IncidentAnalysisInput {
  serviceName: string;
  environment: "production" | "staging" | "development";
  severitySignals: string[];
  minutesOpen: number;
  affectedCustomers: number;
  isRevenueImpacting: boolean;
  primaryResponderAvailable: boolean;
  executiveVisibility: boolean;
}

export interface AnalysisResponse {
  status: IncidentStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface PlaybookResponse {
  priority: "medium" | "high" | "critical";
  playbook: string;
  rationale: string[];
  recommendedNextAction: string;
}
