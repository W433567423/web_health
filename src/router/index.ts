import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	// pc
	{
		path: '/pc',
		// component: async () => await import('@/views/index.vue'),
		children: []
	},
	// Mobile
	{
		path: '/m',
		component: async () => await import('@m/pages/Login/index.vue'),
		children: []
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
