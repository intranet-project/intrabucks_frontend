import React from "react";
import { Route, Routes } from "react-router-dom";

import EmployeeList from '../components/Employee/EmployeeList';
import Employee from '../components/Employee/Employee';
import Department from '../components/Department/Department';
import QuitterList from '../components/Quitter/QuitterList';
import Quitter from '../components/Quitter/Quitter';
import EmployeeUpdate from '../components/Employee/EmployeeUpdate';
import QuitterUpdate from '../components/Quitter/QuitterUpdate';
import PurchaseListPage from '../pages/PurchaseListPage';
import StockListPage from '../pages/StockListPage';
import AddStock from "./Stock/AddStockModal";
import ApprovalPage from "../pages/ApprovalPage";


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

            <Route path="/AddStock" element={<AddStock />} />
            <Route path="/DetailStock" element={<AddStock />} />
        </Routes>
    );

}

export default Routers;