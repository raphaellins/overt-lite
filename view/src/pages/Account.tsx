import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardActions, CardContent, Divider, Grid, TextField, Theme, createStyles } from '@material-ui/core';

import clsx from 'clsx';
import { authMiddleWare } from '../util/auth';
import { GetUser } from '../util/Proxy';

const styles = (theme: Theme) => (
	createStyles({
		content: {
			flexGrow: 1,
			padding: theme.spacing(3)
		},
		toolbar: theme.mixins.toolbar,
		root: {},
		details: {
			display: 'flex'
		},
		avatar: {
			height: 110,
			width: 100,
			flexShrink: 0,
			flexGrow: 0
		},
		locationText: {
			paddingLeft: '15px'
		},
		buttonProperty: {
			position: 'absolute',
			top: '50%'
		},
		uiProgess: {
			position: 'fixed',
			Index: '1000',
			height: '31px',
			width: '31px',
			left: '50%',
			top: '35%'
		},
		progess: {
			position: 'absolute'
		},
		uploadButton: {
			marginLeft: '8px',
			margin: theme.spacing(1)
		},
		customError: {
			color: 'red',
			fontSize: '0.8rem',
			marginTop: 10
		},
		submitButton: {
			marginTop: '10px'
		}
	}));

interface IProps {
	history?: Array<string>;
	classes?: any;
}

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
	buttonLoading?: boolean,
	imageError?: String,
	image?: string,
	content?: string
}

class account extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			username: '',
			country: '',
			profilePicture: '',
			uiLoading: true,
			buttonLoading: false,
			imageError: ''
		};
	}

	componentWillMount = async () => {
		authMiddleWare(this.props.history);

		const response = await GetUser((error: any) => {
			if (error.response.status === 403) {
				this.props.history?.push('/login');
			}
			console.log(error);
			this.setState({ errorMsg: 'Error in retrieving the data' });
		});

		this.setState({
			firstName: response.data.userCredentials.firstName,
			lastName: response.data.userCredentials.lastName,
			email: response.data.userCredentials.email,
			phoneNumber: response.data.userCredentials.phoneNumber,
			country: response.data.userCredentials.country,
			username: response.data.userCredentials.username,
			uiLoading: false
		});
	};

	handleChange = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		const { classes, ...rest } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<CardContent>
							<div className={classes.details}>
								<div>
									<Typography className={classes.locationText} gutterBottom variant="h4">
										{this.state.firstName} {this.state.lastName}
									</Typography>
								</div>
							</div>
							<div className={classes.progress} />
						</CardContent>
						<Divider />
					</Card>

					<br />
					<Card {...rest} className={clsx(classes.root, classes)}>
						<form autoComplete="off" noValidate>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="First name"
											margin="dense"
											name="firstName"
											variant="outlined"
											value={this.state.firstName}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											margin="dense"
											name="lastName"
											variant="outlined"
											value={this.state.lastName}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email"
											margin="dense"
											name="email"
											variant="outlined"
											disabled={true}
											value={this.state.email}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Phone Number"
											margin="dense"
											name="phone"
											variant="outlined"
											disabled={true}
											value={this.state.phoneNumber}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="User Name"
											margin="dense"
											name="userHandle"
											disabled={true}
											variant="outlined"
											value={this.state.username}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											variant="outlined"
											value={this.state.country}
											onChange={this.handleChange}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions />
						</form>
					</Card>
				</main>
			);
		}
	}
}

export default withStyles(styles)(account);