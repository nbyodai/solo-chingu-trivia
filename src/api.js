const headers = {
  "content-type": "application/json",
  "x-apikey": process.env.VUE_APP_API_KEY,
  "cache-control": "no-cache",
};

const baseUrl = "https://chingusolo-d153.restdb.io/rest/trivialistas";

export const api = {
  getUser: (userToken) => {
    return fetch(`${baseUrl}?q={"token": "${userToken}"}`, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json[0] ? json[0] : null;
        return { success: true, data };
      })
      .catch((error) => {
        return { success: false, data: error };
      });
  },
  saveInfo: ({ id, userToken, topic, answeredIds }) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        topic,
        token: userToken,
        trivia_set: answeredIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return { success: true, data };
      })
      .catch((error) => {
        return { success: false, data: error };
      });
  },
  createNewUser: ({ token, topic, answeredIds }) => {
    return fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        token,
        topic,
        trivia_set: answeredIds,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return { success: false, data: error };
      });
  },
};
