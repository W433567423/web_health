<!--
* DONE
* @description: 移动端 关于 组件
* @author: tutu
* @time: 2024-11-16 19:34:54
-->
<template>
	<div class="m-about-wrap">
		<div class="h40vh bg-red"></div>
		<van-list>
			<van-cell
				v-for="(e, i) in list1"
				:icon="e.icon"
				:key="i"
				:title="e.title"
				is-link
				:to="e.to"
				:clickable="true" />
		</van-list>
	</div>
</template>

<script lang="ts" setup>
import { getExistHospitalsApi } from '@/services/hospital.api';
import useHospitalStore from '@/stores/hospital.store';
import { onBeforeMount } from 'vue';
import type { ILinkItem } from './index.d';

const list1: ILinkItem[] = [
	{
		title: '医院管理',
		to: '/m/hospital',
		icon: 'shield-o'
	},
	{
		title: '医生管理',
		to: '/m/doctor',
		icon: 'contact-o'
	},
	{
		title: '个人资料',
		to: '',
		icon: 'records-o'
	},
	{
		title: '体检单',
		to: '',
		icon: 'newspaper-o'
	},
	{
		title: '退出登录',
		to: '',
		icon: 'down'
	}
];

onBeforeMount(async () => {
	const res = await getExistHospitalsApi();
	useHospitalStore().setHospitalList(res);
});
</script>

<style lang="less" scoped>
.m-about-wrap {
}
</style>
