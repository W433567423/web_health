<!--
* DONE
* @description: 医院管理 页面
* @author: tutu
* @time: 2024-12-01 15:58:52
-->
<template>
	<van-nav-bar title="医院管理" left-text="返回" left-arrow @click-left="backPageAction" />
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
	<div class="m-hospital-wrap">
		<div v-if="hospitalList.length"></div>
		<van-floating-panel>
			<AddHospital />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import useHospitalStore from '@/stores/hospital.store';
import { getAddressFromCode } from '@/utils';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import AddHospital from '../cpns/AddHospital.vue';

const router = useRouter();
const hospitalList = computed(() => useHospitalStore().hospitalList);

const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped></style>
