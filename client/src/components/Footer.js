import React from "react";

const contact = [
  {
    icon: "bx bx-location-plus",
    name: "Địa chỉ: ",
    content: "280 An Dương Vương, Phường 4, Quận 5, TP.HCM",
  },
  {
    icon: "bx bxs-phone",
    name: "Số điện thoại: ",
    content: "+12 999 000 333",
  },
  {
    icon: "bx bx-envelope",
    name: "Email: ",
    content: "mlb-shop78@gmail.com",
  },
];

const Footer = () => {
  return (
    <div className="py-10 mt-10 bg-[#ffd400] text-black">
      <div className="container flex items-center pb-6 md:flex-row flex-col">
        <div className="md:w-[30%] w-full">
          <div className="mb-6">
            <img
              className="w-[100px] aspect-auto"
              src="https://res.cloudinary.com/annnn/image/upload/v1654943393/logo-removebg-preview_lkf7ph.png"
              alt="logo"
            />
          </div>
          {contact.map((p) => (
            <p
              key={p.name}
              className="mb-6 font-semibold text-black flex items-center"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center text-[30px]">
                <i className={p.icon} />
              </div>
              <p className="ml-3 flex-1">{p.content}</p>
            </p>
          ))}
        </div>
        <div className="md:ml-10 flex-1 grid md:grid-cols-4 grid-cols-1 text-left mt-10 md:mt-0 w-full">
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Solution</h1>
            <p className="mb-4">Marketing</p>
            <p className="mb-4">Analytics</p>
            <p className="mb-4">Commerce</p>
            <p className="mb-4">Insignts</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Support</h1>
            <p className="mb-4">Pricing</p>
            <p className="mb-4">Documentation</p>
            <p className="mb-4">Guides</p>
            <p className="mb-4">Api Status</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Company</h1>
            <p className="mb-4">About</p>
            <p className="mb-4">Blog</p>
            <p className="mb-4">Jobs</p>
            <p className="mb-4">Press</p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h1 className="uppercase font-semibold mb-6">Legal</h1>
            <p className="mb-4">Cleim</p>
            <p className="mb-4">Privacy</p>
            <p className="mb-4">Terms</p>
            <p className="mb-4">Partners</p>
          </div>
        </div>
      </div>
      <div className="container pt-10 border-t-2 border-black text-center">
        <p className="text-black font-semibold">
          Contrary to popular belief, Lorem Ipsum!
        </p>
      </div>
    </div>
  );
};

export default Footer;
