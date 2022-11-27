import React, { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import {
  getOneProductApi,
  getDescriptionApi,
  updateProductApi,
} from "../../api/ProductApi";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/reducers/productSlice";

const FormEditProducts = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [memery, setMemory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    colors: [],
    memorys: [],
    category: "Phone",
  });
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHtml, setContentHtml] = useState("");

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setContentMarkdown(text);
    setContentHtml(html);
  }

  useEffect(() => {
    (async (id) => {
      try {
        setLoading(true);
        const res = await getOneProductApi(id);
        if (res.data.success) {
          const { name, colors, memorys, newPrice, oldPrice, category } =
            res.data.product;
          setProduct({
            ...product,
            name,
            newPrice,
            oldPrice,
            colors,
            memorys,
            category,
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    (async (id) => {
      try {
        const res = await getDescriptionApi(id);
        if (res.data.success) {
          setContentMarkdown(res.data.description.contentMarkdown);
          setContentHtml(res.data.description.contentHtml);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  const deleteColor = (id) => {
    const newListColor = product.colors.filter((p) => p !== id);
    setProduct({ ...product, colors: newListColor });
  };

  const deleteMemory = (id) => {
    const newListMemory = product.memorys.filter((p) => p !== id);
    setProduct({ ...product, memorys: newListMemory });
  };

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (product.colors.length === 0 || product.memorys.length === 0)
      return toast.warn("Thêm màu sắc và option cho sản phẩm !");

    setLoading(true);

    try {
      const res = await updateProductApi(id, {
        ...product,
        oldPrice: +product.oldPrice,
        newPrice: +product.newPrice,
        contentHtml,
        contentMarkdown,
      });
      if (res.data.success) {
        dispatch(updateProduct({ ...product, _id: id }));
        navigate(-1);
        toast.success(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitForm} className="p-3 h-[100%] overflow-auto">
      <div className="w-full">
        <label className="block mb-2">Name</label>
        <input
          name="name"
          placeholder="Name..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.name}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">New Price</label>
        <input
          name="newPrice"
          placeholder="New Price..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.newPrice}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Old Price</label>
        <input
          name="oldPrice"
          placeholder="Old Price..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.oldPrice}
          onChange={onChangeInput}
        />
      </div>

      <div className="w-full mt-4">
        <label className="block mb-2">Colors</label>
        <div className="flex items-center">
          <input
            name="colors"
            placeholder="Colors..."
            className="border-[1px] p-2 w-full outline-none rounded-md"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-[#ffd400] rounded-md text-white ml-3"
            onClick={() => {
              setProduct({ ...product, colors: [...product.colors, color] });
              setColor("");
            }}
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-8 mt-4 gap-3">
          {product.colors.map((p) => (
            <p
              key={p}
              className="bg-orange-400 rounded-md p-2 text-white flex items-center justify-between"
            >
              {p}
              <p onClick={() => deleteColor(p)} className="ml-2 cursor-pointer">
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Memorys</label>
        <div className="flex items-center">
          <input
            name="memorys"
            placeholder="Memorys..."
            className="border-[1px] p-2 w-full outline-none rounded-md"
            value={memery}
            onChange={(e) => setMemory(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-[#ffd400] rounded-md text-white ml-3"
            onClick={() => {
              setProduct({ ...product, memorys: [...product.memorys, memery] });
              setMemory("");
            }}
          >
            Add
          </button>
        </div>
        <div className="grid grid-cols-8 mt-4 gap-3">
          {product.memorys.map((p) => (
            <p
              key={p}
              className="bg-orange-400 rounded-md p-2 text-white flex items-center justify-between"
            >
              {p}
              <p
                onClick={() => deleteMemory(p)}
                className="ml-2 cursor-pointer"
              >
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Category</label>
        <select
          className="border-[1px] p-2 outline-none rounded-md w-full"
          value="Phone"
          name="category"
          value={product.category}
          onChange={onChangeInput}
        >
          <option value={"Phone"}>Điện thoại</option>
          <option value={"Watch"}>Đồng hồ</option>
          <option value={"Tablet"}>Máy tính bảng</option>
          <option value={"Laptop"}>Laptop</option>
          <option value={"Accessory"}>Phụ kiện</option>
        </select>
      </div>

      <div className="mt-4 w-full">
        <p className="mb-2">Description</p>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={contentMarkdown}
        />
      </div>

      <div className="w-full text-right">
        <input
          type={"submit"}
          placeholder="Add Product"
          className="bg-[#ffd400] mt-4 p-2 rounded-md text-white"
        />
      </div>

      {loading && <Loading />}
    </form>
  );
};

export default FormEditProducts;
