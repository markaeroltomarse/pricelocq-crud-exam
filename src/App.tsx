import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import {
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { routes } from './config';
import store from './store';
import './styles/index.css';
import { getAppTheme } from './styles/theme';
import { TRoute } from './types';

const storeInstance = store();
const persistor = persistStore(storeInstance);

function App() {

	const addRoute = (route: TRoute) => {
		return (
			<Route key={route.key} path={route.path} Component={route.component} />
		);
	}

	const routeList = routes.map((route: TRoute) =>
		route.subRoutes ? route.subRoutes.map((item: TRoute) => addRoute(item)) : addRoute(route),
	);

	const theme = getAppTheme('light')

	return <Provider store={storeInstance}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Routes>
						{routeList}
					</Routes>
				</Router>
			</ThemeProvider>
		</PersistGate>
	</Provider >
}

export default App;
