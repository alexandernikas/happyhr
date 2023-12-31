import http from "./http-paths";

class DataService {
  getAll() {
    return http.get("/deals");
  }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

  create(data) {
    return http.post("/add_deal", data);
  }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new DataService();