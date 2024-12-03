import { type IBaseUseIdData } from './index.d';
interface IDoctor {
	doctorName: string;
	six?: string;
	hospitalId: number;
}
type IDoctorRes = IDoctor & IBaseUseIdData;
export type { IDoctor, IDoctorRes };
