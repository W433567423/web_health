import { type IUser } from '@/services/interfaces/users';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { removeLocalStorage } from '@/utils/storage.util.ts';
import { defineStore } from 'pinia';

export default defineStore('user', {
	state: (): { token: string; user: IUser } => ({
		token: '',
		user: {
			createTime: '',
			updateTime: '',
			id: 0,
			user_name: '',
			pass_word: '',
			phone: '',
			email: ''
		}
	}),
	actions: {
		// 初始化
		init() {
			this.token = getLocalStorage('token');
			this.user = getLocalStorage('user');
		},

		// 设置token
		setToken(token: string) {
			console.log('🚀 ~ setToken ~ token:', token);
			this.token = 'Bearer ' + token;
			setLocalStorage('token', this.token);
		},
		// 设置用户信息
		setUser(user: IUser) {
			console.log('🚀 ~ setUser ~ user:', user);
			this.user = user;
			setLocalStorage('user', JSON.stringify(this.user));
		},

		// 清除token
		clearToken() {
			this.token = '';
			// 清除缓存
			removeLocalStorage('token');
		}
	}
});
