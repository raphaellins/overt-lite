import React, { Component } from 'react';
import axios from 'axios';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from './util/auth'
import { Theme, createStyles, Button } from '@material-ui/core';
import { withRouter, RouteProps, RouteComponentProps } from 'react-router-dom';

const drawerWidth = 240;

const styles = (theme: Theme) => (
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    avatar: {
      height: 110,
      width: 100,
      flexShrink: 0,
      flexGrow: 0,
      marginTop: 20
    },
    uiProgess: {
      position: 'fixed',
      Index: '1000',
      height: '31px',
      width: '31px',
      left: '50%',
      top: '35%'
    },
    toolbar: theme.mixins.toolbar
  }));

interface IState {
  firstName?: String,
  lastName?: String,
  profilePicture?: String,
  uiLoading?: boolean,
  imageLoading?: boolean,
  render?: boolean,
  email?: String,
  phoneNumber?: String,
  country?: String,
  username?: String,
  errorMsg?: String,
  left?: boolean
}

type PropsType = RouteComponentProps & {
  history?: Array<String>;
  classes: any;
  children: any;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

class App extends Component<PropsType, IState, RouteProps> {
  state: IState = {
    render: true,
    firstName: '',
    lastName: '',
    profilePicture: '',
    uiLoading: true,
    imageLoading: false
  };

  logoutHandler = (event: any) => {
    localStorage.removeItem('AuthToken');
    this.props.history?.push('/login');

    this.setState({ left: false });
  };

  loadPage = (page: string) => {
    this.props.history?.push(page)
    this.setState({ left: false });
    console.log(page);
  }

  componentWillMount = async () => {
    try {
      authMiddleWare(this.props.history);
      const authToken = localStorage.getItem('AuthToken');
      axios.defaults.headers.common = { Authorization: `${authToken}` };

      const response = await axios.get('https://us-central1-overtlite.cloudfunctions.net/api/user');

      this.setState({
        firstName: response.data.userCredentials.firstName,
        lastName: response.data.userCredentials.lastName,
        email: response.data.userCredentials.email,
        phoneNumber: response.data.userCredentials.phoneNumber,
        country: response.data.userCredentials.country,
        username: response.data.userCredentials.username,
        uiLoading: false,
        profilePicture: response.data.userCredentials.imageUrl
      });
    } catch (error) {
      if (error.response.status === 403) {
        this.props.history?.push('/login')
      }
      this.setState({ errorMsg: 'Error in retrieving the data', uiLoading: false });
    }

  };

  toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {

    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    this.setState({ ...this.state, [anchor]: open })
  };

  render() {
    const { classes } = this.props;
    const { left } = this.state;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
        </div>
      );
    } else {
      return (
        <div className={classes.root} >
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Button onClick={this.toggleDrawer("left", true)}>Menu</Button>
              <Typography variant="h6" noWrap>
                Overt Lite
							</Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            anchor="left"
            open={left}
            onClose={() => this.toggleDrawer('left', false)}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <p>
              {' '}
              {this.state.firstName} {this.state.lastName}
            </p>
            <Divider />
            <List>
              <ListItem button key="Lottery" onClick={() => this.loadPage("/")}>
                <ListItemIcon>
                  {' '}
                  <NotesIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Lottery" />
              </ListItem>
              <ListItem button key="NewDraw" onClick={() => this.loadPage("/draw")}>
                <ListItemIcon>
                  {' '}
                  <NotesIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="New Draw" />
              </ListItem>
              <ListItem button key="NewGame" onClick={() => this.loadPage("/game")}>
                <ListItemIcon>
                  {' '}
                  <NotesIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="New Game" />
              </ListItem>
              <ListItem button key="Account" onClick={() => this.loadPage("/account")}>
                <ListItemIcon>
                  {' '}
                  <AccountBoxIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>

              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemIcon>
                  {' '}
                  <ExitToAppIcon />{' '}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>

          <div>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(withRouter(App));