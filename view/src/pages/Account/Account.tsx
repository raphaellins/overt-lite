import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardActions, CardContent, Divider, Grid, TextField } from '@material-ui/core';

import clsx from 'clsx';
import { authMiddleWare } from '../../util/auth';
import { GetUser } from '../../util/Proxy';
import { IAccountState, IAccountProps } from '../../interfaces/AccountState';
import styles from './AccountStyle';

class account extends Component<IAccountProps, IAccountState> {
	constructor(props: IAccountProps) {
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

		try {
			const response = await GetUser();

			this.setState({
				firstName: response.data.userCredentials.firstName,
				lastName: response.data.userCredentials.lastName,
				email: response.data.userCredentials.email,
				phoneNumber: response.data.userCredentials.phoneNumber,
				country: response.data.userCredentials.country,
				username: response.data.userCredentials.username,
				uiLoading: false
			});
		} catch (error) {
			if (error.response.status === 403) {
				this.props.history?.push('/login');
			}
			this.setState({ errorMsg: 'Error in retrieving the data' });
		}

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