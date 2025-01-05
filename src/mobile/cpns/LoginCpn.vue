<!--
* DONE
* @description: 登录 组件
* @author: tutu
* @time: 2024-11-17 15:07:01
-->
<template>
	<div class="m-login-wrap">
		<!-- 登录 -->
		<van-form v-model="loginForm">
			<van-space direction="vertical" fill>
				<van-field v-model="loginForm.username" label="用户名" placeholder="请输入用户名" />
				<van-field v-model="loginForm.password" label="密码" placeholder="请输入密码" type="password" />
				<van-field v-model="loginForm.valid" label="验证码" placeholder="请输入验证码" />
				<van-button block type="primary" @click="loginAction">登录</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { type IUserLoginForm } from '@/services/interfaces/users';
import { postUserLogin } from '@/services/users.api';
import useUserStore from '@/stores/user.store';
import { showNotify } from 'vant';
import { type Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
const loginForm: Ref<IUserLoginForm> = ref({ username: 'tutu', password: '123456', valid: 'tutu' });
const router = useRouter();
const loginAction = async () => {
	const res = await postUserLogin(loginForm.value);
	showNotify({ type: 'success', message: '登录成功', duration: 1000 });
	useUserStore().setToken(res.token);
	useUserStore().setUser(res.user);
	setTimeout(() => {
		// 跳转到首页
		router.replace('/m/home');
	}, 1000);
};
</script>

<style lang="less" scoped>
.m-login-wrap {
}
</style>
