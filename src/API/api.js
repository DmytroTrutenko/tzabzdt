import axios from "axios";

export const apiapp = {
  getUsers() {
    return axios.get(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5"
    );
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

  postUser(formData, token) {
    return fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      { method: "POST", body: formData, headers: { Token: token } }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.success) {
        } else {
        }
      })
      .catch(function (error) {});
  },
};
