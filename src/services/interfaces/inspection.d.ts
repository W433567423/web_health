import { type IBaseUseIdData } from './index.d';
interface IInspection {
	inspection_name: string; // 检查项目名称
	abbreviation?: string; // 缩写
	inspection_result: string; // 检查结果
	inspection_time: string; // 检查时间
	inspection_method?: string; // 检查方法
	unit?: string; // 单位
	min?: string; // 最小值
	max?: string; // 最大值
	inspection_num?: string; // 检查编号
	sample_num?: string; // 样本编号
	sample_type?: string; // 样本类型
	apply_docker_id: number; // 申请医生
	inspection_docker_id: number; // 检查医生
	audit_docker_id: number; // 审核医生
}
type IInspectionRes = IInspection & IBaseUseIdData;
export type { IInspection, IInspectionRes };
