/** ************** users ******************/
interface IUser {
	createTime: string;
	updateTime: string;
	id: number;
	user_name: string;
	pass_word: string;
	phone: string | null | undefined;
	email: string;
}
interface IUserLoginForm {
	username: string;
	password: string;
	valid: string;
}
interface IUserRegistryForm {
	username: string;
	password: string;
	email: string;
	emailValid: number;
}
interface IForgetLoginForm {
	username: string;
	emailNum: string;
	emailValid: string;
	password: string;
}
/** ************** end ******************/

export type { IForgetLoginForm, IUser, IUserLoginForm, IUserRegistryForm };
