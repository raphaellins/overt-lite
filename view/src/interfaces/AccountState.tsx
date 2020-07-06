export interface IAccountState {
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

export interface IAccountProps {
	history?: Array<string>;
	classes?: any;
}