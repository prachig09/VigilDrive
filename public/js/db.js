// LocalStorage Database & Mock REST API Layer
const DB = {
    init() {
        if (!localStorage.getItem('vigil_votes')) {
            localStorage.setItem('vigil_votes', JSON.stringify([42, 28, 18, 12]));
        }
        if (!localStorage.getItem('vigil_audit_log')) {
            localStorage.setItem('vigil_audit_log', JSON.stringify([]));
        }
    },
    getVotes() {
        return JSON.parse(localStorage.getItem('vigil_votes'));
    },
    saveVotes(votes) {
        localStorage.setItem('vigil_votes', JSON.stringify(votes));
    },
    getLogs() {
        return JSON.parse(localStorage.getItem('vigil_audit_log'));
    },
    addLog(entry) {
        const logs = DB.getLogs();
        logs.unshift(entry);
        localStorage.setItem('vigil_audit_log', JSON.stringify(logs));
    }
};

DB.init();