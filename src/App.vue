<script lang="ts" setup>
import useUserStore from '@/stores/user.store';
import { isMobile, sleep } from '@/utils';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
// const userStore = useUserStore();
// userStore.init();

const notLogin = computed(() => !route.path.includes('/login'));
const activePage = ref('m_home');
const tabList = [
	{
		name: 'm_home',
		icon: 'home-o',
		text: '首页'
	},
	{
		name: 'm_add',
		icon: 'add',
		text: '添加指标'
	},
	// {
	// 	name: 'm_search',
	// 	icon: 'search',
	// 	text: '搜索',
	// },
	// {
	// 	name: 'm_friends',
	// 	icon: 'friends-o',
	// 	text: '朋友',
	// },
	{
		name: 'm_about',
		icon: 'manager-o',
		text: '我的'
	}
];

const changeTabAction = (name: string) => {
	activePage.value = name;
	router.push({ name });
};

onBeforeMount(async () => {
	useUserStore().init();
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
	<van-tabbar v-model="activePage" v-if="notLogin">
		<van-tabbar-item
			:icon="e.icon"
			v-for="(e, i) in tabList"
			@click="changeTabAction(e.name)"
			:key="i"
			:name="e.name">
			{{ e.text }}
		</van-tabbar-item>
		<!-- <van-tabbar-item icon="search">标签</van-tabbar-item>
		<van-tabbar-item icon="friends-o">标签</van-tabbar-item>
		<van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
		<!-- <van-tabbar-item icon="manager-o">我的</van-tabbar-item> -->
	</van-tabbar>
</template>

<style lang="less" scoped></style>
