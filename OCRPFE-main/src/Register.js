import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    
    const [username, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = ()=>{
        setShowPassword(!showPassword);
    }

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (username === null || username === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { username, password, email };
            if (IsValidate()) {
            //console.log(regobj);
            fetch("https://ocrpsbe.azurewebsites.net/api/Authenticate/register", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                alert('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                alert('Failed :' + err.message);
            });
        }
    }
    return (
        <div className="login-container" style={{color:'black',justifyContent:'center'}} >
            <div style={{ margin: '100px 100px 110px 100px'  }}>
                <form className="container" onSubmit={handlesubmit}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{justifyContent:'center', display:'flex',flexWrap:'wrap', width:'300px',textAlign:'center',marginLeft:'450px'}}>
                        <div >
                            <h1>User Registeration</h1>
                        </div>
                        <div >

                            <div >
                                <div >
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={username} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div >
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} type={showPassword?'text':'password'} className="form-control"></input>
                                        <label style={{fontSize:'15px'}}><input type="checkbox" checked={showPassword} onChange={togglePasswordVisibility}></input>Show Password</label>
                                    </div>
                                </div>
                                
                                <div >
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                
                                
                                
                                

                            </div>

                        </div>
                        <div style={{marginTop:'5px'}}>
                            <button type="submit" className="btn btn-primary">Register</button> | <Link to={'/login'}><button className="btn btn-primary">Close</button></Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;
