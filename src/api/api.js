import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3/";
export const API_KEY_3 = "3f4ca4f3a9750da53450646ced312397";
export const API_KEY_4 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjRjYTRmM2E5NzUwZGE1MzQ1MDY0NmNlZDMxMjM5NyIsInN1YiI6IjVhYzlmNWRkOTI1MTQxNjJhZTA1Njk0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fc4f9DVB6pFWh6hIjYe0NCC4pImdmNzDIfi_3Nb3tC4";

export const fetchApi = (method, url, options = { params: {}, body: {} }) => {
  const params = {
    api_key: API_KEY_3,
    ...options.params
  };

  switch (method) {
    case "GET":
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}${url}?${queryString.stringify(params)}`)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => resolve(data))
          .catch(response => response.json().then(error => reject(error)));
      });

    case "POST":
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}${url}?${queryString.stringify(params)}`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(options.body)
        })
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => resolve(data))
          .catch(response => response.json().then(error => reject(error)));
      });
    default:
      return new Promise((resolve, reject) => {
        fetch(`${API_URL}${url}${queryString.stringify(params)}`)
          .then(response => {
            if (response.status < 400) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(data => resolve(data))
          .catch(response => response.json().then(error => reject(error)));
      });
  }
};
