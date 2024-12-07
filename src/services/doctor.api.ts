import request from '@/services/require.ts';
import { type IDoctor, type IDoctorRes } from './interfaces/doctor';

const baseUrl = '/doctor';
// 获取已有医生
export const getExistDoctorsApi = async () => {
	return await request.get<IDoctorRes[]>(baseUrl + `/getExistDoctor`);
};

// 新增医生
export const addDoctorApi = async (data: IDoctor) => {
	return await request.post<IDoctorRes[]>(baseUrl + `/addDoctor`, { data });
};

// 删除医生
export const deleteDoctorApi = async (id: number) => {
	return await request.delete<IDoctorRes[]>(baseUrl + `/deleteDoctor/${id}`);
};
