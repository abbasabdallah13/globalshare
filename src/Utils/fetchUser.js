export const fetchUser = () => {
     const userProfile = JSON.parse(localStorage.getItem('user'));
    return userProfile;
}