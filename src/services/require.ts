import axios, {
	type AxiosError,
	type AxiosInstance,
	type AxiosResponse,
	type InternalAxiosRequestConfig
} from 'axios';
import type { IRequestConfig, IResponseConfig, IResponseData } from './interfaces/index';

import { createAxiosConfig } from '@/config/axios.config';
import router from '@/router';
import useUserStore from '@/stores/user.store';
import { getLocalStorage } from '@/utils';
import { Message } from '@arco-design/web-vue';

class HttpRequest {
	// 定义成员变量并指定类型
	service: AxiosInstance;
	public constructor() {
		// 实例化axios
		this.service = axios.create(createAxiosConfig);

		/**
		 * 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		const requestMap = new Map();
		this.service.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 判定唯一请求
				const controller = new AbortController();
				const key = config.data + config.url;
				config.signal = controller.signal;
				if (requestMap.has(key)) {
					requestMap.get(key).abort();
					requestMap.delete(key);
				} else {
					requestMap.set(key, controller);
				}
				if (getLocalStorage('token') != null) {
					config.headers.Authorization = useUserStore().token;
				}
				return config;
			},
			async (error: AxiosError) => {
				console.log('Request Error!', error);
				return await Promise.reject(error);
			}
		);

		/**
		 * 响应拦截器
		 * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(res: AxiosResponse<IResponseData, IResponseConfig>): AxiosResponse['data'] => {
				const { data } = res;

				// code处理
				if (typeof data.code === 'number') {
					this.handleCode(data.code, data.msg, (res.config as IResponseConfig).passLogin);
				} else {
					return Promise.reject(new Error('Response Error! 没有code!'));
				}

				// originData参数用来获取原始响应
				if ((res.config as IResponseConfig).originData !== null) return data;
				else return data.data;
			},
			async (error: AxiosError) => {
				let { message }: { message: string } = error;
				if (message === 'Network Error') {
					message = '后端接口连接异常';
				} else if (message.includes('timeout')) {
					message = '系统接口请求超时';
				} else if (message.includes('Request failed with status code')) {
					message = `系统接口${message.slice(0, message.length - 3)}异常`;
				}
				Message.error({
					content: message
				});
				return await Promise.reject(error);
			}
		);
	}

	handleCode(code: number, msg: string, passLogin = false): void {
		if (!passLogin && code === 401) {
			// 登录状态已过期.处理路由重定向
			console.log('登录状态已过期');
			useUserStore().clearToken();
			void router.replace({
				path: '/pc-login',
				query: { redirect: router.currentRoute.value.fullPath }
			});
		} else if (code > 299) {
			Message.error({
				content: msg
			});
		}
	}

	// 常用方法封装
	async get<T>(url: string, config?: IRequestConfig): Promise<T> {
		return await this.service.request({ url, method: 'GET', ...config });
	}

	async post<T>(url: string, config?: IRequestConfig): Promise<T> {
		return await this.service.request({ url, method: 'POST', ...config });
	}

	async put<T>(url: string, config?: IRequestConfig): Promise<T> {
		return await this.service.request({ url, method: 'PUT', ...config });
	}

	async patch<T>(url: string, config?: IRequestConfig): Promise<T> {
		return await this.service.request({ url, method: 'PATCH', ...config });
	}

	async delete<T>(url: string, config?: IRequestConfig): Promise<T> {
		return await this.service.request({ url, method: 'DELETE', ...config });
	}
}

// 导出一个实例对象
export default new HttpRequest();
