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
			console.log('🚀 ~ init ~ hospital store');
			this.hospitalList = getLocalStorage('hospitalList');
		},

		// hospitalList
		setHospitalList(list: IHospitalRes[]) {
			console.log('🚀 ~ setHospitalList ~ list:', list);
			this.hospitalList = list;
			setLocalStorage('hospitalList', JSON.stringify(this.hospitalList));
		}
	}
});
