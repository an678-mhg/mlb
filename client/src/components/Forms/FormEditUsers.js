import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUserApi } from "../../api/adminApi";
import { validateForm } from "../../utils/validateForm";
import { toast } from "react-toastify";
import Error from "../Error";
import { useDispatch } from "react-redux";
import { updateUsers } from "../../redux/reducers/managerUsers";

const FormEditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser(id);
        setData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(data);
    if (error.length > 0) {
      return toast.error(<Error error={error} />);
    }

    try {
      const res = await updateUserApi(data);
      if (res.data.success) {
        dispatch(updateUsers(data));
        navigate("/admin/users");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="p-3">
      <div className="w-full">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          placeholder="Name..."
          name="name"
          className="w-full p-2 border-[1px] rounded-md outline-none"
          value={data?.name}
          onChange={handleOnchange}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Email</label>
        <input
          type="text"
          placeholder="Email..."
          name="email"
          className="w-full p-2 border-[1px] rounded-md outline-none"
          value={data?.email}
          onChange={handleOnchange}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Status</label>
        <select
          className="w-full p-2 border-[1px] rounded-md outline-none"
          value={data?.status}
          name="status"
          onChange={handleOnchange}
        >
          <option value="Active">Hoạt động</option>
          <option value="Banned">Bị cấm</option>
        </select>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">RoleId</label>
        <select
          className="w-full p-2 border-[1px] rounded-md outline-none"
          value={data?.roleId}
          name="roleId"
          onChange={handleOnchange}
        >
          <option value={"admin"}>Nhân viên</option>
          <option value={"user"}>Người dùng</option>
        </select>
      </div>
      <div className="w-full mt-4 text-right">
        <button className="p-2 bg-[#ffd400] rounded-md text-white">
          Update
        </button>
      </div>
    </form>
  );
};

export default FormEditUsers;
