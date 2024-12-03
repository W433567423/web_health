<!--
* DONE
* @description: 医生 页面
* @author: tutu
* @time: 2024-12-03 22:20:41
-->
<template>
	<van-nav-bar title="医生管理" left-text="返回" left-arrow @click-left="backPageAction" />
	<van-list>
		<van-cell
			v-for="e in doctorList"
			:key="e.id"
			:title="e.doctorName"
			value="修改"
			:label="getHospitalName(e.hospitalId)"
			:title-style="{ flex: 2, overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis' }" />
	</van-list>
	<van-empty v-if="!doctorList?.length" description="暂无医生" />
	<div class="m-doctor-wrap">
		<div v-if="doctorList.length"></div>
		<van-floating-panel>
			<AddDoctor />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import useDoctorStore from '@/stores/doctor.store';
import useHospitalStore from '@/stores/hospital.store';
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

onBeforeMount(async () => {});
const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped>
.m-doctor-wrap {
}
</style>
