import React from 'react';
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
import Box from '@mui/material/Box';

export default function DrawerRecipe() {
  return (
    <Box
      sx={ { width: 180 } }
      role="presentation"
      onClick={ toggleDrawer(false) }
      onKeyDown={ toggleDrawer(false) }
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <TakeoutDiningIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Foods" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LocalBarIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Drinks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ManageSearchIcon sx={ { width: 20 } } />
          </ListItemIcon>
          <ListItemText primary="Explorar" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favoritos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary="Feitos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Box>
  );
}
