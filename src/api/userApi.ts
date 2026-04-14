import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const getMe = async () => {
    const token = localStorage.getItem('token'); // Lấy token đã lưu khi đăng nhập
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};