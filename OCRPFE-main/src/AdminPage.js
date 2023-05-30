import { Button } from 'bootstrap';
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import Recipes from './Recipes';

export class AdminPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
            Recipes: [],
            modalTitle: "",
            recipeId: "",
            title: "",
            description: "",
            ingredients: "",
            recipeSteps: "",
            serves: "",
            recipeStatus: "Pending",
            imageUrl: "",
            categoryName: "",
            stateName: "",
            userName: ""
            

        };
       
       
    }

    refreshList() {

        fetch('https://ocrpsbe.azurewebsites.net/api/Recipes/Pending')
            .then(response => response.json())
            .then(data => {
                this.setState({ Recipes: data });
            });


    }

    componentDidMount() {
        this.refreshList();
    }

  

    handleApprove(Id){
        
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipeStatus: "Approved" })
          };
          fetch(`https://ocrpsbe.azurewebsites.net/api/Recipes/search-Recipe-by-Status?id=${Id}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ recipeStatus: data.recipeStatus }));
            this.refreshList();
      }

      handleReject(Id) {
        
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipeStatus: "Rejected" })
        };
        fetch(`https://ocrpsbe.azurewebsites.net/api/Recipes/search-Recipe-by-Status?id=${Id}`, requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ recipeStatus: data.recipeStatus }));
          this.refreshList();
      }
    

    render() {
        const {
            Recipes,
            recipeStatus,
            recipeId
            
        } = this.state;
        
     
        return (
            <div className="login-containers" style={{margin:'0px 100px 230px 100px'}}>
                <Link  className="btn" to={'/RegisterAdmin'}><button>Admin Registration</button></Link>&nbsp;&nbsp;
                {Recipes.length>0 ? (

                <table className="table table-striped" style={{fontSize:'x-small',fontWeight:'bold'}}>
                    <thead>
                        <tr>
                            {/* <th>
                                 Recipe Id
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
                                Image Url
                            </th>
                            <th>
                                Category 
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                User 
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className='Table'>
                        
                       
                      
                            {
                            Recipes.map(emp =>
                                <tr key={emp.recipeId}>
                                    {/* <td>{emp.recipeId}</td> */}
                                    <td>{emp.title}</td>
                                    <td>{emp.description}</td>
                                    <td>{emp.ingredients}</td>
                                    <td>{emp.recipeSteps}</td>
                                    <td>{emp.serves}</td>
                                    <td>{emp.recipeStatus}</td>
                                    <td><img width="100px" height="100px" src={emp.imageUrl}/></td>
                                    <td>{emp.categoryName}</td>
                                    <td>{emp.stateName}</td>
                                    <td>{emp.userName}</td>          
                                <td><button onClick={() => this.handleApprove(emp.recipeId)}>Approve</button></td>
                                <td><button onClick={() => this.handleReject(emp.recipeId)}>Reject</button></td>
                            </tr>
                        
                        )}
                        </tbody>
                </table>
                ):( 
                    <p className='no-record'>NO RECIPES FOUND</p>
                )}
             </div>
                             
        );
    }   
       
 }
 export default AdminPage;
