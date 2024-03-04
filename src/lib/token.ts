import localStorage from "./localStorage";

const getToken = (): string | null => {
    return localStorage.getItem('token');
};

const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

const removeToken = (): void => {
    localStorage.removeItem('token');
};

const handleTokenExpiry = (): void => {
    console.log('Token has expired. Please login again.');
    // 实现处理token过期的逻辑，例如刷新token或重定向到登录页面
    // window.location.href = '/login'; // 举例重定向到登录页面
};

export { getToken, setToken, removeToken, handleTokenExpiry };