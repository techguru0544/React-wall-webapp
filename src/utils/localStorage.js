export function clearLocalStorage() {
    localStorage.clear();
}

export function saveUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

export function saveTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

export function setCurrentPage(currentPage) {
    localStorage.setItem('current-page', currentPage);
}

export function getCurrentPageFromLocalStorage() {
    return localStorage.getItem('current-page');
}

export function setNextPage(nextPage) {
    localStorage.setItem('next-page', nextPage);
}

export function getNextPageFromLocalStorage() {
    return localStorage.getItem('next-page');
}

export function setNextToken(nextToken) {
    localStorage.setItem('next-token', nextToken);
}

export function getNextTokenFromLocalStorage() {
    return localStorage.getItem('next-token');
}  

export default {
    saveUserToLocalStorage,
    getUserFromLocalStorage,
    saveTokenToLocalStorage,
    getTokenFromLocalStorage,
    setNextPage,
    getNextPageFromLocalStorage,
    setNextToken,
    getNextTokenFromLocalStorage
}
  