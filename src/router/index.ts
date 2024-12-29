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
			{ path: 'home', name: 'm_home', component: async () => await import('@m/pages/HomePage.vue') },
			{ path: 'about', name: 'm_about', component: async () => await import('@m/pages/AboutPage.vue') },
			{
				path: 'hospital',
				name: 'm_hospital',
				component: async () => await import('@m/pages/HospitalPage.vue')
			},
			{
				path: 'doctor',
				name: 'm_doctor',
				component: async () => await import('@m/pages/DoctorPage.vue')
			},
			{
				path: 'add',
				name: 'm_add',
				component: async () => await import('@m/pages/AddPage.vue')
			}
			// { path: '/m/home', component: async () => await import('@m/pages/AboutPage.vue') }
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
