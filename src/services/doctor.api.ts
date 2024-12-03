import request from '@/services/require.ts';
import { type IDoctor, type IDoctorRes } from './interfaces/doctor';

const baseUrl = '/doctor';
// 获取已有医生
export const getExistDoctors = async () => {
	return await request.get<IDoctorRes[]>(baseUrl + `/getExistDoctor`);
};

// 新增医生
export const addDoctor = async (data: IDoctor) => {
	return await request.post(baseUrl + `/addDoctor`, { data });
};
