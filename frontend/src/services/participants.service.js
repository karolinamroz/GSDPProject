import http from "../http-common";

class ParticipantsDataService {
    getAll() {
        return http.get("/participants");
    }

    get(id) {
        return http.get(`/participants/${id}`);
    }

    create(data) {
        return http.post("/participants", data);
    }

    delete(id) {
        return http.delete(`/participants/${id}`);
    }

    deleteAll() {
        return http.delete(`/participants`);
    }

    findByName(name) {
        return http.get(`/participants?name=${name}`);
    }
}

export default new ParticipantsDataService();