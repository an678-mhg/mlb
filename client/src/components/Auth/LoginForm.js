import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserInfo, loginAPi } from "../../api/authApi";
import setAuthToken from "../../utils/setAuthToken";
import { saveToken } from "../../utils/localStrorage";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/userSlice";
import Loading from "../Loading/Loading";
import { validateEmail } from "../../utils/validateForm";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAPi(data);
      if (res.data.success) {
        saveToken(res.data.token);
        setAuthToken(res.data.token);
        const users = await getUserInfo();

        if (users.data.success) {
          dispatch(addUser(users.data.user));
        }
        setLoading(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="text-[#333] w-full">
      <div className="my-4 w-full">
        <img
          className="w-[100px] aspect-auto mx-auto"
          src="https://res.cloudinary.com/annnn/image/upload/v1654943393/logo-removebg-preview_lkf7ph.png"
          alt="logo"
        />
      </div>
      <h1 className="text-2xl font-semibold my-4">Sign In</h1>
      <form onSubmit={submitForm} className="w-full">
        <div className="w-full">
          <label className="block mb-1" htmlFor="email-input">
            Email
          </label>
          <input
            required
            id="email-input"
            className="w-full p-2 rounded-md outline-none"
            type="email"
            name="email"
            placeholder="Ex: mlb@gmail.com"
            value={data.email}
            onChange={handleOnChange}
          />
        </div>
        <div className="w-full mt-4">
          <label className="block mb-1" htmlFor="password-input">
            Password
          </label>
          <input
            required
            id="password-input"
            className="w-full p-2 rounded-md outline-none"
            type="password"
            name="password"
            placeholder="Ex: 123456A"
            value={data.password}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button className="mt-8 w-full bg-[#ffbc06] p-2 rounded-md text-white">
            Sign In
          </button>
        </div>
      </form>

      <p className="w-full text-center mt-3">
        Do not have an account{" "}
        <Link className="text-blue-400" to="/auth/register">
          Register
        </Link>
      </p>

      {loading && <Loading />}
    </div>
  );
};

export default LoginForm;
