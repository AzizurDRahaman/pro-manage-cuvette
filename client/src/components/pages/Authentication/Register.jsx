import React, { useState } from "react";
import styles from "./Authentication.module.css";
import hero from "../../../assets/images/hero.png";
import { CiMail } from "react-icons/ci";
import { SlLock } from "react-icons/sl";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Button from "../../UI/Buttons/Button";

export default function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
          <form>
            <div className={styles.inputBox}>
            <IoPersonOutline />
              <input type="email" id="name" placeholder="Name" />
            </div>
            <div className={styles.inputBox}>
            <CiMail />
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
              <span onClick={togglePassword} >
                { showPassword && <FaRegEye />}
                { !showPassword && <FaRegEyeSlash />}
              </span>
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showConfirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" />
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
            window.location.href = "/sign-in"
          }}>Log in</Button>
        </div>
      </div>
    </>
  );
}
