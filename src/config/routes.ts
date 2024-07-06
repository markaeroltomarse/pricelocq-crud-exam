import { Home as HomeIcon } from '@mui/icons-material';

import { Home } from 'src/pages/Home';
import PostPage from 'src/pages/Post/[postId]';
import { TRoute } from '../types/Route';

const routes: TRoute[] = [
	{
		key: 'router-home',
		title: 'Home',
		description: 'Home',
		component: Home,
		path: '/',
		isEnabled: true,
		icon: HomeIcon,
		appendDivider: true,
	},
	{
		key: 'router-post',
		title: 'Post page',
		description: 'Post page',
		component: PostPage,
		path: '/post/:postId',
		isEnabled: true,
		appendDivider: true,
	},
];

export default routes;
