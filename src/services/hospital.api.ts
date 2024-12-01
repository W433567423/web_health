import request from '@/services/require.ts';
import { type IHospital, type IHospitalRes } from './interfaces/hospital';

const baseUrl = '/hospital';
// 获取已有医院
export const getExistHospitals = async () => {
	return await request.get<IHospitalRes[]>(baseUrl + `/getExistHospital`);
};

// 新增医院
export const addHospital = async (data: IHospital) => {
	return await request.post(baseUrl + `/addHospital`, { data });
};
