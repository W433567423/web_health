<!--
* DONE
* @description: 添加医院 组件
* @author: tutu
* @time: 2024-12-01 16:36:43
-->
<template>
	<div class="m-add-hospital-wrap">
		<van-form v-model="addHospitalForm" @submit="addHospitalAction">
			<van-space direction="vertical" fill>
				<van-field
					v-model="addHospitalForm.hospitalName"
					label="医院名称"
					placeholder="请输入医院名称"
					:rules="[
						{ required: true, message: '请输入医院名称', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]" />
				<van-field v-model="addHospitalForm.alias" label="医院别名" placeholder="请输入医院别名(可选)" />
				<van-field
					v-model="addHospitalForm.level"
					is-link
					readonly
					label="级别"
					placeholder="请输入医院级别"
					:rules="[
						{ required: true, message: '请输入医院级别', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="showLevelPicker = true" />
				<van-popup v-model:show="showLevelPicker" round position="bottom">
					<van-picker
						:columns="hospitalLevel"
						@cancel="showLevelPicker = false"
						@confirm="chooseLevelAction" />
				</van-popup>
				<van-field
					v-model="addHospitalForm.nature"
					is-link
					readonly
					label="医院性质"
					placeholder="请输入医院性质"
					@click="showNaturePicker = true" />

				<van-popup v-model:show="showNaturePicker" round position="bottom">
					<van-picker
						:columns="hospitalNature"
						@cancel="showNaturePicker = false"
						@confirm="chooseNatureAction" />
				</van-popup>
				<van-field
					v-model="address"
					is-link
					readonly
					label="地区"
					placeholder="请选择医院所在地区"
					:rules="[
						{ required: true, message: '请选择医院所在地区', trigger: ['onBlur', 'onChange', 'onSubmit'] }
					]"
					@click="show = true" />
				<van-popup v-model:show="show" round position="bottom">
					<van-cascader
						v-model="addHospitalForm.addressCode"
						title="请选择所在地区"
						:options="options"
						@close="chooseAddressAction" />
				</van-popup>
				<van-button round block type="primary" native-type="submit">添加医院</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { addHospitalApi } from '@/services/hospital.api';
import { type IHospital } from '@/services/interfaces/hospital';
import useHospitalStore from '@/stores/hospital.store';
import { getAddressFromCode } from '@/utils';
import { useCascaderAreaData } from '@vant/area-data';
import { showNotify, type PickerColumn, type PickerOption } from 'vant';
import { computed, ref } from 'vue';

const show = ref(false);
const showNaturePicker = ref(false);
const showLevelPicker = ref(false);
const options = useCascaderAreaData();

const addHospitalForm = ref<IHospital>({
	hospitalName: '',
	addressCode: '441923',
	alias: '',
	level: '社区卫生所',
	nature: '未知'
});
const address = computed(() => {
	if (addHospitalForm.value.addressCode === '') {
		return '';
	} else {
		return getAddressFromCode(addHospitalForm.value.addressCode);
	}
});
const hospitalLevel: Array<PickerColumn | PickerOption> = [
	{
		text: '',
		value: '0'
	},
	{
		text: '三甲医院',
		value: '1'
	},
	{
		text: '三乙医院',
		value: '2'
	},
	{
		text: '三丙医院',
		value: '3'
	},
	{
		text: '三级医院',
		value: '4'
	},
	{
		text: '二甲医院',
		value: '5'
	},
	{
		text: '二乙医院',
		value: '6'
	},
	{
		text: '二丙医院',
		value: '7'
	},
	{
		text: '二级医院',
		value: '8'
	},
	{
		text: '社区中心',
		value: '13'
	},
	{
		text: '社区卫生所',
		value: '14'
	}
];
const hospitalNature = [
	{
		text: '未知',
		value: ''
	},
	{
		text: '公立',
		value: '1'
	},
	{
		text: '私立',
		value: '2'
	}
];

const chooseLevelAction = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
	addHospitalForm.value.level = selectedOptions[0].text as string;
	showLevelPicker.value = false;
};
const chooseNatureAction = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
	addHospitalForm.value.nature = selectedOptions[0].text as string;
	showNaturePicker.value = false;
};
const chooseAddressAction = () => {
	show.value = false;
	console.log('🚀 ~ chooseAddressAction ~ addressCode:', addHospitalForm.value.addressCode);
};
const addHospitalAction = async () => {
	console.log('🚀 ~ addHospitalAction ~ addHospitalForm.value:', addHospitalForm.value);
	const res = await addHospitalApi(addHospitalForm.value);
	useHospitalStore().setHospitalList(res);
	showNotify({ type: 'success', message: '医院增加成功', duration: 2000 });
};
</script>

<style lang="less" scoped>
.m-add-hospital-wrap {
}
</style>
