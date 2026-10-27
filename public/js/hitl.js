async function processViolation(action, caseId, details) {
    try {
        const res = await fetch('/api/v1/hitl/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, caseId, details })
        });
        const data = await res.json();
        if (data.success) {
            fetchLogs();
        }
    } catch (err) {
        console.error('Error submitting HITL action:', err);
    }
}

async function fetchLogs() {
    try {
        const res = await fetch('/api/v1/hitl/logs');
        const data = await res.json();
        if (data.success) {
            renderAuditLogs(data.logs);
        }
    } catch (err) {
        console.error('Error fetching logs:', err);
    }
}

function renderAuditLogs(logs) {
    const tableBody = document.getElementById('auditTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = logs.map(log => `
        <tr class="border-b border-slate-800 text-xs text-slate-300">
            <td class="p-2">${log.timestamp}</td>
            <td class="p-2 font-mono">${log.caseId}</td>
            <td class="p-2 font-semibold text-emerald-400">${log.action}</td>
            <td class="p-2 text-slate-400">${log.details}</td>
            <td class="p-2">${log.inspector}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', fetchLogs);