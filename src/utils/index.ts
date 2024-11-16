import { getLocalStorage, setLocalStorage } from '@/utils/storage.util';

const isMobile = (): boolean => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export { getLocalStorage, isMobile, setLocalStorage };
