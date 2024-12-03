<!--
* DONE
* @description: 添加医生 组件
* @author: tutu
* @time: 2024-12-03 22:50:30
-->
<template>
	<div class="m-add-doctor-wrap">
		<van-form v-model="addDoctorForm" @submit="addDoctorAction">
			<van-space direction="vertical" fill>
				<van-field
					v-model="addDoctorForm.doctorName"
					label="医生名称"
					placeholder="请输入医生名称"
					:rules="[
						{ required: true, message: '请输入医生名称', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-field v-model="addDoctorForm.six" label="医生性别" placeholder="请输入医生性别" />
				<van-field
					v-model="hospitalName"
					is-link
					readonly
					label="所属医院"
					placeholder="请选择所属医院"
					:rules="[
						{ required: true, message: '请选择所属医院', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="showHospitalPicker = true" />

				<van-popup v-model:show="showHospitalPicker" round position="bottom">
					<van-picker
						:columns="hospitalColumns"
						@cancel="showHospitalPicker = false"
						@confirm="chooseHospitalAction" />
				</van-popup>
				<van-button round block type="primary" native-type="submit">添加医生</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { addDoctor } from '@/services/doctor.api';
import { type IDoctor } from '@/services/interfaces/doctor';
import useDoctorStore from '@/stores/doctor.store';
import useHospitalStore from '@/stores/hospital.store';
import { type PickerOption, showNotify } from 'vant';
import { computed, ref } from 'vue';

const showHospitalPicker = ref(false);
const hospitalName = ref('');
const hospitalColumns = computed(() => {
	useHospitalStore().init();
	return useHospitalStore().hospitalList.map((e) => ({ text: e.hospitalName, value: e.id }));
});
const addDoctorForm = ref<IDoctor>({
	doctorName: '',
	six: '',
	hospitalId: 0
});
const chooseHospitalAction = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
	console.log('🚀 ~ chooseHospitalAction ~ selectedOptions:', selectedOptions);
	addDoctorForm.value.hospitalId = selectedOptions[0].value as number;
	hospitalName.value = selectedOptions[0].text as string;
	showHospitalPicker.value = false;
};
const addDoctorAction = async () => {
	console.log('🚀 ~ addDoctorAction ~ addDoctorForm.value:', addDoctorForm.value);
	const res = await addDoctor(addDoctorForm.value);
	useDoctorStore().setDoctorList(res);
	showNotify({ type: 'success', message: '医生增加成功', duration: 2000 });
};
</script>

<style lang="less" scoped>
.m-add-doctor-wrap {
}
</style>
