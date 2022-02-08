/* eslint-disable react/jsx-max-depth */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';
import MyContext from '../../context/Mycontext';
import { BackToTop } from './ScrollTes';

export default function HeaderBar({ title, search }) {
  const history = useHistory();
  const { stateHook: { showSearchInput } } = useContext(MyContext);
  return (
    <>
      <Box sx={ { flexGrow: 1 } }>
        <AppBar position="static" color="primary">
          <Toolbar id="back-to-top-anchor">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={ { mr: 2 } }
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={ { flexGrow: 1, display: 'block' } }
            >
              {title}
            </Typography>
            <Box sx={ { display: 'flex' } }>
              {search && (
                <IconButton
                  size="large"
                  aria-label="search"
                  color="inherit"
                  onClick={ () => showSearchInput() }
                >
                  <SearchIcon />
                </IconButton>
              )}
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={ () => { history.push('/profile'); } }
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <BackToTop />
      {/* <Toolbar /> */}
    </>
  );
}

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
