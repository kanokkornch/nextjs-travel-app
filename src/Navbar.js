import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import SchoolIcon from '@material-ui/icons/School';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink: {
    color: 'white',
    textDecoration: 'none'
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  }

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['About me', 'Education', 'Projects', 'Careers'].map((item, index) => (
          <a href={`#section${1 + index}`}>
            <ListItem button key={item}>
              <ListItemIcon>{
                item === 'About me' ? <FaceIcon /> : item === 'Education' ? <SchoolIcon /> : item === 'Projects' ? <LaptopMacIcon /> : <EmojiTransportationIcon />
              }</ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          </a>
        ))}
      </List>
    </div>
  )


  return (
    <div className={classes.root}>
      <AppBar id='app-bar' position="fixed" className='app-bar'>
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <a className={classes.navlink} href="/">
            <Typography variant="h6" className={classes.title}>
              NAIFUN
            </Typography>
          </a>
        </Toolbar>
      </AppBar>
      <Drawer anchor='top' open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}