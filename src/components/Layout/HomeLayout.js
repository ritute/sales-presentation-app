import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { find } from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CollectionsIcon from '@material-ui/icons/Collections';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import ErrorBoundary from '../Status/ErrorBoundary';

const avatar = require('../../images/avatar.jpeg');
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing(1),
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh',
    overflow: 'auto',
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  name: {
    padding: theme.spacing(3),
  },
  list: {
    paddingTop: theme.spacing(6),
  },
});

const drawerListItems = [
  {
    label: 'Presentations',
    path: '/',
    icon: <SlideshowIcon />
  },
  {
    label: 'Asset Library',
    path: '/assets',
    icon: <CollectionsIcon />
  },
];

class HomeLayout extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  getTitle = (path) => {
    return find(drawerListItems, { path }).label;
  }

  render() {
    const { classes, theme, children, location: { pathname } } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Grid container className={classes.root} spacing={1} alignItems="center">
            <Grid item>
              <Avatar alt="John Doe" src={avatar} className={classes.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit" noWrap>
                John Doe
              </Typography>
            </Grid>
          </Grid>
        </div>
        <List className={classes.list}>
          {drawerListItems.map(listItem => (
            <ListItem
              button
              key={listItem.label}
              selected={pathname === listItem.path}
              component={Link}
              to={listItem.path}
            >
              <ListItemIcon>{listItem.icon}</ListItemIcon>
              <ListItemText primary={listItem.label} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.getTitle(pathname)}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true })
)(HomeLayout);
