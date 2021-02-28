import axios from 'axios';

/**
 * Fetches GIF information from the API.
 *
 * @param {string} searchTerm
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const search = (searchTerm, successCallback, errorCallback) => {
  axios
    .get('http://127.0.0.1:3010/api/images/search', {
      params: {
        q: searchTerm,
      },
    })
    .then((response) => {
      successCallback(response.data.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * Authenticates user to the API.
 *
 * @param {object} userData ({ user: { username: '', password: '' } })
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const login = (userData, successCallback, errorCallback) => {
  axios
    .post('http://127.0.0.1:3010/api/login', {
      user: {
        username: userData.username,
        password: userData.password
      },
    })
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * Creates user through the API.
 *
 * @param {object} userData ({ user: { username: '', password: '', , password_confirmation: '' } })
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const signup = (userData, successCallback, errorCallback) => {
  axios
    .post('http://127.0.0.1:3010/api/users', {
      user: {
        username: userData.username,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      },
    })
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

// TODO: list all favorites endpoint
// const setAsFavorite = (userId, successCallback, errorCallback) => {
//   axios
//     .get('http://127.0.0.1:3010/api/favorites', {
//       params: {
//         user_id: userId,
//       },
//     })
//     ...
// };

// TODO: set as favorite endpoint
// const setAsFavorite = (gifId, successCallback, errorCallback) => {
//   axios
//     .post('http://127.0.0.1:3010/api/favorites', {
//       params: {
//         gif_id: gifId,
//       },
//     })
//     ...
// };
