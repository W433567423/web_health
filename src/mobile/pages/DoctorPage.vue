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
			v-for="e in hospitalList"
			:key="e.id"
			:title="e.hospitalName"
			:value="e.level"
			:label="getAddressFromCode(e.addressCode)"
			:title-style="{ flex: 2 }" />
	</van-list>
	<!-- <van-empty v-if="!hospitalList?.length" description="暂无医院" /> -->
	<div class="m-doctor-wrap">
		<div v-if="hospitalList.length"></div>
		<van-floating-panel>
			<AddHospital @add-hospital-emit="addHospitalAction" />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import { getExistHospitals } from '@/services/hospital.api';
import { type IHospitalRes } from '@/services/interfaces/hospital';
import { getAddressFromCode } from '@/utils';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddHospital from '../cpns/AddHospital.vue';
const router = useRouter();
const hospitalList = ref<IHospitalRes[]>([]);
onBeforeMount(async () => {
	const res = await getExistHospitals();
	hospitalList.value = res;
});
const backPageAction = () => {
	router.back();
};
const addHospitalAction = async (hospitals: IHospitalRes[]) => {
	hospitalList.value = hospitals;
};
</script>

<style lang="less" scoped>
.m-doctor-wrap {
}
</style>
