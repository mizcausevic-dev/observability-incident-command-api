import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Observability Incident Command API");
});

test("GET /api/incidents returns an array", async () => {
  const response = await request(app).get("/api/incidents");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/incident returns score and status", async () => {
  const response = await request(app).post("/api/analyze/incident").send({
    serviceName: "Revenue API",
    environment: "production",
    severitySignals: [
      "latency-spike",
      "error-rate-breach",
      "customer-login-failures",
    ],
    minutesOpen: 37,
    affectedCustomers: 1280,
    isRevenueImpacting: true,
    primaryResponderAvailable: true,
    executiveVisibility: true,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/alerts returns an array", async () => {
  const response = await request(app).get("/api/alerts");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/playbook returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/playbook").send({
    serviceName: "Revenue API",
    environment: "production",
    severitySignals: [
      "latency-spike",
      "error-rate-breach",
      "customer-login-failures",
    ],
    minutesOpen: 37,
    affectedCustomers: 1280,
    isRevenueImpacting: true,
    primaryResponderAvailable: true,
    executiveVisibility: true,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.playbook, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
