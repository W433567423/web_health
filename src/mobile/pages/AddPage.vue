<!--
* DONE
* @description: 添加指标 组件
* @author: tutu
* @time: 2024-12-29 20:08:33
-->
<template>
	<div class="m-add-wrap">
		<van-form v-model="addInspectionForm" @submit="addInspectionAction">
			<van-space direction="vertical" fill>
				<van-field
					v-model="addInspectionForm.inspection_name"
					label="检查项目名称"
					placeholder="请输入检查项目名称"
					:rules="[
						{ required: true, message: '请输入检查项目', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-field
					v-model="addInspectionForm.abbreviation"
					label="英文简写名称"
					placeholder="请输入英文简写名称" />
				<van-field
					v-model="addInspectionForm.inspection_result"
					label="检查结果"
					placeholder="请输入检查结果"
					:rules="[
						{ required: true, message: '请输入检查结果', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-field
					v-model="addInspectionForm.inspection_time"
					is-link
					readonly
					name="datePicker"
					label="检查时间"
					placeholder="点击选择时间"
					@click="showPicker = true" />
				<van-popup v-model:show="showPicker" destroy-on-close position="bottom">
					<van-date-picker
						v-model="currentDate"
						@confirm="changeInspectionAction"
						@cancel="showPicker = false" />
				</van-popup>

				<van-field
					v-model="addInspectionForm.inspection_method"
					label="检查方法"
					placeholder="请输入检查方法"
					:rules="[
						{ required: true, message: '请输入检查方法', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-field v-model="addInspectionForm.unit" label="单位" placeholder="请输入单位" />
				<van-field v-model="addInspectionForm.min" label="最小值" placeholder="请输入最小值" />
				<van-field v-model="addInspectionForm.max" label="最大值" placeholder="请输入最大值" />
				<van-field
					v-model="addInspectionForm.inspection_num"
					label="检查编号"
					placeholder="请输入检查编号" />
				<van-field v-model="addInspectionForm.sample_num" label="样本编号" placeholder="请输入样本编号" />
				<van-field v-model="addInspectionForm.sample_type" label="样本类型" placeholder="请输入样本类型" />
				<van-field
					v-model="addInspectionForm.apply_docker_id"
					is-link
					readonly
					label="申请医师"
					placeholder="请选择申请医师"
					:rules="[
						{ required: true, message: '请选择申请医师', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="showDockerPicker = true" />

				<van-popup v-model:show="showDockerPicker" round position="bottom">
					<van-picker
						:columns="doctorColumns"
						@cancel="showDockerPicker = false"
						@confirm="chooseApplyDoctorAction" />
				</van-popup>

				<van-field
					v-model="addInspectionForm.inspection_docker_id"
					is-link
					readonly
					label="检验医师"
					placeholder="请选择检验医师"
					:rules="[
						{ required: true, message: '请选择检验医师', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="showDockerPicker = true" />

				<van-popup v-model:show="showDockerPicker" round position="bottom">
					<van-picker
						:columns="doctorColumns"
						@cancel="showDockerPicker = false"
						@confirm="chooseInspectionDoctorAction" />
				</van-popup>
				<van-field
					v-model="addInspectionForm.audit_docker_id"
					is-link
					readonly
					label="审核医师"
					placeholder="请选择审核医师"
					:rules="[
						{ required: true, message: '请选择审核医师', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="showDockerPicker = true" />

				<van-popup v-model:show="showDockerPicker" round position="bottom">
					<van-picker
						:columns="doctorColumns"
						@cancel="showDockerPicker = false"
						@confirm="chooseAuditDoctorAction" />
				</van-popup>

				<van-button round block type="primary" native-type="submit">添加指标</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { type IInspection } from '@/services/interfaces/inspection';
import useDoctorStore from '@/stores/doctor.store';
import dayjs from 'dayjs';
import type { PickerOption } from 'vant';
import { computed, ref } from 'vue';
const showPicker = ref(false);
const showDockerPicker = ref(false);
const currentDate = ref(dayjs().format('YYYY/MM/DD').split('/'));
const doctorColumns = computed(() => {
	useDoctorStore().init();
	console.log('🚀 ~ doctorColumns ~ useDoctorStore().doctorList:', useDoctorStore().doctorList);
	return useDoctorStore().doctorList.map((e) => ({ text: e.doctorName, value: e.id }));
});
// 添加检查表单
const addInspectionForm = ref<IInspection>({
	inspection_name: '', // 检查项目名称
	abbreviation: '', // 缩写
	inspection_result: '', // 检查结果
	inspection_time: currentDate.value.join('/'), // 检查时间
	inspection_method: '', // 检查方法
	unit: '', // 单位
	min: '', // 最小值
	max: '', // 最大值
	inspection_num: '', // 检查编号
	sample_num: '', // 样本编号
	sample_type: '', // 样本类型
	apply_docker_id: 0, // 申请医师
	inspection_docker_id: 0, // 检查医师
	audit_docker_id: 0 // 审核医师
});

// 添加检查
const addInspectionAction = () => {
	console.log(addInspectionForm.value);
};

// 选择检查时间
const changeInspectionAction = ({ selectedValues }: { selectedValues: string[] }) => {
	currentDate.value = selectedValues;
	addInspectionForm.value.inspection_time = selectedValues.join('/');
	showPicker.value = false;
};

// 选择申请医师
const chooseApplyDoctorAction = ({
	selectedOptions
}: {
	selectedOptions: Array<PickerOption | undefined>;
}) => {
	addInspectionForm.value.apply_docker_id = Number(selectedOptions?.[0]?.value);
	showDockerPicker.value = false;
};

// 选择检验医师
const chooseInspectionDoctorAction = ({
	selectedOptions
}: {
	selectedOptions: Array<PickerOption | undefined>;
}) => {
	addInspectionForm.value.inspection_docker_id = Number(selectedOptions?.[0]?.value);
	showDockerPicker.value = false;
};

// 选择审核医师
const chooseAuditDoctorAction = ({
	selectedOptions
}: {
	selectedOptions: Array<PickerOption | undefined>;
}) => {
	addInspectionForm.value.audit_docker_id = Number(selectedOptions?.[0]?.value);
	showDockerPicker.value = false;
};
</script>

<style lang="less" scoped></style>
