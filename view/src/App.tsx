import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { authMiddleWare } from './util/auth'
import { Theme, createStyles, Button } from '@material-ui/core';
import { withRouter, RouteProps, RouteComponentProps } from 'react-router-dom';
import { GetUser } from './util/Proxy';

const styles = (theme: Theme) => (
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: 240,
      flexShrink: 0
    },
    drawerPaper: {
      width: 240
    },
    uiProgess: {
      Index: '1000',
      height: '31px',
      width: '31px',
    },
    container: {
      paddingRight: 10,
      paddingLeft: 10
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
  }

  componentWillMount = async () => {
    authMiddleWare(this.props.history);

    try {
      const response = await GetUser();

      if (response && response.data) {
        this.setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          phoneNumber: response.data.userCredentials.phoneNumber,
          country: response.data.userCredentials.country,
          username: response.data.userCredentials.username,
          uiLoading: false
        });
      }

    } catch (error) {
      localStorage.removeItem('AuthToken');
      this.props.history?.push('/login');
      this.setState({ errorMsg: 'Error in retrieving the data', uiLoading: false });
    }
  };

  toggleDrawer = (anchor: Anchor, open: boolean) => async (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    try {
      await GetUser();
      this.setState({ ...this.state, [anchor]: open })
    } catch (err) {
      console.log('Login Invalid');
    }
  };

  render() {
    const { classes } = this.props;
    const { left, username } = this.state;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.container}>
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
            <List>
              <ListItem button key="Lottery" onClick={() => this.loadPage("/")}>
                <ListItemText primary="Lottery" />
              </ListItem>
              <ListItem button key="NewDraw" onClick={() => this.loadPage("/draw")}>
                <ListItemText primary="New Draw" />
              </ListItem>
              <ListItem button key="NewGame" onClick={() => this.loadPage("/game")}>
                <ListItemText primary="New Game" />
              </ListItem>
              <ListItem button key="Account" onClick={() => this.loadPage("/account")}>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
          <div className={classes.container}>
            {this.props.children}
          </div>
        </div>
      );
    }
  }
}

export default withStyles(styles)(withRouter(App));