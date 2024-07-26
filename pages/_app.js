import 'styles/globals.css';
import * as React  from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import config from '../auth_config.json';

const onRedirectCallback = (appState) => {
  window.history.replaceState( ', window.document.title, appState && appState.returnTo || window.location.pathname );
};

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId} redirectUri={config.redirectUri} onRedirectCallback={onRedirectCallback}>
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;