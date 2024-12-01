import { getLocalStorage, setLocalStorage } from '@/utils/storage.util';
import { useCascaderAreaData } from '@vant/area-data';

const isMobile = (): boolean => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const sleep = async (ms: number) => {
	return await new Promise((resolve) => setTimeout(resolve, ms));
};

const getAddressFromCode = (code: string): string => {
	const options = useCascaderAreaData();
	const province = options.find((item) => item.value === code.slice(0, 2).padEnd(6, '0'));
	const city = province?.children?.find((item) => item.value === code.slice(0, 4).padEnd(6, '0'));
	const area = city?.children?.find((item) => item.value === code);
	return `${province?.text} ${city?.text} ${area?.text}`;
};

export { getAddressFromCode, getLocalStorage, isMobile, setLocalStorage, sleep };
