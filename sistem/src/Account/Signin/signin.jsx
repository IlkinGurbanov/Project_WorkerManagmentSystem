// RegisterForm.jsx
import React, { useState ,useEffect } from 'react';
import '../Signin/signin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Signin = () => {
    const RootUrl = "http://localhost:5000"
    const [isValid, setIsValid] = useState(false);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    const navigate = useNavigate()
    const [isPermision,setPermision] = useState(true)
    //permision state was created for editor permision but maybe will be use for gmail autentification permision
    let isLoginCase = null

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${RootUrl}/users`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
        toast.success("Uğurla giriş edirsiniz!");
        navigate("/panel")
    };

    const notifyError = () => {
        toast.error("Admin kimi daxil olmağa icazəniz yoxdur!");
    };

    const notifyWarning = () => {
        if(!isPermision){
            toast.warn("'Editor' kimi daxil ola bilməzsiniz!");
        }
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
        if(!isPermision){
            if(e.target.email.value !== "" && e.target.password.value !== "" && e.target.role.value === "user"){
                if(isValid){
                    data.forEach(element => {
                        // console.log(decode(element.password),JSON.stringify(formData.password));
                        if(JSON.stringify(formData.email) == decode(element.email) && JSON.stringify(formData.password) == decode(element.password)){
                            isLoginCase = true
                        }
                        else if(JSON.stringify(formData.email) != decode(element.email) || JSON.stringify(formData.password) != decode(element.password)){
                            isLoginCase = false
                        }
                      });
                    if(isLoginCase){
                        notifySuccess()
                        navigate("/panel")
                    }
                    else if(!isLoginCase){
                        toast.warn("Email yaxud parol səhvdir")
                    }
                }   
                else{
                    toast.warn("Parolda bir böyük hərf, bir kiçik hərf və bir rəqəm daxil olmaqla ən azı 8 simvol olmalıdır.")
                } 
            }
            else{
                toast.error("Xanaları doldurun!")
            }
        }
        if(isPermision){
            if(e.target.email.value !== "" && e.target.password.value !== "" && (e.target.role.value === "user" || e.target.role.value === "editor")){
                if(isValid){
                    data.forEach(element => {
                        // console.log(decode(element.password),JSON.stringify(formData.password));
                        if(JSON.stringify(formData.email) == decode(element.email) && JSON.stringify(formData.password) == decode(element.password)){
                            isLoginCase = true
                        }
                        else if(JSON.stringify(formData.email) != decode(element.email) || JSON.stringify(formData.password) != decode(element.password)){
                            isLoginCase = false
                        }
                      }); 
                    if(isLoginCase){
                        notifySuccess()
                        navigate("/panel")
                    }
                    else if(!isLoginCase){
                        toast.warn("Email yaxud parol səhvdir")
                    }
                }
                else{
                   toast.warn("Parolda bir böyük hərf, bir kiçik hərf və bir rəqəm daxil olmaqla ən azı 8 simvol olmalıdır.")
                }
            }
            else{
                toast.error("Xanaları doldurun!")
            }
        }
    };

    return (
        <div className="signin_maincontainer">
            <div className="signin_register-form-container">
                <h2 className='signin_h2'>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    className='signin_textemailpassword'
                        type="email" 
                        placeholder="Email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    <input 
                        className='signin_textemailpassword'
                        type={formData.showPassword ? 'text' : 'password'}
                        placeholder="Password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                    /><div className="password-toggle" onClick={handleTogglePasswordVisibility}>
                        {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                    <div className='signin_radiobtn'>
                        <label className='signin_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="user" 
                                checked={formData.role === 'user'} 
                                onChange={handleChange} 
                            /> <div className='signin_none'>User</div>
                        </label>
                        <label className='signin_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="editor" 
                                checked={formData.role === 'editor'} 
                                onChange={handleChange} 
                            /> <div className='signin_none'>Editor</div>
                        </label>
                        <label className='signin_lblbtn'>
                            <input 
                                type="radio" 
                                name="role" 
                                value="admin" 
                                checked={formData.role === 'admin'} 
                                onChange={handleChange} 
                            /> <div className='signin_none'>Admin</div>
                        </label>
                    </div>
                    <button className='signin_button' type="submit">Log in</button>
                    <Link to="/">
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signin;
