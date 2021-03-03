import React, { Fragment, useContext, useEffect } from 'react';
import { AppContext } from './../context/Context';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

/**
 * @function EmptySearchView
 * Component displayed when a the user has not performed a search yet.
 */

function EmptySearchView() {
  return (
    <div className="empty">
      <h3>EverlyGIFs</h3>
      <p>Your favorite GIF search engine</p>
      <img src="https://media.giphy.com/media/VekcnHOwOI5So/source.gif" alt="Empty view" />
    </div>
  );
}

/**
 * @function EmptyFavoritesView
 * Component displayed when a does not have any favorite images.
 */

function EmptyFavoritesView() {
  return (
    <div className="empty centered">
      <h3>You dont have favorite images!</h3>
      <p>Go on and surf the internet a little bit</p>
      <img src="https://media.giphy.com/media/AC0oYA3RcRri/source.gif" alt="Empty view" />
    </div>
  );
}

/**
 * @function FavoritesLoader
 * Component displayed when the favorites component is fetching data form the API.
 */

function FavoritesLoader() {
  return (
    <div className="empty centered">
      <Spinner animation="border" variant="dark" size="large" role="status" />
    </div>
  );
}

/**
 * @function NetworkErrorView
 * Component displayed when a network error ocurrs.
 */

function NetworkErrorView() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.error) {
      displayToast();
    }
  }, [appContext.error])

  const displayToast = () => {
    toast.error('We were to communicate with our services', {
      position: 'top-right',
      autoClose: 4000,
      draggable: false,
      closeOnClick: true,
      pauseOnHover: false,
      hideProgressBar: false,
    });
  };

  return <Fragment/>;
}

export { EmptySearchView, NetworkErrorView, EmptyFavoritesView, FavoritesLoader };
