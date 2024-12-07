import request from '@/services/require.ts';
import { type IHospital, type IHospitalRes } from './interfaces/hospital';

const baseUrl = '/hospital';
// 获取已有医院
export const getExistHospitalsApi = async () => {
	return await request.get<IHospitalRes[]>(baseUrl + `/getExistHospital`);
};

// 新增医院
export const addHospitalApi = async (data: IHospital) => {
	return await request.post<IHospitalRes[]>(baseUrl + `/addHospital`, { data });
};

// 删除医院
export const deleteHospitalApi = async (id: number) => {
	return await request.delete<IHospitalRes[]>(baseUrl + `/deleteHospital/${id}`);
};
