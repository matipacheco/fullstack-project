import axios from 'axios';

/**
 * Fetches GIF information from the API.
 *
 * @param {string} searchTerm
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

const search = (searchTerm, successCallback, errorCallback) => {
  axios
    .get('http://127.0.0.1:3010/api/images', {
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

// TODO: login endpoint
// const login = (userData, successCallback, errorCallback) => {
//   axios
//     .get('http://127.0.0.1:3010/api/authenticate', {
//       params: {
//         email: userData.email,
//         password: userData.password,
//       },
//     })
//     ...
// };

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

export { search };
