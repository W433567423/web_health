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
interface IUserLoginForm extends IUserForm {
	user_name: string;
	pass_word: string;
	code_valid: string;
}
interface IForgetLoginForm {
	user_name: string;
	emailNum: string;
	email_valid: string;
	new_pass_word: string;
}
/** ************** end ******************/

export type { IForgetLoginForm, IUser, IUserLoginForm };
