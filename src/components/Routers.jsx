import React from "react";
import { Route, Routes } from "react-router-dom";

//employee
import EmployeeList from "../components/Employee/EmployeeList";
import Employee from "../components/Employee/Employee";
import EmployeeUpdate from "../components/Employee/EmployeeUpdate";

//approval
import Approval from "./Approval/Approval";
import ApprovalWaiting from "./Approval/ApprovalWaiting";
import ApprovalSideBar from "./Approval/ApprovalSideBar";
import ApprovalUpdate from "./Approval/ApprovalUpdate";
import ApprovalLine from "./Approval/ApprovalLine";

import ApprovalWaitingAll from "../pages/Approval/ApprovalWaitingAll";
import ApprovalGetAll from "../pages/Approval/ApprovalGetAll";
import ApprovalSendAll from "../pages/Approval/ApprovalSendAll";
import ApprovalPage from "../pages/Approval/ApprovalPage";

//Department
import Department from "../components/Department/Department";

//Quitter
import QuitterList from "../components/Quitter/QuitterList";
import Quitter from "../components/Quitter/Quitter";
import QuitterUpdate from "../components/Quitter/QuitterUpdate";

//Purchase
import PurchaseListPage from "../pages/Purchase/PurchaseListPage";

//Stock
import StockListPage from "../pages/Stock/StockListPage";
import AddStock from "./Stock/AddStockModal";

//Voice
import VoiceList from "../components/CRM/VoiceList";
import VoiceAnswer from "../components/CRM/VoiceAnswer";
import VoiceListPage from "../pages/Voice/VoiceListPage";

//Sales
import SalesListPage from "../pages/Sales/SalesListPage";

//Store
import StoreListPage from "../pages/Store/StoreListPage";

//Menu
import MenuListPage from "../pages/Menu/MenuListPage";

//Board
import BoardList from "./Board/BoardList";
import BoardUpdate from "./Board/BoardUpdate";
import BoardPage from "../pages/Board/BoardPage";
import CreateBoardPage from "../pages/Board/CreateBoardPage";

//Layout
import Login from "../components/Login/Login";
import HomePage from "../pages/Layout/HomePage";
import SideBar from "./Layout/SideBar";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

//추가 import시, 위치에 맞춰서 정리 요망
const Routers = () => {
  return (
    <div>
      <Header />
      <SideBar />

      <div className="layout-page-container">
        <Routes>
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/employee-update/:empId" element={<EmployeeUpdate />} />
          <Route path="/employee" element={<Employee />} />


          <Route path="/department" element={<Department />} />

          <Route path="/quitter-list" element={<QuitterList />} />
          <Route path="/quitter-update" element={<QuitterUpdate />} />
          <Route path="/quitter" element={<Quitter />} />

          <Route path="/purchaseListPage" element={<PurchaseListPage />} />

          <Route path="/stockListPage" element={<StockListPage />} />


          <Route path="/sales-management" element={<SalesListPage />} />
          <Route path="/storeListPage" element={<StoreListPage />} />
          <Route path="/menuListPage" element={<MenuListPage />} />
          <Route path="/voiceListPage" element={<VoiceListPage />} />

          <Route path="/AddStock" element={<AddStock />} />
          <Route path="/DetailStock" element={<AddStock />} />

          <Route path="/voiceList" element={<VoiceList />} />
          <Route path="/voiceAnswer" element={<VoiceAnswer />} />

          <Route path="/approvalGetAll" element={<ApprovalGetAll />} />
          <Route path="/approvalPage" element={<ApprovalPage />} />
          <Route path="/approvalSendList" element={<ApprovalSendAll />} />
          <Route path="/approvalWaitingAll" element={<ApprovalWaitingAll />} />

          <Route path="/approval" element={<Approval />} />
          <Route path="/ApprovalLine" element={<ApprovalLine />} />
          <Route path="/approvalWaiting" element={<ApprovalWaiting />} />
          <Route path="/approvalUpdate" element={<ApprovalUpdate />} />
          <Route path="/approvalSideBar" element={<ApprovalSideBar />} />


          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/boardPage" element={<BoardPage />} />
          <Route path="/createBoardPage" element={<CreateBoardPage />} />

          <Route path="/boardList" element={<BoardList />} />
          <Route path="/BoardUpdate" element={<BoardUpdate />} />

        </Routes>

      </div>
      <Footer />
    </div>
  );
};

export default Routers;
