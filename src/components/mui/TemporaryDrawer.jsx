import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DoneIcon from '@mui/icons-material/Done';
import { useHistory } from 'react-router-dom';

export default function TemporaryDrawer() {
  const [showDraw, setshowDraw] = useState(false);
  const history = useHistory();

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
    <div>
      <h2>Teste</h2>
      <Button onClick={ toggleDrawer(true) }>left</Button>
      <Drawer
        anchor="left"
        open={ showDraw }
        onClose={ toggleDrawer(false) }
      >
        {list()}
      </Drawer>
    </div>
  );
}
