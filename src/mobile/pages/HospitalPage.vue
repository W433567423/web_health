<!--
* DONE
* @description: 医院管理 页面
* @author: tutu
* @time: 2024-12-01 15:58:52
-->
<template>
	<div class="m-hospital-wrap">
		<div v-if="hospitals.length"></div>

		<AddHospital v-else />
	</div>
</template>

<script lang="ts" setup>
import { getExistHospitals } from '@/services/hospital.api';
import { type IHospital } from '@/services/interfaces/hospital';
import { onBeforeMount, ref } from 'vue';
import AddHospital from '../cpns/AddHospital.vue';

const hospitals = ref<IHospital[]>([]);
onBeforeMount(async () => {
	const res = await getExistHospitals();
	hospitals.value = res;
});
</script>

<style lang="less" scoped>
.m-hospital-wrap {
}
</style>
