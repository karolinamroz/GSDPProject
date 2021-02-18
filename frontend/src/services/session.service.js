import http from "../http-common";

class SessionDataService {
    getAll() {
        return http.get("/sessions");
    }

    get(id) {
        return http.get(`/sessions/${id}`);
    }

    create(data) {
        return http.post("/sessions", data);
    }
    
    update (id,data) {
        return http.put(`sessions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/sessions/${id}`);
    }

    deleteAll() {
        return http.delete("/sessions");
    }

    findBySubject(subject) {
        return http.get(`/sessions?subjet=${subject}`);
    }
}

export default new SessionDataService();