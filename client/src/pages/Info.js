import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../api/adminApi";
import { editUser } from "../api/authApi";
import { addUser } from "../redux/reducers/userSlice";
import { validateEmail } from "../utils/validateForm";

const Info = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.data.success) {
        setUser(res.data.user);
      }
    })();
  }, [id]);

  useEffect(() => {
    setInfo({ ...info, name: user?.name, email: user?.email });
  }, [user]);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    passwordOld: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (
      user.name === info.name &&
      user.email === info.email &&
      !info.password.trim() &&
      !info.passwordOld.trim()
    ) {
      return;
    }
    if (!info.name.trim() || !info.email || !validateEmail(info.email)) {
      return toast.error(
        "Không được để trống thông tin và email phải đúng định dạng!"
      );
    }
    setLoading(true);
    try {
      const res = await editUser({ ...info, _id: user._id });
      if (res.data.success) {
        toast.success("Cập nhật thông tin thành công!");
        dispatch(addUser({ ...currentUser, ...info }));
        setUser({ ...user, name: info.name, email: info.email });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  if (id !== currentUser._id) {
    navigate("/");
    return toast.error("Bạn chỉ được sửa thông tin của bạn!");
  }

  return (
    <div className="mt-10">
      <div className="container bg-white py-6">
        <h3 className="text-center mb-5 font-semibold text-[30px]">
          Chỉnh Sửa Hồ Sơ
        </h3>
        <form
          onSubmit={handleOnSubmit}
          className="w-[700px] mx-auto max-w-full p-4"
        >
          <div className="flex items-center">
            <div className="w-[100px] height-[100px] rounded-full relative">
              <img src={user?.image} />
              <i className="bx bx-edit-alt text-[25px] absolute text-blue-500 right-0 bottom-0"></i>
            </div>
            <div className="ml-5">
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block mb-3 text-gray-600">
                  Tên khách hàng
                </label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none rounded-md w-full py-2 px-3"
                  value={info?.name}
                  name="name"
                />
              </div>
              <div>
                <label className="block mb-3 text-gray-600">Email</label>
                <input
                  onChange={handleOnChange}
                  className="border outline-none rounded-md w-full py-2 px-3"
                  value={info?.email}
                  name="email"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="block mb-3 text-gray-600">Mật khẩu cũ</label>
              <input
                onChange={handleOnChange}
                name="passwordOld"
                value={info.passwordOld}
                className="border outline-none rounded-md w-full py-2 px-3"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-3 text-gray-600">Mật khẩu mới</label>
              <input
                onChange={handleOnChange}
                name="password"
                value={info.password}
                className="border outline-none rounded-md w-full py-2 px-3"
              />
            </div>
            <button
              disabled={loading}
              className="rounded-md bg-[#ffd400] text-white py-2 px-3 w-full"
            >
              {loading ? "Đang cập nhật...." : "Cập nhật thông tin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Info;
