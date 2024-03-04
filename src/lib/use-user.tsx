import { useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from './token';
import { User } from '@/app/interfaces/user';
import localStorage from "./localStorage";


const useUser = () => {
    const cachedToken = getToken();
    const cachedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');

    const [tokenState, setTokenState] = useState<string | null>(cachedToken);
    const [userState, setUserState] = useState<User | null>(cachedUser);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        setIsLoggedIn(!!tokenState && !!userState);
        setIsLoading(false);
        if (userState) {
            localStorage.setItem('user', JSON.stringify(userState));
            setToken(tokenState as string);
        } else {
            localStorage.removeItem('user');
            removeToken();
        }    
    }, [tokenState]);

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
