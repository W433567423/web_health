<script lang="ts" setup>
import { isMobile, sleep } from '@/utils';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// const userStore = useUserStore();
// userStore.init();
onMounted(async () => {
	// 等待300ms
	await sleep(300);
	if (isMobile()) {
		console.log('手机端');
		// 如果是已/m开头的路径，就不用跳转了
		if (!route.fullPath.startsWith('/m')) {
			await router.replace('/m');
		}
	} else {
		console.log('PC端');
		// 如果是已/pc开头的路径，就不用跳转了
		if (!route.path.startsWith('/pc')) {
			// await router.replace('/pc');
		}
	}
});
</script>

<template>
	<router-view />
</template>

<style lang="less" scoped></style>
