import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/employee';

// 직원 정보 업데이트
export const updateEmployee = async (employeeId, employeeData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

// 직원 정보 삭제
export const deleteEmployee = async (employeeId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${employeeId}`);
    } catch (error) {
        console.error('Error deleting employee:', error);
        throw error;
    }
};