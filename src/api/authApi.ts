import axios from 'axios';
import type {ForgotPasswordRequest} from '../modelRequest/ForgotPasswordRequest';

const API_URL = 'http://localhost:8080/api/auth';

export const authApi = {
    forgotPassword: async (data: ForgotPasswordRequest) => {
        const response = await axios.post(`${API_URL}/forgot-password`, data);
        return response.data;
    }
};