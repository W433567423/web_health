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

				<van-button round block type="primary" native-type="submit">添加医生</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { addDoctor } from '@/services/doctor.api';
import { type IDoctor } from '@/services/interfaces/doctor';
import { showNotify } from 'vant';
import { ref } from 'vue';

const addDoctorForm = ref<IDoctor>({
	doctorName: '',
	six: '',
	hospitalId: 0
});
const emits = defineEmits(['addDoctorEmit']);

const addDoctorAction = async () => {
	console.log('🚀 ~ addDoctorAction ~ addDoctorForm.value:', addDoctorForm.value);
	const res = await addDoctor(addDoctorForm.value);
	showNotify({ type: 'success', message: '医生增加成功', duration: 1000 });
	emits('addDoctorEmit', res);
};
</script>

<style lang="less" scoped>
.m-add-doctor-wrap {
}
</style>
