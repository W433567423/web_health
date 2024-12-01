<!--
* DONE
* @description: 添加医院 组件
* @author: tutu
* @time: 2024-12-01 16:36:43
-->
<template>
	<div class="m-add-hospital-wrap">
		<van-form v-model="addHospitalForm">
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
					@click="showPicker = true" />
				<van-field
					v-model="addHospitalForm.level"
					is-link
					readonly
					label="医院性质"
					placeholder="请输入医院性质"
					@click="showPicker = true" />

				<van-popup v-model:show="showPicker" round position="bottom">
					<van-picker :columns="hospitalLevel" @cancel="showPicker = false" @confirm="chooseLevelAction" />
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
						@close="show = false" />
				</van-popup>
				<van-button block type="primary" @click="addHospitalAction">添加医院</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { addHospital } from '@/services/hospital.api';
import { type IHospital } from '@/services/interfaces/hospital';
import { useCascaderAreaData } from '@vant/area-data';
import { type PickerColumn, type PickerOption } from 'vant';
import { computed, ref } from 'vue';

const show = ref(false);
const showPicker = ref(false);
const options = useCascaderAreaData();

const addHospitalForm = ref<IHospital>({
	hospitalName: '',
	addressCode: '441923',
	alias: '',
	level: '社区卫生所',
	nature: ''
});
const emits = defineEmits(['addHospitalEmit']);
const address = computed(() => {
	if (addHospitalForm.value.addressCode === '') {
		return '';
	} else {
		const province = options.find(
			(item) => item.value === addHospitalForm.value.addressCode.slice(0, 2).padEnd(6, '0')
		);
		const city = province?.children?.find(
			(item) => item.value === addHospitalForm.value.addressCode.slice(0, 4).padEnd(6, '0')
		);
		const area = city?.children?.find((item) => item.value === addHospitalForm.value.addressCode);
		return `${province?.text} ${city?.text} ${area?.text}`;
	}
});
const hospitalLevel: Array<PickerColumn | PickerOption> = [
	{
		text: '三级甲等',
		value: '1'
	},
	{
		text: '三级乙等',
		value: '2'
	},
	{
		text: '三级丙等',
		value: '3'
	},
	{
		text: '二级甲等',
		value: '4'
	},
	{
		text: '二级乙等',
		value: '5'
	},
	{
		text: '二级丙等',
		value: '6'
	},
	{
		text: '一级甲等',
		value: '7'
	},
	{
		text: '一级乙等',
		value: '8'
	},
	{
		text: '一级丙等',
		value: '9'
	},
	{
		text: '社区中心卫生所',
		value: '11'
	},
	{
		text: '社区卫生所',
		value: '12'
	}
];

const chooseLevelAction = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
	addHospitalForm.value.level = selectedOptions[0].text as string;
	showPicker.value = false;
};
const addHospitalAction = async () => {
	console.log('addHospitalAction', addHospitalForm.value);
	const res = await addHospital(addHospitalForm.value);
	emits('addHospitalEmit', res);
};
</script>

<style lang="less" scoped>
.m-add-hospital-wrap {
}
</style>
