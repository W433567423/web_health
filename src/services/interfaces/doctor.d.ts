import type { IBaseData } from '.';
interface IDoctor {
	doctorName: string;
	six?: string;
	hospitalId: number;
}
type IDoctorRes = IDoctor & IBaseData;
export type { IDoctor, IDoctorRes };
