// Fetch and Update Policy Votes from Express Backend
async function fetchVotes() {
    try {
        const res = await fetch('/api/v1/policy/votes');
        const data = await res.json();
        if (data.success) {
            updateVoteUI(data.votes);
        }
    } catch (err) {
        console.error('Error fetching votes:', err);
    }
}

async function votePolicy(idx) {
    try {
        const res = await fetch('/api/v1/policy/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ policyIndex: idx })
        });
        const data = await res.json();
        if (data.success) {
            updateVoteUI(data.votes);
        }
    } catch (err) {
        console.error('Error posting vote:', err);
    }
}

function updateVoteUI(votes) {
    const total = votes.reduce((a, b) => a + b, 0);
    votes.forEach((v, i) => {
        const pct = Math.round((v / total) * 100);
        const pctElem = document.getElementById(`pct-${i}`);
        const barElem = document.getElementById(`bar-${i}`);
        if (pctElem && barElem) {
            pctElem.innerText = pct + '% Priority';
            barElem.style.width = pct + '%';
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchVotes);