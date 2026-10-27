const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database State
let dbState = {
    votes: [42, 28, 18, 12],
    auditLogs: []
};

// --- REST API ENDPOINTS ---

// GET: Core Stats & Editorial Data
app.get('/api/v1/stats', (req, res) => {
    res.json({
        success: true,
        fatalities2025: 183382,
        hourlyToll: 21,
        unpaidChallansCr: 23000,
        indiaFatalityRate: 16.2,
        singaporeFatalityRate: 1.4,
        vietnamPassMark: 91
    });
});

// GET: Policy Votes
app.get('/api/v1/policy/votes', (req, res) => {
    res.json({ success: true, votes: dbState.votes });
});

// POST: Policy Upvote
app.post('/api/v1/policy/vote', (req, res) => {
    const { policyIndex } = req.body;
    if (policyIndex >= 0 && policyIndex < dbState.votes.length) {
        dbState.votes[policyIndex]++;
        return res.json({ success: true, votes: dbState.votes });
    }
    res.status(400).json({ success: false, message: 'Invalid policy index' });
});

// GET: HITL Audit Logs
app.get('/api/v1/hitl/logs', (req, res) => {
    res.json({ success: true, logs: dbState.auditLogs });
});

// POST: HITL Action
app.post('/api/v1/hitl/action', (req, res) => {
    const { caseId, action, details, inspector } = req.body;
    const entry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        caseId,
        action,
        details,
        inspector: inspector || 'Insp. Sharma #4029'
    };
    dbState.auditLogs.unshift(entry);
    res.json({ success: true, log: entry, totalLogs: dbState.auditLogs.length });
});

// GET: Sample response for browser address bar testing
app.get('/api/v1/enforcement/assess', (req, res) => {
    res.json({
        success: true,
        message: "AI Enforcement Assessment Endpoint Ready. Send a POST request with vehicle data to compute risk scores.",
        samplePayload: {
            vehicleNo: "DL-01-AB-4242",
            pendingFinesCount: 42,
            unpaidAmount: 42000,
            daysOverdue: 210
        }
    });
});

// POST: AI Violation Risk Assessment & Enforcement Engine
app.post('/api/v1/enforcement/assess', (req, res) => {
    const { vehicleNo, pendingFinesCount, unpaidAmount, daysOverdue, violations } = req.body;

    const count = parseInt(pendingFinesCount) || 0;
    const amount = parseFloat(unpaidAmount) || 0;
    const overdue = parseInt(daysOverdue) || 0;

    // AI Risk Score Algorithm
    let riskScore = Math.min(100, (count * 1.5) + (amount / 1000) + (overdue / 10));
    riskScore = Math.round(riskScore);

    // Decision Logic
    let severity = 'LOW';
    let recommendedAction = 'Issue standard SMS payment reminder.';
    let legalGrounds = 'Motor Vehicles Act Section 177';
    let requireImpoundment = false;
    let requireSuspension = false;

    if (riskScore >= 70 || count >= 10) {
        severity = 'CRITICAL (HIGH IMPUNITE RISK)';
        recommendedAction = 'AUTOMATIC LICENSE SUSPENSION (3 Months) + VEHICLE IMPOUNDMENT WARRANT';
        legalGrounds = 'Motor Vehicles (Amendment) Act - Repeat Offender Protocol & Impunity Clause';
        requireImpoundment = true;
        requireSuspension = true;
    } else if (riskScore >= 35 || count >= 3) {
        severity = 'MEDIUM';
        recommendedAction = 'FREEZE REGISTRATION TRANSFER & BLOCK INSURANCE RENEWAL';
        legalGrounds = 'e-Challan Recovery Rule 142';
    }

    const assessmentResult = {
        assessmentId: 'EV-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        vehicleNo: vehicleNo.toUpperCase(),
        riskScore,
        severity,
        recommendedAction,
        legalGrounds,
        requireImpoundment,
        requireSuspension,
        projectedRevenueRecovery: `₹${amount.toLocaleString('en-IN')}`
    };

    res.json({ success: true, assessment: assessmentResult });
});

// Start Server
app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`VigilDrive Node.js Server running on port ${PORT}`);
    console.log(`Access website at: http://localhost:${PORT}`);
    console.log(`================================================`);
});