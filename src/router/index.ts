import MLoginPage from '@m/pages/LoginPage.vue';
import PCLoginPage from '@pc/pages/LoginPage.vue';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
	// pc
	{
		path: '/pc',
		children: [{ path: 'login', component: PCLoginPage }]
	},
	// Mobile
	{
		path: '/m',
		redirect: '/m/login',
		children: [
			{ path: 'login', component: MLoginPage },
			{ path: 'home', component: async () => await import('@m/pages/HomePage.vue') },
			{ path: 'about', component: async () => await import('@m/pages/AboutPage.vue') }
			// { path: '/m/home', component: async () => await import('@m/pages/AboutPage.vue') }
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
