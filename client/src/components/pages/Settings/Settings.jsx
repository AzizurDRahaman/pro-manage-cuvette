import React, { useState } from 'react'
import Button from "../../UI/Buttons/Button"
import { IoPersonOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { SlLock } from "react-icons/sl";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import styles from "./Settings.module.css"
import { BASE_URL } from '../../../constants';
import { toast } from 'react-toastify';

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [formData, setFormData] = useState({
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    old_password: "",
    update_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const response = await fetch(`${BASE_URL}/auth/update/${localStorage.getItem("userId")}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      toast.success(data.message);
    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <>
      <section className={styles.body}>
        <h1>Settings</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}> <IoPersonOutline /> <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /> </div>
          <div className={styles.inputBox}> <CiMail /> <input type="email" placeholder="Update Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /> </div>
          <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showPassword ? "text" : "password"} id="old-password" placeholder="Old Password" value={formData.old_password} onChange={(e) => setFormData({ ...formData, old_password: e.target.value })} />
              <span onClick={togglePassword} >
                { showPassword && <FaRegEye />}
                { !showPassword && <FaRegEyeSlash />}
              </span>
            </div>
            <div className={`${styles.inputBox} ${styles.password}`}>
            <SlLock />
              <input type={showConfirmPassword ? "text" : "password"} id="update-password" placeholder="Update Password" value={formData.update_password} onChange={(e) => setFormData({ ...formData, update_password: e.target.value })} />
              <span onClick={toggleConfirmPassword} >
                { showConfirmPassword && <FaRegEye />}
                { !showConfirmPassword && <FaRegEyeSlash />}
              </span>
            </div>
          <Button type="submit" fill="filled" color="#17A2B8">Update</Button>
        </form>
      </section>
    </>
  )
}
