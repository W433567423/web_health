<!--
* DONE
* @description: 移动端 登录 组件
* @author: tutu
* @time: 2024-11-16 19:34:36
-->
<template>
	<div class="m-login-wrap px-8px pt-300px">
		<van-form v-model="loginForm" v-show="isLogin">
			<van-space direction="vertical" fill>
				<van-field v-model="loginForm.user_name" label="用户名" placeholder="请输入用户名" />
				<van-field v-model="loginForm.pass_word" label="密码" placeholder="请输入密码" type="password" />
				<van-field v-model="loginForm.code_valid" label="验证码" placeholder="请输入验证码" />
				<van-button type="primary" block @click="loginAction">登录</van-button>
			</van-space>
		</van-form>
		<div class="pt-8px mx-auto flex justify-center">
			<span>注册</span>
			<van-space>/</van-space>
			<span>登录</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { type IUserLoginForm } from '@/services/interfaces/users';
import { postUserLogin } from '@/services/users.api';
import { type Ref, ref } from 'vue';
const isLogin = ref(true);
const loginForm: Ref<IUserLoginForm> = ref({ user_name: 'tutu', pass_word: '123456', code_valid: 'tutu' });

const loginAction = (): void => {
	console.log('loginAction', loginForm.value);
	postUserLogin(loginForm.value)
		.then((res) => {
			console.log('postUserLogin', res);
		})
		.catch((err) => {
			console.log('postUserLogin', err);
		});
};
</script>

<style lang="less" scoped>
.m-login-wrap {
}
</style>
