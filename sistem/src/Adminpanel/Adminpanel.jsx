import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useEffect , useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './adminpanel.css'
import {  toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Adminpanel() {
    const [isAdd,setisAdd] = useState(false)
    const [isEdit,setisEdit] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [isValidEdit,setIsValidEdit] = useState(true)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const [data] = useState([])
    const [isLogin,setisLogin] = useState(false)
    const [isEditorRequest] = useState(false)
    const [passwordtype,setpasswordtype] = useState(false)
    const [rows,setRows] = useState([])
    const RootUrl = "http://localhost:5000"
    let returnRegister = false

    useEffect(() => {
        axios.get(`${RootUrl}/users`)
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const decode = (encryptedObject) => {
        const decryptedBytes = CryptoJS.AES.decrypt((encryptedObject), 'sifre');
        const decryptedData = (decryptedBytes.toString(CryptoJS.enc.Utf8));
        return JSON.parse(decryptedData);
    }
    const Tooglepass = () => {
        if(passwordtype){
            setpasswordtype(false)
        }
        else if(!passwordtype){
            setpasswordtype(true)
        }
    }
    const [formData, setFormData] = useState({
        id:'',
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
        setIsValid(passwordRegex.test(formData.password));
    };
    const handleChangeforEdit = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setIsValidEdit(!(passwordRegex.test(formData.password)));
    };
    const notifySuccess = () => {
        toast.success("Isdifadəçi əlavə edildi!");
    };   
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


        if(e.target.email.value !== "" && e.target.password.value !== "" && !isLogin){
            if(isValid){
                data.forEach(element=>{
                    if(JSON.stringify(formData.email) === decode(element.email)){
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
                    setRows(prevRows => [...prevRows, {
                        name:encryptedObject1,
                        surname:encryptedObject2,
                        email:encryptedObject3,
                        password:encryptedObject4,
                        role:formData.role,
                        isEditorRequest:isEditorRequest
                    }]);
                    setTimeout(window.location.reload(),7000);
                }
            }
            else{
                toast.warn("Parolda bir böyük hərf, bir kiçik hərf və bir rəqəm daxil olmaqla ən azı 8 simvol olmalıdır.")
            }
        }
        else if(e.target.email.value !== "" && e.target.password.value !== ""  && isLogin){
            toast.warn("Artiq istifadəçi əlavə olundu")
        }
        else{
            toast.error("Xanaları doldurun!")
        }
    }; 
    const handleSubmitEdit = (e) => {
        e.preventDefault();

        const encryptedObject1 = CryptoJS.AES.encrypt(JSON.stringify(formData.name), 'sifre').toString();
        const encryptedObject2 = CryptoJS.AES.encrypt(JSON.stringify(formData.surname), 'sifre').toString();
        const encryptedObject3 = CryptoJS.AES.encrypt(JSON.stringify(formData.email), 'sifre').toString();
        const encryptedObject4 = CryptoJS.AES.encrypt(JSON.stringify(formData.password), 'sifre').toString();

        if(e.target.email.value !== "" && e.target.password.value !== "" && !isLogin){
            if(isValidEdit){
                data.forEach(element=>{
                    if(JSON.stringify(formData.email) === decode(element.email)){
                        returnRegister = true;
                        toast.error("Bu mail hesabı ilə artıq qeydiyyatdan keçmisiniz!")
                    }   
                })
                if(!returnRegister){
                    axios.put(`${RootUrl}/users/${formData.id}`,{
                        name:encryptedObject1,
                        surname:encryptedObject2,
                        email:encryptedObject3,
                        password:encryptedObject4,
                        role:formData.role,
                        isEditorRequest:isEditorRequest
                    })
                    setisLogin(true)
                    notifySuccess()
                    setRows(prevRows => [...prevRows, {
                        name:encryptedObject1,
                        surname:encryptedObject2,
                        email:encryptedObject3,
                        password:encryptedObject4,
                        role:formData.role,
                        isEditorRequest:isEditorRequest
                    }]);
                    setTimeout(window.location.reload(),7000);
                }
            }
            else{
                toast.warn("Parolda bir böyük hərf, bir kiçik hərf və bir rəqəm daxil olmaqla ən azı 8 simvol olmalıdır.")
            }
        }
        else if(e.target.email.value !== "" && e.target.password.value !== ""  && isLogin){
            toast.warn("Artiq istifadəçi əlavə olundu")
        }
        else{
            toast.error("Xanaları doldurun!")
        }
    }; 
    const handleAdd = () => {
        if(isAdd){
            setisAdd(false)
        }
        else if(!isAdd){
            setisAdd(true)
        }
    }
    const handleEdit = (id,name,surname,email,password,role) => {
        setFormData({
            id:id,
            name:decode(name),
            surname:decode(surname),
            email:decode(email),
            password:decode(password),
            role:role
        })
        if(isEdit){
            setisEdit(false)
        }
        else if(!isEdit){
            setisEdit(true)
        }
    }
    const handleDelete = (index) => {
        axios.delete(`${RootUrl}/users/${index}`)
        setRows(rows.filter(x => x._id !== index))
    }

  return (
    <>
    <div className="appbar">
        <h1>Istifadəçi idarəetmə paneli</h1>
        <div className='rightbar'>
            <PersonAddAltIcon className='eye' onClick={handleAdd}/>
            <Link to="/login">
                <ExitToAppIcon/>
            </Link>
        </div>
    </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className='tblhead'>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Ad,Soyad</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left" style={{display:'flex'}}>Şifrə
                        {(passwordtype) ? (
                                <RemoveRedEyeIcon  className='eye' onClick={Tooglepass}/>
                        ) : (
                                <VisibilityOffIcon className='eye' onClick={Tooglepass}/>
                        )}
                        </TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Editor icazəsi</TableCell>
                        <TableCell>Functions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell component="th" scope="row">
                                {decode(row.name)},{decode(row.surname)}
                            </TableCell>
                            <TableCell align="left">
                                {decode(row.email)}
                            </TableCell>
                            <TableCell align="left">
                                {(passwordtype) ? decode(row.password) : "***********"}
                            </TableCell>
                            <TableCell align="left">{row.role}</TableCell>
                            <TableCell align="left">{(row.isEditorRequest)? "true" : "false"}</TableCell>
                            <TableCell>
                            <EditIcon onClick={() => handleEdit(row._id,row.name,row.surname,row.email,row.password,row.role)} className='eye'/>
                            <DeleteIcon onClick={() => handleDelete(row._id)} className='eye'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        {
            (isAdd) ? (
                <form className='form' onSubmit={handleSubmit}>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Surname" 
                            name="surname" 
                            value={formData.surname} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input className='register_textemailpassword' type="email"  placeholder="Email"   name="email"  value={formData.email}  onChange={handleChangeforEdit} />
                    </TableCell>
                    <TableCell className='dflex'>
                        <input   className='register_textemailpassword'  type = {formData.showPassword ? 'text' : 'password'} placeholder="Password"   name="password"    value={formData.password}    onChange={handleChange}  />
                    </TableCell>
                    <TableCell>
                            <div className="password-toggle" onClick={handleTogglePasswordVisibility}>
                                {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                    </TableCell>
                    <TableCell>
                        <div className='register_radiobtn'>
                            <label className='register_lblbtn adminbtnbtn'>
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
                    </TableCell>
                    <TableCell>
                        <button className='register_button adminbtn' type="submit">Save</button>
                    </TableCell>
                </form>
            ):(isEdit) ?  
            (
                <form className='form' onSubmit={handleSubmitEdit}>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Surname" 
                            name="surname" 
                            value={formData.surname} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input className='register_textemailpassword' type="email"  placeholder="Email"   name="email"  value={formData.email}  onChange={handleChange} />
                    </TableCell>
                    <TableCell className='dflex'>
                        <input   className='register_textemailpassword'  type = {formData.showPassword ? 'text' : 'password'} placeholder="Password"   name="password"    value={formData.password}    onChange={handleChange}  />
                    </TableCell>
                    <TableCell>
                            <div className="password-toggle" onClick={handleTogglePasswordVisibility}>
                                {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                    </TableCell>
                    <TableCell>
                        <div className='register_radiobtn'>
                            <label className='register_lblbtn adminbtnbtn'>
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
                    </TableCell>
                    <TableCell>
                        <button className='register_button adminbtn' type="submit">Save</button>
                    </TableCell>
                </form>
            )
            : <></>
        }
        </TableContainer>
    </>
  );
}
