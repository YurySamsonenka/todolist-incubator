import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuButton } from '../MenuButton/MenuButton';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import { getTheme } from '../../theme/theme';
import { changeThemeAC } from '../../../app/app-reducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

const Header = () => {
	const themeMode = useAppSelector(state => state.app.themeMode);
	const theme = getTheme(themeMode);

	const dispatch = useAppDispatch();

	const changeModeHandler = () => {
		dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
	};

	return (
		<AppBar position="static" sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color="inherit">
					<MenuIcon />
				</IconButton>
				<div>
					<MenuButton>Login</MenuButton>
					<MenuButton>Logout</MenuButton>
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={changeModeHandler} />
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
