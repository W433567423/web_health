<!--
* DONE
* @description: 医院管理 页面
* @author: tutu
* @time: 2024-12-01 15:58:52
-->
<template>
	<div class="m-hospital-wrap">
		<h2>医院管理 页面</h2>
	</div>
</template>

<script lang="ts" setup>
import { getExistHospitals } from '@/services/hospital.api';
import { onBeforeMount } from 'vue';
onBeforeMount(getExistHospitals);
</script>

<style lang="less" scoped>
.m-hospital-wrap {
}
</style>
