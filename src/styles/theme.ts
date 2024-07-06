import { createTheme, responsiveFontSizes } from '@mui/material';

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from '../utils/constants';

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME) => {
	let theme = createTheme({
		typography: {
			fontFamily: 'Inter, Arial, sans-serif',
		},
		palette: {
			mode,

			primary: {
				main: '#fdcb6e', // Yellow
				contrastText: '#634900',
			},
			secondary: {
				main: '#003399', // Blue
			},
			background: {
				default: '#F2F2F2', // Light Gray
				paper: '#FFFFFF', // White
			},
			error: {
				main: '#FFA500', // Orange (for accent colors)
			},
			text: {
				primary: '#000000', // Black (for text)
			},
		},
	});

	theme = responsiveFontSizes(theme);
	return theme;
};
