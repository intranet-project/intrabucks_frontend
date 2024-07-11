import React from "react";
import MenuList from "../components/Menu/MenuList";
import axios from "axios";
import { useState, useEffect } from "react";

const MenuListPage = () => {
  //API 통신(List)
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('jwt');
        const response = await axios.get(
          "http://localhost:9000/api/v1/intrabucks/menu/list",
          {
            headers: {
                'Authorization': token
            }
        });
        console.log(
          "================response.data-===================",
          response.data
        );
        setData(response.data);
      } catch (error) {
        console.error("에러 발생", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>메뉴 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          {/**메뉴 List 관련 폼 */}
          <MenuList data={data} />
        </div>
      </div>
    </div>
  );
};

export default MenuListPage;
