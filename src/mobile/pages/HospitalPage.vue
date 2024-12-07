<!--
* DONE
* @description: 医院管理 页面
* @author: tutu
* @time: 2024-12-01 15:58:52
-->
<template>
	<div class="m-hospital-wrap">
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
					<van-button @click="clickChangeAction(e)">修改</van-button>
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
import { type IHospitalRes } from '@/services/interfaces/hospital';
import useHospitalStore from '@/stores/hospital.store';
import { getAddressFromCode } from '@/utils';
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

const backPageAction = () => {
	router.back();
};
</script>

<style lang="less" scoped></style>
