function renderCharts() {
    const passElem = document.getElementById('chartPassMark');
    const ukElem = document.getElementById('chartUK');

    if (passElem) {
        new Chart(passElem, {
            type: 'bar',
            data: {
                labels: ['India (Proposed)', 'Vietnam', 'Singapore'],
                datasets: [
                    { label: 'Test Pass Mark %', data: [75, 91, 70], backgroundColor: 'rgba(59, 130, 246, 0.7)' },
                    { label: 'Fatality Rate per 100k', data: [16.2, 13.0, 1.4], backgroundColor: 'rgba(239, 68, 68, 0.8)' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    if (ukElem) {
        new Chart(ukElem, {
            type: 'bar',
            data: {
                labels: ['1934', '2004'],
                datasets: [
                    { label: 'Vehicles (Millions)', data: [2.5, 30.0], backgroundColor: 'rgba(245, 158, 11, 0.7)' },
                    { label: 'Fatalities', data: [7343, 3221], backgroundColor: 'rgba(16, 185, 129, 0.8)' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: '#94a3b8' } } },
                scales: {
                    x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', renderCharts);