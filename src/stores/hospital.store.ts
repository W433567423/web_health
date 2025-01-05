import { type IHospitalRes } from '@/services/interfaces/hospital';
import { getLocalStorage, setLocalStorage } from '@/utils';
import { defineStore } from 'pinia';

export default defineStore('hospital', {
	state: (): { hospitalList: IHospitalRes[] } => ({
		hospitalList: []
	}),
	actions: {
		// 初始化
		init() {
			const isArray = Array.isArray(getLocalStorage('hospitalList'));
			if (isArray) this.hospitalList = getLocalStorage('hospitalList');
			else this.hospitalList = [];
		},

		// hospitalList
		setHospitalList(list: IHospitalRes[]) {
			this.hospitalList = list;
			setLocalStorage('hospitalList', JSON.stringify(this.hospitalList));
		}
	}
});
