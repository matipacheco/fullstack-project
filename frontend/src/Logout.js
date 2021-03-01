import React, { useContext } from 'react';
import { logout } from './utils/requests';
import { AppContext } from './context/Context';
import { useHistory } from 'react-router-dom';

export default function Logout() {
  let history = useHistory();
  const appContext = useContext(AppContext);

  const doLogout = () => {
    logout(successCallback);
    history.push('/');
  };

  const successCallback = () => {
    appContext.updateUser({});
  };

  return (
    <div className="btn btn-info" onClick={doLogout}>
      Logout
    </div>
  );
}
