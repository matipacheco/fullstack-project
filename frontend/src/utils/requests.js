import axios from 'axios';

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
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((error) => {
//       errorCallback(error);
//     });
// };

// TODO: list all favorites endpoint
// const setAsFavorite = (userId, successCallback, errorCallback) => {
//   axios
//     .get('http://127.0.0.1:3010/api/favorites', {
//       params: {
//         user_id: userId,
//       },
//     })
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((error) => {
//       errorCallback(error);
//     });
// };

// TODO: set as favorite endpoint
// const setAsFavorite = (gifId, successCallback, errorCallback) => {
//   axios
//     .post('http://127.0.0.1:3010/api/favorites', {
//       params: {
//         gif_id: gifId,
//       },
//     })
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((error) => {
//       errorCallback(error);
//     });
// };

export { search };
