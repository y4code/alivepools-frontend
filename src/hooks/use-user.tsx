import { useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../lib/token';
import { User } from '@/interfaces/user';
import localStorage from "../lib/localStorage";


const useUser = () => {
    const cachedToken = getToken();
    const cachedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');

    const [tokenState, setTokenState] = useState<string | null>(cachedToken);
    const [userState, setUserState] = useState<User | null>(cachedUser);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log('isLoggedin', isLoggedIn);
        setIsLoading(false);
        if (userState) {
            localStorage.setItem('user', JSON.stringify(userState));
            setToken(tokenState as string);
        } else {
            localStorage.removeItem('user');
            removeToken();
        }
    }, [isLoggedIn, tokenState, userState]);

    const updateUserInfo = (newToken: string, newUser: User) => {
        setIsLoading(true);
        setTokenState(newToken);
        setUserState(newUser);
    };

    const clearUserInfo = () => {
        setIsLoading(true);
        setTokenState(null);
        setUserState(null);
        removeToken();
        localStorage.removeItem('user');
    };

    return { token: tokenState, user: userState, isLoggedIn, setUser: updateUserInfo, clearUser: clearUserInfo, isLoading };
};

export default useUser;
