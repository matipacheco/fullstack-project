import React, { useState, useEffect, Fragment } from 'react';
import { listFavorites } from './utils/requests';
import Image from './Image';
import { EmptyFavoritesView, FavoritesLoader } from './commons';
import _ from 'lodash';

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    listFavorites(handleSuccess);
  }, []);

  const handleSuccess = (response) => {
    setLoading(false);
    setFavorites(response.favorites);
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
