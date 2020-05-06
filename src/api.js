const headers = {
  "content-type": "application/json",
  "x-apikey": "5eb2191d4064fd38041652e6",
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
        return json[0] ? json[0] : null;
      })
      .catch((error) => {
        throw new Error("Error:", error);
      });
  },
  saveInfo: (objectId, token, answeredIds) => {
    return fetch(`${baseUrl}/${objectId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ token, trivia_set: answeredIds }),
    })
      .then((response) => response.json())
      .then((data) => {
        return { Success: true, data };
      })
      .catch((error) => {
        throw new Error("Error:", error);
      });
  },
  createNewUser: (token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        token,
        trivia_set: JSON.stringify([]),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new Error("Error:", error);
      });
  },
};
