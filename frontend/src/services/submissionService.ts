import api from './api';

export const submitProject = async (data: any) => {
    try {
        // If data is already FormData, use it directly
        if (data instanceof FormData) {
            const response = await api.post('/submission/submit', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }

        // Fallback for backward compatibility or simple JSON
        const response = await api.post('/submission/submit', data);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const saveDraft = async (data: any) => {
    try {
        const response = await api.post('/submission/draft', data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Có lỗi xảy ra khi lưu bản nháp.';
    }
};

export const getSubmissionStatus = async () => {
    try {
        const response = await api.get('/submission/status');
        return response.data;
    } catch (error: any) {
        throw error.response?.data?.message || 'Có lỗi xảy ra khi lấy trạng thái nộp hồ sơ.';
    }
};
