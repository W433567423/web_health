<!--
* DONE
* @description: 医院管理 页面
* @author: tutu
* @time: 2024-12-01 15:58:52
-->
<template>
	<div class="m-hospital-wrap">
		<van-nav-bar title="医院管理" left-text="返回" left-arrow @click-left="backPageAction" />
		<van-swipe-cell v-for="e in hospitalList" :key="e.id">
			<van-cell
				:title-style="{
					flex: 2,
					overflow: 'hidden',
					textWrap: 'nowrap',
					textOverflow: 'ellipsis'
				}">
				<template #title>
					{{ e.hospitalName }}
				</template>
				<template #label>
					<div>
						<van-tag type="primary">{{ e.nature }}</van-tag>
						{{ getAddressFromCode(e.addressCode) }}
					</div>
				</template>
				<template #right-icon>
					<div class="flex flex-col justify-center">
						<van-tag size="large" type="primary" plain>{{ e.level }}</van-tag>
					</div>
				</template>
			</van-cell>
			<template #right>
				<div class="flex flex-items-center h100%">
					<van-button square type="warning" @click="clickChangeAction(e)">修改</van-button>
					<van-button square type="danger" @click="clickDeleteAction(e)">删除</van-button>
				</div>
			</template>
		</van-swipe-cell>
		<!-- <van-empty v-if="!hospitalList?.length" description="暂无医院" /> -->
		<div v-if="hospitalList.length"></div>
		<van-dialog v-model:show="showChangeDialog" title="修改医院信息" show-cancel-button>
			<AddHospital />
		</van-dialog>
		<van-floating-panel>
			<AddHospital />
		</van-floating-panel>
	</div>
</template>

<script lang="ts" setup>
import { deleteHospitalApi } from '@/services/hospital.api';
import { type IHospitalRes } from '@/services/interfaces/hospital';
import useHospitalStore from '@/stores/hospital.store';
import { getAddressFromCode } from '@/utils';
import { showNotify } from 'vant';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddHospital from '../cpns/AddHospital.vue';

const router = useRouter();
const showChangeDialog = ref(false);
const hospitalList = computed(() => {
	useHospitalStore().init();
	return useHospitalStore().hospitalList;
});

const clickChangeAction = (e: IHospitalRes) => {
	console.log('🚀 ~ clickChangeAction ~ e:', e);
	showChangeDialog.value = true;
};

const clickDeleteAction = async (e: IHospitalRes) => {
	console.log('🚀 ~ clickDeleteAction ~ e:', e);
	const res = await deleteHospitalApi(e.id);
	useHospitalStore().setHospitalList(res);
	showNotify({ type: 'success', message: '删除医院成功' });
};
const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped></style>
