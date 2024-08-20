import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Layout/Header.css";

const Header = () => {
  // 로그인 되어 있으므로 useState의 기본 값은 true
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //로그아웃 alert 창 띄우기
  const alertLogout = () => {
    if (window.confirm("로그아웃을 하시겠습니까?")) {
      setIsLoggedIn(false);
      window.location.href = "/";
    }
  }

  return (
    <header className="layout-header"> {/** 전체 css 적용 */}
      <div className="header-position">
        <nav className="custom-nav-button">
          {isLoggedIn ? (
            <button className="header-button" onClick={alertLogout}>
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="header-button">
              로그인
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
