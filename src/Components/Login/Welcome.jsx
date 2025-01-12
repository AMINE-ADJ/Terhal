import React from "react";
import email from "../../assets/email.svg";
import password from "../../assets/password.svg";
import google from "../../assets/google.svg";
import { useState } from "react";
import eyeclosed from "../../assets/closedeye.svg";
import eyeopened from "../../assets/eyeOpen.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Welcome() {
  let inputs = [
    { description: "Adresse mail", icon: email, type: "", name: "email" },
    {
      description: "Mot de passe",
      icon: password,
      type: "password",
      name: "password",
    },
  ];
  const [visible, setVisible] = useState(false);
  const [pw, setPw] = useState("");
  // const fetechedData = {
  //   name: "Hicham tihami",
  //   email: "tihami@esi.dz",
  // };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
    // console.log(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8700/api/login/", data, {
        "Content-Type": "application/json",
      })
      .then(function (res) {
        console.log(res.data);
        console.log(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        if (res.data.data.role != "master") {
          localStorage.setItem(
            "userWilaya",
            JSON.stringify(res.data.regions.map((obj) => obj.code))
          );
        }

        // navigate("/auth");
        navigate("/auth");
      })
      .catch(function (error) {
        console.log(error);
      });
    //send updated infos

    console.log("this is data i send : ", data);
  };
  return (
    <div
      id="form"
      className="flex flex-col md:w-[500px] md:h-[500px] gap-y-[70px]  bg-white items-center p-[25px]"
    >
      <div className="flex flex-col gap-y-[8px] mr-[220px]">
        <p className="text-xl font-[500]  font-poppins">Bienvenue à </p>
        <p className="text-2xl text-[#D8681D] font-poppins font-bold">
          Tirhal{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-[30px]">
        {inputs.map((index) => (
          <div className="p-3 md:w-[400px] md:h-[45px] flex flex-row gap-x-[15px] items-center bg-[#ECECEC] rounded-[5px]">
            <img src={index.icon} className="w-[16px] h-[16px]"></img>
            <input
              className="md:w-[300px] md:h-[35px] outline-none bg-[#ECECEC] font-normal text-sm "
              name={index.name}
              placeholder={index.description}
              type={
                index.type == "password"
                  ? visible
                    ? "text"
                    : "password"
                  : "text"
              }
              onChange={
                index.type == "password"
                  ? (e) => {
                      setPw(e.target.value);
                      handleChange(e);
                    }
                  : handleChange
              }
              required
            ></input>
            {index.type == "password" && pw != "" ? (
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  setVisible(!visible);
                }}
              >
                {" "}
                <img
                  className="md:w-[18px] md:h-[18px] "
                  src={visible ? eyeopened : eyeclosed}
                ></img>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
        <div className="flex flex-row justify-between md:w-[400px]">
          <input type="checkbox" className="cursor-pointer"></input>
          <p className="text-sm text-[#D8681D] font-semibold cursor-pointer hover:underline">
            <a>Forgot password?</a>
          </p>
        </div>
        <Link to="/auth">
          <button
            className="md:w-[400px] md:h-[45px] text-white font-medium bg-[#D8681D] rounded-[5px] hover:bg-white hover:text-[#D8681D] hover:border-2 hover:border-[#D8681D]"
            type="submit"
            onClick={handleSubmit}
          >
            Connexion
          </button>
        </Link>
      </form>
     
    
    </div>
  );
}
