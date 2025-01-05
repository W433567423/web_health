import { type IDoctorRes } from '@/services/interfaces/doctor';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { defineStore } from 'pinia';

export default defineStore('doctor', {
	state: (): { doctorList: IDoctorRes[] } => ({
		doctorList: []
	}),
	actions: {
		// 初始化
		init() {
			const isArray = Array.isArray(getLocalStorage('DoctorList'));
			if (isArray) this.doctorList = getLocalStorage('DoctorList');
			else this.doctorList = [];
		},

		// DoctorList
		setDoctorList(list: IDoctorRes[]) {
			if (!Array.isArray(list)) return;
			this.doctorList = list;
			setLocalStorage('DoctorList', JSON.stringify(this.doctorList));
		}
	}
});
