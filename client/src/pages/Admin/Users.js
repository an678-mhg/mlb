import React, { useEffect } from "react";
import UsersTable from "../../components/Table/UsersTable";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import FormEditUsers from "../../components/Forms/FormEditUsers";
import Paginate from "../../components/Paginate";

const Users = () => {
  const { users, totalPage } = useSelector((state) => state.managerUsers);

  return (
    <Routes>
      <Route
        path=""
        element={
          <div className="overflow-hidden">
            <UsersTable people={users} />
            <Paginate totalPage={totalPage} />
          </div>
        }
      />
      <Route path="edit/:id" element={<FormEditUsers />} />
    </Routes>
  );
};

export default Users;
