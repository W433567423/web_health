import { getLocalStorage } from '@/utils';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	// main
	{ path: '/', component: async () => await import('@/views/index.vue') }
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if (to.fullPath.includes('peace')) {
		if (getLocalStorage('peace') === 'allow') next();
		else next(from.fullPath);
	} else next();
});

export default router;
