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
    .get(
      'http://localhost:3010/api/images/search',
      {
        params: {
          q: searchTerm,
        },
      },
      {
        withCredentials: true,
      }
    )
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
    .post(
      'http://localhost:3010/api/login',
      {
        user: {
          username: userData.username,
          password: userData.password,
        },
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * Logs user out from the API.
 *
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const logout = (successCallback, errorCallback) => {
  axios
    .post(
      'http://localhost:3010/api/logout',
      {},
      {
        withCredentials: true,
      }
    )
    .then(() => {
      successCallback();
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
    .post(
      'http://localhost:3010/api/users',
      {
        user: {
          username: userData.username,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
        },
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * Allows user to add an image to its favorites, using the API.
 *
 * @param {string} gidId
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const addToFavorites = (gifId, successCallback, errorCallback) => {
  axios
    .post(
      'http://localhost:3010/api/favorites',
      {
        image_id: gifId,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};

/**
 * Lists logged user favorite images.
 *
 * @param {function} successCallback
 * @param {function} errorCallback
 * @public
 */

export const listFavorites = (successCallback, errorCallback) => {
  axios
    .get(
      'http://localhost:3010/api/favorites',
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      successCallback(response.data);
    })
    .catch((error) => {
      errorCallback(error);
    });
};
