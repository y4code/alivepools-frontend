import { useState, useEffect } from 'react';
import { User } from '@/interfaces/user';
import localStorage from "../lib/localStorage";


const useUser = () => {
    const cachedToken = localStorage.getItem('token');
    const cachedUser: User | null = JSON.parse(localStorage.getItem('user') || 'null');

    const [tokenState, setTokenState] = useState<string | null>(cachedToken);
    const [userState, setUserState] = useState<User | null>(cachedUser);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isLoggedIn = !!tokenState && !!userState;

    useEffect(() => {
        if (userState) {
            localStorage.setItem('user', JSON.stringify(userState));
            localStorage.setItem('token', tokenState as string);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
        setIsLoading(false);
    }, [tokenState, userState]);

    const updateUserInfo = (newToken: string, newUser: User) => {
        setTokenState(newToken);
        setUserState(newUser);
        setIsLoading(false);
    };

    const clearUserInfo = () => {
        setTokenState(null);
        setUserState(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoading(false);
    };

    return { token: tokenState, user: userState, isLoggedIn, setUser: updateUserInfo, clearUser: clearUserInfo, isLoading };
};

export default useUser;
