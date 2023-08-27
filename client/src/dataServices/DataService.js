import http from "../http-common";

class dealDataService {
  getAll() {
    return http.get("/deals");
  }

  get(id) {
    return http.get(`/deals/${id}`);
  }

  create(data) {
    return http.post("/deals", data);
  }

  update(id, data) {
    return http.put(`/deals/${id}`, data);
  }

  delete(id) {
    return http.delete(`/deals/${id}`);
  }

  deleteAll() {
    return http.delete(`/deals`);
  }

  findByTitle(title) {
    return http.get(`/deals?title=${title}`);
  }
}

export default new dealDataService();