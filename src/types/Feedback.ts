export type TSnackbar = {
	message: string;
	vertical?: 'top' | 'bottom';
	horizontal?: 'right' | 'left' | 'center';
};

export type TSetting = {
	open: boolean;
	transition?: boolean;
	postTableViewMode?: 'list' | 'grid';
};
