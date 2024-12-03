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
			console.log('🚀 ~ init ~ doctor store');
			this.doctorList = getLocalStorage('DoctorList');
		},

		// DoctorList
		setDoctorList(list: IDoctorRes[]) {
			console.log('🚀 ~ setDoctorList ~ list:', list);
			this.doctorList = list;
			setLocalStorage('DoctorList', JSON.stringify(this.doctorList));
		}
	}
});
