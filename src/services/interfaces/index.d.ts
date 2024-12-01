import { type AxiosRequestConfig } from 'axios';
/** ************** axios ******************/
// 返回
interface IResponseData<T = know> {
	msg: string;
	code: number;
	data?: T;
}
interface IResponseConfig extends InternalAxiosRequestConfig<know> {
	originData?: boolean;
	passLogin?: boolean;
}

interface IServerConfig {
	originData?: boolean;
}

interface IRequestConfig extends AxiosRequestConfig {
	originData?: boolean;
	passLogin?: boolean;
}
/** ************** end ******************/

interface IBaseData {
	id: number;
	createTime: string;
	updateTime: string;
}

export type { IBaseData, IRequestConfig, IResponseConfig, IResponseData, IServerConfig };
