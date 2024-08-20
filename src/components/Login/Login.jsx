import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/Login/Login.css';

const Login = () => {
    /** 변수 선언 */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    /** 로그인 버튼 클릭 시 */
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            /** 서버 통신 */
            const response = await axios.post('http://localhost:9000/api/v1/intrabucks/main/login', {
                email: email,
                password: password
            });

            /** jwt 세션 */
            const token = response.headers['authorization'];
            sessionStorage.setItem('jwt', token);

            alert('Login successful');

            /** home 화면 이동 */
            navigate('/home');

        } catch (error) {
            setError('로그인 정보가 알맞지 않습니다. 다시 한번 입력하세요');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>로그인</h1>
                <div className="Email-formGroup" >
                    <label>이메일</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="Pwd-formGroup">
                    <label>패스워드</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="login-button">로그인</button>
            </form>
        </div>
    );
};

export default Login;