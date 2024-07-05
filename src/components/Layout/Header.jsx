import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      {/*홈 화면 네비게이터 자리 */}
      <div className="navigator">
        <nav>
          <Link to="#" className="nav-link">네비게이터 1</Link>
          <Link to="#" className="nav-link">네비게이터 2</Link>
          <Link to="#" className="nav-link">네비게이터 3</Link>
          <Link to="#" className="nav-link">네비게이터 4</Link>
        </nav>
      </div>

      <input type="text" placeholder="Search..." />
    </header>
  );
};

export default Header;