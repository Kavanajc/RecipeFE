import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";


const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const usenavigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={"username": username,
            "password": password};
            fetch("https://ocrpsbe.azurewebsites.net/api/Authenticate/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (resp.title === 'Unauthorized'|| resp.status === 401) {
                    alert('Login failed, invalid credentials');
                   
                  
                }else{
                     toast.success('Success');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                }
               
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    return (
        <div className="login-container" style={{justifyContent:'center', color:'black'}}>
            <div  style={{ margin: '170px 100px 170px 100px'  }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div >
                        <div style={{marginRight:'0px' }}>
                            <h2>User Login</h2>
                        </div>
                        <div style={{justifyContent:'center', display:'flex',flexWrap:'wrap', width:'200px',position:'relative',textAlign:'center',marginLeft:'425px'}}>
                            <div className="form-group" >
                                <label>User Name <span className="errmsg"></span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg"></span></label>
                                <input type={showPassword?'text':'password'} value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                                <label style={{fontSize:'15px'}}><input type="checkbox" checked={showPassword} onChange={togglePasswordVisibility}></input>Show Password</label>
                            </div>
                        </div>
                        <div style={{ justifyContent:'center', marginTop:'5px'}}>
                            <button type="submit"   className="btn btn-primary" style={{backgroundColor:'orange'}}>Login</button>
                            <br></br>
                          
                            <Link style={{padding:'0px'}} className="btn btn-success" to={'/Register'}><button className="btn btn-primary" style={{backgroundColor:'orange'}}>User SignUp</button></Link>        
                            {/* <Link className="btn btn-success" to={'/RegisterAdmin'}><button>Admin SignUp</button></Link>&nbsp;&nbsp;  */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
