import type {
  Alert,
  EscalationPolicy,
  Incident,
  IncidentPlaybook,
  Responder,
  Service,
  StatusUpdate,
} from "./types.js";

export const services: Service[] = [
  {
    id: "svc_01",
    name: "Revenue API",
    environment: "production",
    tier: "tier-1",
    ownerTeam: "Platform Engineering",
    customerFacing: true,
    revenueImpacting: true,
  },
  {
    id: "svc_02",
    name: "Search Platform",
    environment: "production",
    tier: "tier-1",
    ownerTeam: "Web Platform",
    customerFacing: true,
    revenueImpacting: false,
  },
  {
    id: "svc_03",
    name: "Analytics Worker",
    environment: "staging",
    tier: "tier-2",
    ownerTeam: "Data Engineering",
    customerFacing: false,
    revenueImpacting: false,
  },
];

export const incidents: Incident[] = [
  {
    id: "inc_01",
    serviceId: "svc_01",
    title: "Revenue API customer login degradation",
    status: "critical",
    startedAt: "2026-05-06T15:10:00.000Z",
    minutesOpen: 37,
    affectedCustomers: 1280,
    executiveVisible: true,
  },
  {
    id: "inc_02",
    serviceId: "svc_02",
    title: "Search latency increase",
    status: "degraded",
    startedAt: "2026-05-06T17:20:00.000Z",
    minutesOpen: 18,
    affectedCustomers: 420,
    executiveVisible: false,
  },
];

export const alerts: Alert[] = [
  {
    id: "alert_01",
    incidentId: "inc_01",
    signal: "latency-spike",
    source: "APM",
    thresholdBreached: "p95 latency > 3.5s",
  },
  {
    id: "alert_02",
    incidentId: "inc_01",
    signal: "error-rate-breach",
    source: "Metrics",
    thresholdBreached: "5xx rate > 7%",
  },
  {
    id: "alert_03",
    incidentId: "inc_01",
    signal: "customer-login-failures",
    source: "Synthetic checks",
    thresholdBreached: "login success rate < 85%",
  },
  {
    id: "alert_04",
    incidentId: "inc_02",
    signal: "cache-miss-spike",
    source: "Metrics",
    thresholdBreached: "cache miss ratio > 30%",
  },
];

export const responders: Responder[] = [
  {
    id: "resp_01",
    team: "Platform Engineering",
    role: "Primary Incident Commander",
    available: true,
    primaryService: "Revenue API",
  },
  {
    id: "resp_02",
    team: "SRE",
    role: "Escalation Lead",
    available: true,
    primaryService: "Revenue API",
  },
  {
    id: "resp_03",
    team: "Support Operations",
    role: "Customer Comms Coordinator",
    available: false,
    primaryService: "Search Platform",
  },
];

export const statusUpdates: StatusUpdate[] = [
  {
    id: "upd_01",
    incidentId: "inc_01",
    summary: "Incident command activated; authentication dependency under review.",
    postedAt: "2026-05-06T15:25:00.000Z",
    audience: "executives",
  },
  {
    id: "upd_02",
    incidentId: "inc_01",
    summary: "Customer support briefed; mitigation steps in progress.",
    postedAt: "2026-05-06T15:31:00.000Z",
    audience: "support",
  },
];

export const escalationPolicies: EscalationPolicy[] = [
  {
    id: "policy_01",
    serviceTier: "tier-1",
    trigger: "customer-facing production incident lasting more than 15 minutes",
    escalationPath: "Activate incident command and notify platform leadership.",
  },
  {
    id: "policy_02",
    serviceTier: "tier-1",
    trigger: "revenue-impacting symptoms or executive visibility",
    escalationPath: "Route to executive-visible status communication and cross-functional incident bridge.",
  },
  {
    id: "policy_03",
    serviceTier: "tier-2",
    trigger: "non-customer-facing degradation",
    escalationPath: "Route to owning engineering team and monitor for expansion.",
  },
];

export const playbooks: IncidentPlaybook[] = [
  {
    id: "playbook_01",
    title: "Executive-visible production incident",
    trigger: "Tier-1 customer-facing outage with revenue impact",
    recommendedAction: "Activate incident command, publish stakeholder update, and escalate to platform leadership immediately.",
  },
  {
    id: "playbook_02",
    title: "Contained service degradation",
    trigger: "Customer impact exists but primary responder is active and blast radius is limited",
    recommendedAction: "Maintain engineering bridge, continue mitigation, and publish internal status updates at defined intervals.",
  },
  {
    id: "playbook_03",
    title: "Non-critical platform anomaly",
    trigger: "Engineering-owned issue with no material customer or executive impact",
    recommendedAction: "Route to owning team, monitor, and avoid broad escalation unless severity increases.",
  },
];
