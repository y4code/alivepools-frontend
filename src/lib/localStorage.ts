const isBrowser = typeof window !== 'undefined';

const getItem = (key: string): string | null => {
    if (isBrowser) {
        return window.localStorage.getItem(key);
    }
    return null;
};

const setItem = (key: string, value: string): void => {
    if (isBrowser) {
        window.localStorage.setItem(key, value);
    }
};

const removeItem = (key: string): void => {
    if (isBrowser) {
        window.localStorage.removeItem(key);
    }
};

const localStorage = {
    getItem,
    setItem,
    removeItem
};

export default localStorage;