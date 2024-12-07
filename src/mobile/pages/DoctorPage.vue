<!--
* DONE
* @description: 医生 页面
* @author: tutu
* @time: 2024-12-03 22:20:41
-->
<template>
	<van-nav-bar title="医生管理" left-text="返回" left-arrow @click-left="backPageAction" />
	<van-swipe-cell v-for="e in doctorList" :key="e.id">
		<van-cell
			:title="e.doctorName"
			:label="getHospitalName(e.hospitalId)"
			:title-style="{ flex: 2, overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis' }" />
		<template #right>
			<div class="flex flex-items-center h100%">
				<van-button square type="warning" @click="clickChangeAction(e)">修改</van-button>
				<van-button square type="danger" @click="clickDeleteAction(e)">删除</van-button>
			</div>
		</template>
	</van-swipe-cell>
	<van-empty v-if="!doctorList?.length" description="暂无医生" />
	<div class="m-doctor-wrap">
		<div v-if="doctorList.length"></div>
		<van-floating-panel>
			<AddDoctor />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import { deleteDoctorApi } from '@/services/doctor.api';
import { type IDoctorRes } from '@/services/interfaces/doctor';
import useDoctorStore from '@/stores/doctor.store';
import useHospitalStore from '@/stores/hospital.store';
import { showNotify } from 'vant';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import AddDoctor from '../cpns/AddDoctor.vue';

const router = useRouter();
const doctorList = computed(() => {
	useDoctorStore().init();
	return useDoctorStore().doctorList;
});
const getHospitalName = (id: number) =>
	useHospitalStore().hospitalList.find((e) => e.id === id)?.hospitalName ?? '出错了';

const clickChangeAction = (e: IDoctorRes) => {
	console.log('🚀 ~ clickChangeAction ~ e:', e);
};
const clickDeleteAction = async (e: IDoctorRes) => {
	console.log('🚀 ~ clickDeleteAction ~ e:', e);
	const res = await deleteDoctorApi(e.id);
	useDoctorStore().setDoctorList(res);
	showNotify({ type: 'success', message: '删除成功' });
};
onBeforeMount(async () => {});
const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.m-doctor-wrap {
}
</style>
