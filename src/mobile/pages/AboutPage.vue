<!--
* DONE
* @description: 移动端 关于 组件
* @author: tutu
* @time: 2024-11-16 19:34:54
-->
<template>
	<div class="m-about-wrap">
		<div class="h40vh bg-red"></div>
		<van-collapse v-model="activeNames">
			<!-- <van-collapse-item title="医管理" :name="1"> -->
			<van-list>
				<van-cell v-for="(e, i) in list1" :key="i" :title="e.title" @click="changePageAction(e)" />
			</van-list>
			<!-- </van-collapse-item> -->
			<van-collapse-item title="个人设置" :name="2">
				<van-list>
					<van-cell v-for="(e, i) in list2" :key="i" :title="e.title" />
				</van-list>
			</van-collapse-item>
		</van-collapse>
	</div>
</template>

<script lang="ts" setup>
import { getExistHospitals } from '@/services/hospital.api';
import useHospitalStore from '@/stores/hospital.store';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ILinkItem } from './index.d';
const activeNames = ref([2]);
const router = useRouter();

const list1: ILinkItem[] = [
	{
		title: '医院管理',
		url: '/m/hospital'
	},
	{
		title: '医生管理',
		url: '/m/doctor'
	}
];
const list2 = [
	{
		title: '个人资料'
	},
	{
		title: '个人检验报告单'
	}
];

const changePageAction = (e: ILinkItem) => {
	router.push(e.url);
};
onBeforeMount(async () => {
	const res = await getExistHospitals();
	useHospitalStore().setHospitalList(res);
});
</script>

<style lang="less" scoped>
.m-about-wrap {
}
</style>
