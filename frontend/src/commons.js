import React from 'react';

/**
 * @function EmptyView
 * Component displayed when a the user has not performed a search yet.
 */

function EmptyView() {
  return (
    <div className="empty">
      <h3>EverlyGIFs</h3>
      <p>Your favorite GIF search engine</p>
      <img src="https://media.giphy.com/media/VekcnHOwOI5So/source.gif" alt="Empty view" />
    </div>
  );
}

/**
 * @function ErrorView
 * Component displayed when a network error ocurrs.
 */

function ErrorView() {
  return (
    <div className="empty">
      <h3>An error has occured</h3>
      <p>Try again later</p>
      <img src="https://media.giphy.com/media/VekcnHOwOI5So/source.gif" alt="Error view" />
    </div>
  );
}

export { EmptyView, ErrorView };
