import type { IBaseUseIdData } from './index.d';
interface IHospital {
	hospitalName: string;
	level: string;
	alias: string;
	nature?: string;
	addressCode: string;
}
type IHospitalRes = IHospital & IBaseUseIdData;
export type { IHospital, IHospitalRes };
