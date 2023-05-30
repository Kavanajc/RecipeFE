import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState([]);
    const [userType,userTypeupdate] = useState('');
    const [data,userLoadData]= useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/Register' || location.pathname === '/RegisterAdmin') {
            showmenuupdateupdate(false);
        } else {
                showmenuupdateupdate(true);
                let username = sessionStorage.getItem('username');
                if (username === '' || username === null) {
                    usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])

   
    useEffect(() => {
        let username = sessionStorage.getItem('username');
        fetch('https://ocrpsbe.azurewebsites.net/api/Users')
        
        .then(response => response.json())
            .then(data => {
                userLoadData(data);
                console.log(data);
                // const result = data.find((item) => item.userName === displayusername);
                let result = null;
                data.forEach((e) => {
                    if(e.userName === username){
                        console.log(e);
                        result = e
                    }
                })
                console.log(result)
                if(result){
                const usertype = result.userType;
                console.log(usertype)
                userTypeupdate(usertype);
                
                }  
                    
                
            });
            
            
            
    },[]);

    
    return (
        <nav>
            <div className="topnav">
                {showmenu &&
                    <div className="header">
                    <h3  className={`app ${userType==='User'?"user-role":""}`} style={{color:'white',flex:'1', textAlign:'center',justifyContent:'center', marginRight:'120px',marginTop:'5px'}}>Welcome, <b>{displayusername}!</b></h3>
                    
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/'}><button>Home</button></Link>&nbsp;&nbsp;
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/Veg'}><button>Veg</button></Link>&nbsp;&nbsp;
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/Non-Veg'}><button>Non-Veg</button></Link>&nbsp;&nbsp;  
                    {/* <Link className="btn btn-success" to={'/login'}><button>Login</button></Link>&nbsp;&nbsp; */}
                    {/* <Link className="btn btn-success" to={'/Register'}><button>User Registration</button></Link>&nbsp;&nbsp;             */}
                    {/* <Link className="btn btn-success" to={'/RegisterAdmin'}><button>Admin Registration</button></Link>&nbsp;&nbsp; */}
                   
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/Recipes'}><button>Recipes</button></Link>&nbsp;&nbsp;
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/MyProfile'}><button>MyProfile</button></Link>&nbsp;&nbsp;
                     <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`}to={'/AdminPage'}><button className={`admin-button ${userType==='User'?"show":""}`} disabled={userType==='User'}>AdminPage</button></Link>&nbsp;&nbsp;
                    <Link  style={{padding:'5px'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/State'}><button className={`admin-button ${userType==='User'?"show":""}`} disabled={userType==='User'}>State</button></Link>&nbsp;&nbsp; 
                    <Link style={{padding:'5px',flex:'1',textAlign:'right'}}  className={`app ${userType==='User'?"user-role":""}`} to={'/login'}><button>Logout</button></Link>&nbsp;&nbsp;
                    {/* <Link className="btn btn-success" to={'/Search'}><button>Search</button></Link>&nbsp;&nbsp;  */}
                    

                  
                
                
                    </div>
                }
            </div>
        </nav>
    );
}

export default Appheader;
