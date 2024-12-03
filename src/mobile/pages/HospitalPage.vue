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
			:title-style="{
				flex: 3,
				overflow: 'hidden',
				textWrap: 'nowrap',
				textOverflow: 'ellipsis'
			}">
			<template #title>
				<div>
					<van-tag type="primary">{{ e.nature }}</van-tag>
					{{ e.hospitalName }}
				</div>
			</template>
			<template #right-icon>
				<div>操作</div>
			</template>
			<template #label>
				<div>
					{{ getAddressFromCode(e.addressCode) }}
					<van-tag type="primary" plain>{{ e.level }}</van-tag>
				</div>
			</template>
		</van-cell>
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
const hospitalList = computed(() => {
	useHospitalStore().init();
	return useHospitalStore().hospitalList;
});

const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped></style>
