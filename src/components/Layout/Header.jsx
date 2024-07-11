import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = () => {
  // 로그인 상태를 관리하는 useState 훅
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인/로그아웃 상태를 토글하는 함수
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="header">
      <div className="navigator">
        <nav>
          {/* 로그인 상태에 따라 다른 링크를 렌더링 */}
          {isLoggedIn ? (
            <Link to="/home" className="nav-link" onClick={toggleLogin}>
              로그아웃
            </Link>
          ) : (
            <Link to="/login" className="nav-link" onClick={toggleLogin}>
              로그인
            </Link>
          )}
          <input type="text" placeholder="Search..." />
        </nav>
      </div>
    </header>
  );
};

export default Header;
