export interface User {
    email: String;
    password: String;
}

export interface IUserState {
	email?: String;
	password?: String;
	errors?: Error;
	loading?: boolean;
}

export interface Error {
	password?: String;
	email?: String;
	general?: String;
}

export interface IUserProps {
	history: Array<String>;
	classes: any;
}