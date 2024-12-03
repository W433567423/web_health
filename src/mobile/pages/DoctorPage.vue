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
			:label="e.hospitalId"
			:title-style="{ flex: 2 }" />
	</van-list>
	<van-empty v-if="!doctorList?.length" description="暂无医生" />
	<div class="m-doctor-wrap">
		<div v-if="doctorList.length"></div>
		<van-floating-panel>
			<AddDoctor @add-Doctor-emit="addDoctorAction" />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import { getExistDoctors } from '@/services/doctor.api';
import { type IDoctorRes } from '@/services/interfaces/doctor';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddDoctor from '../cpns/AddDoctor.vue';
const router = useRouter();
const doctorList = ref<IDoctorRes[]>([]);
onBeforeMount(async () => {
	const res = await getExistDoctors();
	doctorList.value = res;
});
const backPageAction = () => {
	router.back();
};
const addDoctorAction = async (Doctors: IDoctorRes[]) => {
	doctorList.value = Doctors;
};
</script>

<style lang="less" scoped>
.m-doctor-wrap {
}
</style>
