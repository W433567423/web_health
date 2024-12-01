interface IHospital {
	hospitalName: string;
	level: string;
	alias: string;
	nature?: string;
	addressCode: string;
}
type IHospitalRes = IHospitalRes & IBaseData;
export type { IHospital, IHospitalRes };
