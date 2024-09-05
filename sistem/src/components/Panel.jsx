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
import './table.css'
import {  toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Panel() {
    const [isAdd,setisAdd] = useState(false)
    const [isEdit,setisEdit] = useState(false)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const [data] = useState([])
    const [isLogin,setisLogin] = useState(false)
    const [isEditorRequest] = useState(false)
    const [passwordtype,setpasswordtype] = useState(false)
    const [rows,setRows] = useState([])
    const RootUrl = "http://localhost:5000"
    let returnRegister;

    useEffect(() => {
        axios.get(`${RootUrl}/workers`)
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
    const [formData, setFormData] = useState({
        id:'',
        NameSurname:'',
        Position:'',
        Age:'',
        Experince:'',
        Salary:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const notifySuccess = () => {
        toast.success("Isdifadəçi əlavə edildi!");
    };   
    const handleSubmit = (e) => {
        e.preventDefault();

        const encryptedObject1 = CryptoJS.AES.encrypt(JSON.stringify(formData.NameSurname), 'sifre').toString();
        const encryptedObject2 = CryptoJS.AES.encrypt(JSON.stringify(formData.Position), 'sifre').toString();
        const encryptedObject3 = CryptoJS.AES.encrypt(JSON.stringify(formData.Age), 'sifre').toString();
        const encryptedObject4 = CryptoJS.AES.encrypt(JSON.stringify(formData.Experince), 'sifre').toString();
        const encryptedObject5 = CryptoJS.AES.encrypt(JSON.stringify(formData.Salary), 'sifre').toString();


        if(e.target.NameSurname.value !== "" && e.target.Position.value !== "" && e.target.Age.value !== "" && e.target.Experince.value !== "" && e.target.Salary.value !== ""){
                data.forEach(element=>{
                    if(JSON.stringify(formData.NameSurname) === decode(element.NameSurname && JSON.stringify(formData.Position) === decode(element.Position && JSON.stringify(formData.Age) === decode(element.Age && JSON.stringify(formData.Experince) === decode(element.Experince && JSON.stringify(formData.Salary) === decode(element.Salary)))))){
                        toast.error("Bu istifadəçi artıq daxil edilib!")
                        returnRegister = true
                    }   
                    else{
                        returnRegister = false
                    }
                })
                if(!returnRegister){
                    axios.post(`${RootUrl}/workers`,{
                        NameSurname:encryptedObject1,
                        Position:encryptedObject2,
                        Age:encryptedObject3,
                        Experince:encryptedObject4,
                        Salary:encryptedObject5,
                    })
                    setisLogin(true)
                    notifySuccess()
                    setRows(prevRows => [...prevRows, {
                        NameSurname:encryptedObject1,
                        Position:encryptedObject2,
                        Age:encryptedObject3,
                        Experince:encryptedObject4,
                        Salary:encryptedObject5,
                    }]);
                    setTimeout(window.location.reload(),7000);
                }
        }
        else{
            toast.error("Xanaları doldurun!")
        }
    }; 
    const handleSubmitEdit = (e) => {
        e.preventDefault();

        const encryptedObject1 = CryptoJS.AES.encrypt(JSON.stringify(formData.NameSurname), 'sifre').toString();
        const encryptedObject2 = CryptoJS.AES.encrypt(JSON.stringify(formData.Position), 'sifre').toString();
        const encryptedObject3 = CryptoJS.AES.encrypt(JSON.stringify(formData.Age), 'sifre').toString();
        const encryptedObject4 = CryptoJS.AES.encrypt(JSON.stringify(formData.Experince), 'sifre').toString();
        const encryptedObject5 = CryptoJS.AES.encrypt(JSON.stringify(formData.Salary), 'sifre').toString();

        if(e.target.NameSurname.value !== "" && e.target.Position.value !== "" && e.target.Age.value !== "" && e.target.Experince.value !== "" && e.target.Salary.value !== ""){
            axios.put(`${RootUrl}/workers/${formData.id}`,{
                NameSurname:encryptedObject1,
                Position:encryptedObject2,
                Age:encryptedObject3,
                Experince:encryptedObject4,
                Salary:encryptedObject5,
            })
            notifySuccess()
            setRows(prevRows => [...prevRows, {
                NameSurname:encryptedObject1,
                Position:encryptedObject2,
                Age:encryptedObject3,
                Experince:encryptedObject4,
                Salary:encryptedObject5,
            }]);
            setTimeout(window.location.reload(),7000);
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
    const handleEdit = (id,NameSurname,Position,Age,Experince,Salary) => {
        setFormData({
            id:id,
            NameSurname:decode(NameSurname),
            Position:decode(Position),
            Age:decode(Age),
            Experince:decode(Experince),
            Salary:decode(Salary)
        })
        if(isEdit){
            setisEdit(false)
        }
        else if(!isEdit){
            setisEdit(true)
        }
    }
    const handleDelete = (index) => {
        axios.delete(`${RootUrl}/workers/${index}`)
        setRows(rows.filter(x => x._id !== index))
    }

  return (
    <>
    <div className="appbar">
        <h1>Işçi idarəetmə paneli</h1>
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
                        <TableCell align="left">Vəzifə</TableCell>
                        <TableCell align="left">Yaş</TableCell>
                        <TableCell align="left">Təcrübəsi</TableCell>
                        <TableCell>Maaş</TableCell>
                        <TableCell>Function</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell component="th" scope="row">
                                {decode(row.NameSurname)}
                            </TableCell>
                            <TableCell align="left">
                                {decode(row.Position)}
                            </TableCell>
                            <TableCell align="left">{decode(row.Age)}</TableCell>
                            <TableCell align="left">{decode(row.Experince)}</TableCell>
                            <TableCell align="left">{decode(row.Salary)}</TableCell>
                            <TableCell>
                                <EditIcon onClick={() => handleEdit(row._id,row.NameSurname,row.Position,row.Age,row.Experince,row.Salary)} className='eye'/>
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
                            placeholder="Ad Soyad" 
                            name="NameSurname" 
                            value={formData.NameSurname} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Vəzifə" 
                            name="Position" 
                            value={formData.Position} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Yaş" 
                            name="Age" 
                            value={formData.Age} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Təcrübə" 
                            name="Experince" 
                            value={formData.Experince} 
                            onChange={handleChange} 
                        />    
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Maaşı" 
                            name="Salary" 
                            value={formData.Salary} 
                            onChange={handleChange} 
                        />
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
                            placeholder="Ad Soyad" 
                            name="NameSurname" 
                            value={formData.NameSurname} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Vəzifə" 
                            name="Position" 
                            value={formData.Position} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Yaş" 
                            name="Age" 
                            value={formData.Age} 
                            onChange={handleChange} 
                        />
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Təcrübə" 
                            name="Experince" 
                            value={formData.Experince} 
                            onChange={handleChange} 
                        />    
                    </TableCell>
                    <TableCell>
                        <input 
                            className='register_textemailpassword'
                            type="text" 
                            placeholder="Maaşı" 
                            name="Salary" 
                            value={formData.Salary} 
                            onChange={handleChange} 
                        />
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
