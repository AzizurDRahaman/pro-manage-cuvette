import React, { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import hero from "../../../assets/images/hero.png";
import { CiMail } from "react-icons/ci";
import { SlLock } from "react-icons/sl";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../../UI/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext/AuthContext";

export default function Signin() {

  const { isAuthenticated, handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  })

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    handleLogin(formData);
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
            <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
            <CiMail />
              <input type="email" id="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <span onClick={togglePassword} >
                { showPassword && <FaRegEye />}
                { !showPassword && <FaRegEyeSlash />}
              </span>
            </div>
            <Button type="submit" fill={"filled"} color={"#17A2B8"} className={styles.button}>Log in</Button>
          </form>
          <p>
            Have no account yet?
          </p>
          <Button fill={"outlined"} color={"#17A2B8"} onClick={() => {
            window.location.href = "/register"
          }}>Register</Button>
        </div>
      </div>
    </>
  );
}
