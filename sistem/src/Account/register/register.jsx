// RegisterForm.jsx
import React, { useState , useEffect } from 'react';
import '../register/register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {
    const [isValid, setIsValid] = useState(false);

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    let returnRegister = false
    const [data,setData] = useState([])
    const RootUrl = "http://localhost:5000"
    const [isLogin,setisLogin] = useState(false)
    const [isEditorRequest,setisEditorRequest] = useState(false)
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState('hidden');
    
    useEffect(() => {
        axios.get(`${RootUrl}/users`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleVisibility = () => {
        if(isVisible === 'hidden'){
            setIsVisible('visible');
        }
        else{
            setIsVisible('hidden');
        }
    };

      const [checked, setChecked] = React.useState(false);
    
      const handlechange = () => {
        setChecked((prev) => !prev);
      };
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'role' && value === 'admin') {
            notifyError();
        }
        if (name === 'role' && value === 'editor') {
            notifyWarning();
        }
        setIsValid(passwordRegex.test(formData.password));
    };
    const notifySuccess = () => {
        toast.success("Uğurla qeydiyyat olundu!Login səhifəsinə keçid edin");
    };

    const notifyError = () => {
        toast.error("Admin kimi qeydiyyat etməyə icazəniz yoxdur!");
    };

    const notifyWarning = () => {
        setisEditorRequest(true)
        toast.warn("User kimi qeydiyyatdan keçin,Istəyiniz adminə bildirildi.Icazə verilərsə 'Editor' kimi daxil ola biləcəksiniz!");
    };
    const decode = (encryptedObject) => {
        const decryptedBytes = CryptoJS.AES.decrypt((encryptedObject), 'sifre');
        const decryptedData = (decryptedBytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
    const handleTogglePasswordVisibility = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const encryptedObject1 = CryptoJS.AES.encrypt(JSON.stringify(formData.name), 'sifre').toString();
        const encryptedObject2 = CryptoJS.AES.encrypt(JSON.stringify(formData.surname), 'sifre').toString();
        const encryptedObject3 = CryptoJS.AES.encrypt(JSON.stringify(formData.email), 'sifre').toString();
        const encryptedObject4 = CryptoJS.AES.encrypt(JSON.stringify(formData.password), 'sifre').toString();

        // const decryptedBytes = CryptoJS.AES.decrypt(encryptedObject1, 'sifre');
        // const decryptedData = (decryptedBytes.toString(CryptoJS.enc.Utf8));

        // console.log("data",formData.name,"sifrelenmis data",encryptedObject1,"cozumlenmis data",decryptedData)

        if(e.target.email.value !== "" && e.target.password.value !== "" && e.target.role.value === "user" && !isLogin){
            if(isValid){
                data.forEach(element=>{
                    if(JSON.stringify(formData.email) == decode(element.email)){
                        returnRegister = true;
                        toast.error("Bu mail hesabı ilə artıq qeydiyyatdan keçmisiniz!")
                    }   
                })
                if(!returnRegister){
                    axios.post(`${RootUrl}/users`,{
                        name:encryptedObject1,
                        surname:encryptedObject2,
                        email:encryptedObject3,
                        password:encryptedObject4,
                        role:formData.role,
                        isEditorRequest:isEditorRequest
                    })
                    setisLogin(true)
                    notifySuccess()
                }
            }
            else{
                toast.warn("Parolda bir böyük hərf, bir kiçik hərf və bir rəqəm daxil olmaqla ən azı 8 simvol olmalıdır.")
            }
        }
        else if(e.target.email.value !== "" && e.target.password.value !== "" && e.target.role.value === "user" && isLogin){
            toast.warn("Artıq qediyyatdan keçmisiniz.Hesabınıza daxil olun!")
            navigate("/Login")
        }
        else{
            toast.error("Xanaları doldurun!")
        }
    }; 
    return (
        <div className="register_maincontainer">
            <div className="register_register-form-container">
                <div className="info-container">
                    <div className=" register_infoicon info-icon" onClick={toggleVisibility}>
                        <InfoIcon/> 
                    </div>
                </div>
                <h2 className='register_h2'>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        className='register_textemailpassword'
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    <input 
                        className='register_textemailpassword'
                        type="text" 
                        placeholder="Surname" 
                        name="surname" 
                        value={formData.surname} 
                        onChange={handleChange} 
                    />
                    <input 
                        className='register_textemailpassword'
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        className='register_textemailpassword'
                        type = {formData.showPassword ? 'text' : 'password'}
                        placeholder="Password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                    /><div className="password-toggle" onClick={handleTogglePasswordVisibility}>
                        {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                    <div className='register_radiobtn'>
                        <label className='register_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="user" 
                                checked={formData.role === 'user'} 
                                onChange={handleChange} 
                            /> <div className='register_none'>User</div>
                        </label>
                        <label className='register_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="editor" 
                                checked={formData.role === 'editor'} 
                                onChange={handleChange} 
                            /> <div className='register_none'>Editor</div>
                        </label>
                        <label className='register_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="admin" 
                                checked={formData.role === 'admin'} 
                                onChange={handleChange} 
                            /> <div className='register_none'>Admin</div>
                        </label>
                    </div>
                    <button className='register_button' type="submit">Register</button>
                    <div className="register_login" >
                        <Link to="/login">
                            Log in
                        </Link>
                    </div>
                    <div>
                        <p style={{visibility:isVisible}} className='infotext'>Işçi idarə etmə sisteminə xoş gəlmisiniz!Sitemimiz işçilərlə bağlı məlumatları əhatə edir.
                            Sistemimizdə istifadəçilər üçün nəzərə tutulmuş 2 cür qeydiyyat mümkündur.Siz 'user' kimi qeydiyyatdan keçə və yalnız işçilər barədə məlumat ala bilərsiniz.'Editor' kimi qeydiyyatdan keçib sistem üzərində dəyişikliklər apara bilərsiniz.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
