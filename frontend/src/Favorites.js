import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { listFavorites } from './utils/requests';
import Image from './Image';
import { EmptyFavoritesView, FavoritesLoader } from './utils/commons';
import _ from 'lodash';
import { AppContext } from './context/Context';

/**
 * @function Favorites
 * Component that shows the results of fetching a users favorite images.
 */

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  let history = useHistory();
  const appContext = useContext(AppContext);

  useEffect(() => {
    listFavorites(handleSuccess, handleError);
  }, []);

  const handleSuccess = (response) => {
    setLoading(false);
    setFavorites(response.favorites);
  };

  const handleError = () => {
    history.push('/');
    appContext.updateError(true);
  };

  return (
    <Fragment>
      {loading ? (
        <FavoritesLoader />
      ) : _.isEmpty(favorites) ? (
        <EmptyFavoritesView />
      ) : (
        <div id="cards-wrapper">
          <div className="container">
            {favorites.map((image) => {
              return <Image key={image.id} {...image} favorite={true} />;
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
}
