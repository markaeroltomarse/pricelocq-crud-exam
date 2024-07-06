import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { APP_DESCRIPTION, APP_TITLE } from './utils/constants';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Helmet>
				<title>{APP_TITLE}</title>
				<meta name='description' content={APP_DESCRIPTION} />
				<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Helmet>
			<App />
		</HelmetProvider>
	</React.StrictMode >,
);
