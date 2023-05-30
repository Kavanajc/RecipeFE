import React, { Component} from 'react';
import Search from './Search';
import Users from './User';
import { Link } from "react-router-dom";
export class MyProfile extends Component {
    
    constructor(props) {
        super(props);
       
        
        this.state = {
            Recipes : [],
            Category : [],
            State : [],
            User : [],
            modalTitle: "",

            recipeId: 0,
            description: "",
            title: "",
            ingredients: "",
            recipeSteps: "",
            serves: 0,
            recipeStatus: "",
            imageUrl: "",
            categoryId: 0,
            categoryName: "",
            userId: 0,
            userName:"",
            password: "",
            userType: "",
            emailId: "",
            stateId: 0,
            stateName: "",

            
           

        }
    }
    
    refreshList() {
            fetch(`https://ocrpsbe.azurewebsites.net/api/Recipes/search-Recipe-by-User?user=${sessionStorage.getItem('username')}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ Recipes: data});
            });

            fetch('https://ocrpsbe.azurewebsites.net/api/Categories')
            .then(response => response.json())
            .then(data => {
                this.setState({ Category: data });
            });

            fetch('https://ocrpsbe.azurewebsites.net/api/States')
            .then(response => response.json())
            .then(data => {
                this.setState({ State: data });
            });

            fetch('https://ocrpsbe.azurewebsites.net/api/Users')
            .then(response => response.json())
            .then(data => {
                this.setState({ User: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    // changeRecipeId = (e) => {
    //     this.setState({ recipe_Id: e.target.value });
    // }

    changeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    changeTitle = (e) => {
        this.setState({  title: e.target.value });
    }
    changeIngredients = (e) => {
        this.setState({  ingredients: e.target.value });
    }
    changeRecipeSteps = (e) => {
        this.setState({ recipeSteps: e.target.value  });
    }
    changeServes = (e) => {
        this.setState({  serves: e.target.value });
    }
    changeRecipeStatus = (e) => {
        this.setState({  recipeStatus: e.target.value });
    }
    changeImageURL = (e) => {
        this.setState({  imageUrl: e.target.value });
    }
    changeCategoryId = (e) => {
        this.setState({ categoryId: e.target.value  });
    }

    changeCategoryName = (e) => {
        this.setState({ categoryName: e.target.value  });
    }

    changeUserId = (e) => {
        this.setState({ userId: e.target.value  });
    }

    changeUserName = (e) => {
        this.setState({  userName: e.target.value  });
    }

    changeStateId = (e) => {
        this.setState({ stateId: e.target.value  });
    }
    changeStateName = (e) => {
        this.setState({ stateName: e.target.value  });
    }
    
    addClick() {
        this.setState({
            modalTitle: "Add Recipe",
            recipeId: 0,
            description: "",
            title: "",
            ingredients: "",
            recipeSteps: "",
            serves: 0,
            recipeStatus: "",
            imageUrl: "",
            categoryId: 0,
            categoryName: "",
            userId: 0,
            userName: "",
            password: "",
            userType: "",
            emailId: "",
            stateId: 0,
            stateName: ""
        });
    }
    editClick(rep) {
        this.setState({
            modalTitle: "Edit Recipe",
            recipeId: rep.recipeId,
            description: rep.description,
            title: rep.title,
            ingredients: rep.ingredients,
            recipeSteps: rep.recipeSteps,
            serves: rep.serves,
            recipeStatus: rep.recipeStatus,
            imageUrl:rep.imageUrl,
            categoryId:rep.categoryId,
            categoryName:rep.categoryName,
            userId:rep.userId,
            userName:rep.userName,
            password:rep.password,
            userType:rep.userType,
            emailId:rep.emailId,
            stateId:rep.stateId,
            stateName:rep.stateName
        });
    }

    createClick() {
        fetch('https://ocrpsbe.azurewebsites.net/api/Recipes/Add-Recipe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                description: this.state.description,
                title: this.state.title,
                ingredients:this.state.ingredients,
                recipeSteps: this.state.recipeSteps,
                serves: this.state.serves,
                recipeStatus: "Pending",
                imageUrl: this.state.imageUrl,
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName,
                userId: this.state.userId,
                userName: this.state.userName,
                password: this.state.password,
                userType: this.state.userType,
                stateId: this.state.stateId,
                stateName: this.state.stateName
            
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    
    updateClick(id) {
        fetch(`https://ocrpsbe.azurewebsites.net/api/Recipes/${id}` , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                recipeId: this.state.recipeId,
                description: this.state.description,
                title: this.state.title,
                ingredients:this.state.ingredients,
                recipeSteps:this.state.recipeSteps,
                serves: this.state.serves,
                recipeStatus: this.state.recipeStatus,
                imageUrl: this.state.imageUrl,
                categoryId: this.state.categoryId,
                categoryName: this.state.categoryName,
                userId: this.state.userId,
                userName: this.state.userName,
                password:this.state.password,
                userType: this.state.userType,
                emailId : this.state.emailId,
                stateId: this.state.stateId,
                stateName: this.state.stateName
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
            
    }
    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch('https://ocrpsbe.azurewebsites.net/api/Recipes/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Success');
                })
        }
    }

    render() {
                    const {
                        
                        Category,
                        State,
                        Recipes,
                        User,
                        modalTitle,
                        recipeId,
                        description,
                        title,
                        ingredients,
                        recipeSteps,
                        serves,
                        recipeStatus,
                        imageUrl,
                        categoryId,
                        categoryName,
                        userId,
                        userName,
                        stateId,
                        stateName
                    } = this.state;
                    let username = sessionStorage.getItem('username');
                    const filterItems = User.filter(item=>item.userName===username)
                    return (
                   
                    
                      
                   
                    <div className="login-containers" style={{margin:'0px 100px 200px 100px'}}>
                      
                        <button type="button"
                           className='Addbtn'
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => this.addClick()}>
                            Add Recipe
                        </button>
                     

                        {Recipes.length>0 ? (
                        <table className="table table-striped" style={{fontSize:'x-small',fontWeight:'bold'}}>
                            <thead>
                                <tr>
                                    {/* <th>
                                        RecipeId
                                    </th> */}
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        Ingredients
                                    </th>
                                    <th>
                                        Recipe Steps
                                    </th>
                                    <th>
                                        Serves
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Image 
                                    </th>
                                    <th>
                                        Category
                                    </th>
                                    <th>
                                        User
                                    </th>
                                    <th>
                                        State 
                                    </th>
                                    <th>
                                        Options
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='Table'>
                                {Recipes.map(res =>
                                    <tr key={res.recipeId}>
                                        {/* <td>{res.recipeId}</td> */}
                                        <td>{res.title}</td>
                                        <td>{res.description}</td>
                                        <td>{res.ingredients}</td>
                                        <td>{res.recipeSteps}</td>
                                        <td>{res.serves}</td>
                                        <td>{res.recipeStatus}</td>
                                        <td><img width="100px" height="100px" src={res.imageUrl}/></td>
                                        <td>{res.categoryName}</td>
                                        <td>{res.userName}</td>
                                        <td>{res.stateName}</td>
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

                                            <button type="button"
                                                className="btn btn-light mr-1"
                                                onClick={() => this.deleteClick(res.recipeId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </button>
                                           
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        ):( 
                            <p className='no-record'>NO RECIPES FOUND</p>
                        )}
                            
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

                                            {/* <div className="input-group mb-3">
                                                    <span className="input-group-text">RecipeId</span>
                                                    <input type="text" className="form-control"
                                                        value={recipe_Id}
                                                        onChange={this.changeRecipeId} />
                                                </div> */}

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Title</span>
                                                    <input type="text" className="form-control"
                                                        value={title}
                                                        onChange={this.changeTitle} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Description</span>
                                                    <input type="text" className="form-control"
                                                        value={description}
                                                        onChange={this.changeDescription} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Ingredients</span>
                                                    <input type="text" className="form-control"
                                                        value={ingredients}
                                                        onChange={this.changeIngredients} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Recipe Steps</span>
                                                    <input type="text" className="form-control"
                                                        value={recipeSteps}
                                                        onChange={this.changeRecipeSteps} />
                                                </div>

                                                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Serves</span>
                                                    <input type="text" className="form-control"
                                                        value={serves}
                                                        onChange={this.changeServes} />
                                                </div>

                                                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Recipe Status</span>
                                                    <input type="text" className="form-control"
                                                        value={recipeStatus}
                                                        onChange={this.changeRecipeStatus} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Image URL</span>
                                                    <input type="text" className="form-control"
                                                        value={imageUrl}
                                                        onChange={this.changeImageURL} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">CategoryId</span>
                                                    <input type="text" className="form-control"
                                                        value={categoryId}
                                                        onChange={this.changeCategoryId} />
                                                </div>

                                            


                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">Category</span>
                                                    <select className="form-select"
                                                        onChange={this.changeCategoryName}
                                                        value={categoryName}>
                                                        {Category.map(dep =>
                                                            <option key={dep.categoryId}>
                                                                {dep.categoryName}
                                                            </option>)}
                                                    </select>
                                                </div>
                                               
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">UserId</span>
                                                    <input  className="form-control"
                                                        value={userId}
                                                        onChange={this.changeUserId} />
                                                </div>
                                                
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">User Detail</span>
                                                    <select className="form-select"
                                                        onChange={this.changeUserName}
                                                        value={userName}>
                                                        {filterItems.map(dep =>
                                                            <option key={dep.userId}>
                                                                userId :  {dep.userId} ||  userName :  {dep.userName}
                                                                
                                                            </option>)}
                                                    </select>
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">StateId</span>
                                                    <input type="text" className="form-control"
                                                        value={stateId}
                                                        onChange={this.changeStateId} />
                                                </div>

                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">State</span>
                                                    <select className="form-select"
                                                        onChange={this.changeStateName}
                                                        value={stateName}>
                                                        {State.map(dep =>
                                                            <option key={dep.stateId}>
                                                                {dep.stateName}
                                                            </option>)}
                                                    </select>
                                                </div>


                                            </div>
                                        
                                        </div>

                                        {recipeId === 0 ?
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.createClick()}
                                            >Create</button>
                                            : null}

                                        {recipeId !== 0 ?
                                            <button type="button"
                                                className="btn btn-primary float-start"
                                                onClick={() => this.updateClick(recipeId)}
                                            >Update</button>
                                            : null}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <p className='para'>Edit Profile!</p>
                        <Link  style={{padding:'5px', width:'100px', justifyContent:'centre'}}  className="btn btn-success" to={'/User'}>User</Link>&nbsp;&nbsp;
                    </div>

                    
                )
                
    }
}
export default MyProfile;
