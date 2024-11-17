<!--
* DONE
* @description: 移动端 登录 组件
* @author: tutu
* @time: 2024-11-16 19:34:36
-->
<template>
	<div class="m-login-wrap pt-200px">
		<LoginCpn v-if="isLogin" />
		<RegistryCpn v-else />
		<div class="pt-8px mx-auto flex justify-center">
			<span :class="isLogin ? 'text-blue' : ''" @click="changeMethod('registry')">注册</span>
			<van-space>/</van-space>
			<span :class="isLogin ? '' : 'text-blue'" @click="changeMethod('login')">登录</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import LoginCpn from '@m/cpns/LoginCpn.vue';
import RegistryCpn from '@m/cpns/RegistryCpn.vue';
import { ref } from 'vue';
const isLogin = ref(true);

const changeMethod = (method: string): void => {
	switch (method) {
		case 'login':
			isLogin.value = true;
			break;
		case 'registry':
			isLogin.value = false;
			break;
		default:
			break;
	}
};
</script>

<style lang="less" scoped>
.m-login-wrap {
}
</style>
