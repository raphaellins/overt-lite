import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginSystem } from '../../util/Proxy';
import { IUserProps, IUserState, User } from '../../interfaces/UserState';
import styles from './LoginStyle';

class login extends Component<IUserProps, IUserState> {
	constructor(props: IUserProps) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: {},
			loading: false
		};
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps?.UI?.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

	handleChange = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		this.setState({ loading: true });
		const userData: User = {
			email: this.state.email ? this.state.email : '',
			password: this.state.password ? this.state.password : ''
		};

		const response = await loginSystem(userData, (error: any) => {

			if (error.response != null) {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			}

			console.log(error);
		});

		if (response != null) {
			localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
			this.setState({
				loading: false,
			});
			this.props.history.push('/');
		}
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							helperText={errors?.email}
							error={errors?.email ? true : false}
							onChange={this.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							helperText={errors?.password}
							error={errors?.password ? true : false}
							onChange={this.handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.email || !this.state.password}
						>
							Sign In
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						{errors?.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors?.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(styles)(login);