<!--
* DONE
* @description: 注册 组件
* @author: tutu
* @time: 2024-11-17 15:07:43
-->
<template>
	<div class="test-wrap">
		<!-- 注册 -->
		<van-form v-model="RegistryForm">
			<van-space direction="vertical" fill>
				<van-field v-model="RegistryForm.username" label="用户名" placeholder="请输入用户名" />
				<van-field v-model="RegistryForm.password" label="密码" placeholder="请输入密码" type="password" />
				<van-field v-model="RegistryForm.email" label="邮箱" placeholder="请输入邮箱" />
				<van-field
					type="number"
					v-model="RegistryForm.emailValid"
					label="邮箱验证码"
					placeholder="请输入邮箱验证码" />
				<van-button type="primary" block @click="registryAction">注册</van-button>
			</van-space>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import type { IUserRegistryForm } from '@/services/interfaces/users';
import { postUserRegistry } from '@/services/users.api';
import { type Ref, ref } from 'vue';
const RegistryForm: Ref<IUserRegistryForm> = ref({
	username: 'tutu',
	password: '123456',
	email: 't433567423@163.com',
	emailValid: 333333
});
const registryAction = (): void => {
	console.log('registryAction', RegistryForm.value);
	postUserRegistry(RegistryForm.value)
		.then((res) => {
			console.log('postUserLogin', res);
		})
		.catch((err) => {
			console.log('postUserLogin', err);
		});
};
</script>

<style lang="less" scoped>
.test-wrap {
}
</style>
