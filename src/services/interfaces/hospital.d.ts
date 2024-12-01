import type { IBaseData } from './index.d';
interface IHospital {
	hospitalName: string;
	level: string;
	alias: string;
	nature?: string;
	addressCode: string;
}
type IHospitalRes = IHospital & IBaseData;
export type { IHospital, IHospitalRes };
