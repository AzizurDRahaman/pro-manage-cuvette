import React, { useState } from "react";
import styles from "./Authentication.module.css";
import hero from "../../../assets/images/hero.png";
import { CiMail } from "react-icons/ci";
import { SlLock } from "react-icons/sl";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Button from "../../UI/Buttons/Button";
import { BASE_URL } from "../../../constants";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const {confirmPassword, ...rest} = formData;
      if(confirmPassword !== rest.password){
        alert("Passwords do not match");
        return;
      }
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });
      const data = await response.json();
      if(response.status === 201){
        toast.success(data.message);
        navigate("/sign-in");
      }else{
        toast.error(data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.image}>
            <div className={styles.back}>
            </div>
              <img src={hero} />
          </div>
          <h2>Welcome aboard my friend</h2>
          <p>just a couple of clicks and we start</p>
        </div>
        <div className={styles.form}>
            <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
            <IoPersonOutline />
              <input type="text" id="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className={styles.inputBox}>
            <CiMail />
              <input type="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <span onClick={togglePassword} >
                { showPassword && <FaRegEye />}
                { !showPassword && <FaRegEyeSlash />}
              </span>
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
              <span onClick={toggleConfirmPassword} >
                { showConfirmPassword && <FaRegEye />}
                { !showConfirmPassword && <FaRegEyeSlash />}
              </span>
            </div>
            <Button type="submit" fill={"filled"} color={"#17A2B8"} className={styles.button}>Register</Button>
          </form>
          <p>
            Have an account?
          </p>
          <Button fill={"outlined"} color={"#17A2B8"} onClick={() => {
            navigate("/sign-in");
          }}>Log in</Button>
        </div>
      </div>
    </>
  );
}
