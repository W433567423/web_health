import { getLocalStorage, setLocalStorage } from '@/utils/storage.util';

const isMobile = (): boolean => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const sleep = async (ms: number) => {
	return await new Promise((resolve) => setTimeout(resolve, ms));
};

export { getLocalStorage, isMobile, setLocalStorage, sleep };
