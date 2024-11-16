<script lang="ts" setup>
import { isMobile } from '@/utils';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// const userStore = useUserStore();
// userStore.init();
onMounted(async () => {
	if (isMobile()) {
		console.log('手机端');
		await router.replace('/m');
	} else {
		console.log('pc端');
		alert('禁止PC端访问，请使用手机端访问');
		await router.replace('/pc');
	}
});
</script>

<template>
	<router-view />
</template>

<style lang="less" scoped></style>
