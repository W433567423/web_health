import request from '@/services/require.ts';
import { type IExistHospital } from './interfaces/hospital';

const baseUrl = '/hospital';
// 获取已有医院
export const getExistHospitals = async () => {
	return await request.get<IExistHospital>(baseUrl + `/getExistHospital`);
};
