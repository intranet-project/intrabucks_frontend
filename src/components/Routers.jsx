import React from "react";
import { Route, Routes } from "react-router-dom";

import EmployeeList from "../components/Employee/EmployeeList";
import Employee from "../components/Employee/Employee";
import Department from "../components/Department/Department";
import QuitterList from "../components/Quitter/QuitterList";
import Quitter from "../components/Quitter/Quitter";
import EmployeeUpdate from "../components/Employee/EmployeeUpdate";
import QuitterUpdate from "../components/Quitter/QuitterUpdate";
import PurchaseListPage from "../pages/PurchaseListPage";
import StockListPage from "../pages/StockListPage";
import AddStock from "./Stock/AddStockModal";
import ApprovalPage from "../pages/ApprovalPage";
import VoiceList from "../components/CRM/VoiceList";
import VoiceAnswer from "../components/CRM/VoiceAnswer";
import ApprovalLine from "./Approval/ApprovalLine";
import SalesListPage from "../pages/SalesListPage";
import StoreListPage from "../pages/StoreListPage";
import MenuListPage from "../pages/MenuListPage";
import Approval from "./Approval/Approval";
import ApprovalWaiting from "./Approval/ApprovalWaiting";
import ApprovalSideBar from "./Approval/ApprovalSideBar";
import ApprovalUpdate from "./Approval/ApprovalUpdate";
import ApprovalWaitingAll from "../pages/ApprovalWaitingAll";
import ApprovalGetAll from "../pages/ApprovalGetAll";
import VoiceListPage from "../pages/VoiceListPage";

const Routers = () => {
  return (
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
      <Route path="/approvalPage" element={<ApprovalPage />} />
      <Route path="/sales-management" element={<SalesListPage />} />
      <Route path="/storeListPage" element={<StoreListPage />} />
      <Route path="/menuListPage" element={<MenuListPage />} />
      <Route path="/voiceListPage" element={<VoiceListPage />} />

      <Route path="/AddStock" element={<AddStock />} />
      <Route path="/DetailStock" element={<AddStock />} />

      <Route path="/voiceList" element={<VoiceList />} />
      <Route path="/voiceAnswer" element={<VoiceAnswer />} />

      <Route path="/approval" element={<Approval />} />
      <Route path="/ApprovalLine" element={<ApprovalLine />} />
      <Route path="/approvalWaiting" element={<ApprovalWaiting />} />
      <Route path="/approvalUpdate" element={<ApprovalUpdate />} />
      <Route path="/approvalWaitingAll" element={<ApprovalWaitingAll />} />
      <Route path="/approvalGetAll" element={<ApprovalGetAll />} />
      <Route path="/approvalSideBar" element={<ApprovalSideBar />} />
    </Routes>
  );
};

export default Routers;
