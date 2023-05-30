import React, { Component } from 'react';


export class User extends Component {
    
    constructor(props) {
        super(props);
       
        
        this.state = {
           
            User : [],
            modalTitle: "",            
            userId: 0,
            userName:"",
            password: "",
            userType: "",
            emailId: ""          

        }
    }
    
    refreshList() {
           
        let username = sessionStorage.getItem('username');
        fetch('https://ocrpsbe.azurewebsites.net/api/Users')
        
        .then(response => response.json())
            .then(data => {
               
                console.log(data);
                let result = null;
                data.forEach((e) => {
                    if(e.userName === username){
                        console.log(e);
                        result = e
                    }
                })
                this.setState({User: data})
                console.log(result)
                if(result){
                const userId = result.userId;
                console.log(userId);
                
                this.setState(userId);
                }  
                    
                
            });
            
    }

    componentDidMount() {
        this.refreshList();
    }

   
    changeUserId = (e) => {
        this.setState({ userId: e.target.value  });
    }

    changeUserName = (e) => {
        this.setState({  userName: e.target.value  });
    }

    
    changePassword = (e) => {
        this.setState({  password: e.target.value  });
    }

    
    changeEmail = (e) => {
        this.setState({  emailId: e.target.value  });
    }

   
    
    
    editClick(rep) {
        this.setState({
            modalTitle: "Edit Recipe",
            userId:rep.userId,
            userName:rep.userName,
            password:rep.password,
            userType:rep.userType,
            emailId:rep.emailId
        });
    }

  
    
    updateClick(userId) {
        fetch(`https://ocrpsbe.azurewebsites.net/api/Users/${userId}` , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

               
                userId: this.state.userId,
                userName: this.state.userName,
                password:this.state.password,
                userType: this.state.userType,
                emailId : this.state.emailId
                
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
                
            }, 
            (error) => {
                alert('Success');
            })
            this.refreshList();
    }
    

    render() {
                    const {
                        
                        User,
                        modalTitle,
                        userId,
                        userName,
                        password,
                        emailId

                    } = this.state;

                    let username = sessionStorage.getItem('username');
                    const filterItems = User.filter(item=>item.userName === username)
                
                    return (
                   

                    <div className='Page'>
                            
                        
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                     <th>
                                        User Id
                                    </th>                              
                                    <th>
                                        User Name
                                    </th>
                                    <th>
                                        Password
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='Page'>
                                {filterItems.map(res =>
                                    <tr key={res.userId}>
                                       <td>{res.userId}</td>
                                        <td>{res.userName}</td>
                                        <td>{res.password}</td>
                                        <td>{res.emailId}</td>
                                        <td>
                                            <button type="button"
                                                className="btn btn-light mr-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                onClick={() => this.editClick(res)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>

                                           
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                       
                        

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{modalTitle}</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                        ></button>
                                    </div>

                                    <div className="modal-body">
                                        <div className="d-flex flex-row bd-highlight mb-3">

                                            <div className="p-2 w-50 bd-highlight">

                                               
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">UserId</span>
                                                    <input  className="form-control"
                                                        value={userId}
                                                        onChange={this.changeUserId} />
                                                </div>
                                                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">User Name</span>
                                                    <input className="form-control"
                                                    value={userName}
                                                        onChange={this.changeUserName} />                                                     
                                                        
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Password</span>
                                                    <input type="text" className="form-control"
                                                        value={password}
                                                        onChange={this.changePassword} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Email Id</span>
                                                    <input className="form-control"
                                                    value={emailId}
                                                        onChange={this.changeEmail}/>
                                                        
                                                    
                                                </div>


                                            </div>
                                        
                                        </div>
                                       
                                        {userId !== 0 ?
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.updateClick(userId)}
                                            >Update</button>
                                            : null}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
    }
}
export default User;
