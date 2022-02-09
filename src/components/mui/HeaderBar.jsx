/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
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
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DoneIcon from '@mui/icons-material/Done';
import { BackToTop } from './ScrollTes';
import MyContext from '../../context/Mycontext';

export default function HeaderBar({ title, search }) {
  const history = useHistory();
  const { stateHook: { showSearchInput } } = useContext(MyContext);
  const [showDraw, setshowDraw] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setshowDraw(open);
  };

  const list = () => (
    <Box
      sx={ { width: 180 } }
      role="presentation"
      onClick={ toggleDrawer(false) }
      onKeyDown={ toggleDrawer(false) }
    >
      <List>
        <ListItem button onClick={ () => history.push('/foods') }>
          <ListItemIcon>
            <TakeoutDiningIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Foods" />
        </ListItem>
        <ListItem button onClick={ () => history.push('/drinks') }>
          <ListItemIcon>
            <LocalBarIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Drinks" />
        </ListItem>
        <ListItem button onClick={ () => history.push('/explore') }>
          <ListItemIcon>
            <ManageSearchIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Explorar" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={ () => history.push('/favorite-recipes') }>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favoritos" />
        </ListItem>
        <ListItem button onClick={ () => history.push('/done-recipes') }>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary="Feitos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={ () => history.push('/profile') }>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Box>
  );
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
              onClick={ toggleDrawer(true) }
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={ showDraw }
              onClose={ toggleDrawer(false) }
            >
              {list()}
            </Drawer>
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
      <BackToTop />
    </>
  );
}

HeaderBar.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
