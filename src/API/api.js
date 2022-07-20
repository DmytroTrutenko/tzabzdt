import axios from "axios";

export const apiapp = {
  getUsers(url) {
    return axios.get(url);
  },

  getPos() {
    return axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
    );
  },

  getToken() {
    return axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/token"
    );
  },

  async postUser(formData, token) {
    return await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      { method: "POST", body: formData, headers: { Token: token } }
    ).then( (response)=> {
      if (!response.ok) {
        // get error message from body or default to response status
        const error =  response.status;
        return Promise.reject(error);
    }
      return response.json();
    });
  },
};
