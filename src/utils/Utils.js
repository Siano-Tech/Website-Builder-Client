import { v4 as uuidv4 } from 'uuid';

export const isLoggedIn = () => localStorage.getItem('isLoggedIn') ?? false;
export const getUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
export const getUserId = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).uid : null;
// export const getToken = () => localStorage.getItem('token') ?? null;
export const onLogout = () => localStorage.clear();
export const generateUid = () => uuidv4();

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}