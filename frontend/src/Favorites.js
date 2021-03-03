import React, { useState, useEffect, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { listFavorites } from './utils/requests';
import Image from './Image';
import { EmptyFavoritesView, FavoritesLoader } from './utils/commons';
import _ from 'lodash';
import { AppContext } from './context/Context';
import FavoritesFilter from './FavoritesFilter';

/**
 * @function Favorites
 * Component that shows the results of fetching a users favorite images.
 */

export default function Favorites() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  let history = useHistory();
  const appContext = useContext(AppContext);

  useEffect(() => {
    const handleSuccess = (response) => {
      setLoading(false);
      setFavorites(response.favorites);
    };

    const handleError = () => {
      history.push('/');
      appContext.updateError(true);
    };

    listFavorites(handleSuccess, handleError);
  }, [history, appContext]);

  return (
    <Fragment>
      {loading ? (
        <FavoritesLoader />
      ) : _.isEmpty(favorites) ? (
        <EmptyFavoritesView />
      ) : (
        <Fragment>
          <FavoritesFilter setFilterTerm={setFilterTerm} />

          <div id="cards-wrapper">
            <div className="container">
              {favorites.filter(favorite => favorite.search_term.includes(filterTerm)).map((image) => {
                return <Image key={image.id} {...image} favorite={true} />;
              })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
