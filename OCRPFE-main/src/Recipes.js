import React, { Component } from 'react';
import CommentSection from './CommentSection';
import Search from './Search';

export class Recipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Recipes: [],
            State: [],
            modalTitle: "",
            recipe_Id: "",
            title: "",
            description: "",
            ingredients: "",
            recipe_steps: "",
            serves: "",
            recipe_status: "",
            image_Url: "",
            categoryName: "",
            stateName: "",
            userName: "",
            
        }
    }

    refreshList() {

        fetch('https://ocrpsbe.azurewebsites.net/api/Recipes')
            .then(response => response.json())
            .then(data => {
                this.setState({ Recipes: data });
            });

            fetch('https://ocrpsbe.azurewebsites.net/api/States')
            .then(response => response.json())
            .then(data => {
                this.setState({ State: data });
            });
            
    }

    componentDidMount() {
        this.refreshList();
       
    }

    
    render() {
        const {
            Recipes,
            State,
            
            
            
        } = this.state;

        

        return (
            <div className="login-containers">
                <Search/>
                <table className="table table-striped" style={{fontSize:'x-small',fontWeight:'bold'}}>
                    <thead>
                        <tr>
                            {/* <th>
                                 Id
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
                            <th>
                                Feedback
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody className='Table'>

                        {Recipes.map(emp =>
                            <tr key={emp.recipe_Id}>
                                {/* <td>{emp.recipe_Id}</td> */}
                                <td>{emp.title}</td>
                                <td>{emp.description}</td>
                                <td>{emp.ingredients}</td>
                                <td>{emp.recipe_steps}</td>
                                <td>{emp.serves}</td>
                                <td>{emp.recipe_status}</td>
                                <td><img width="100px" height="100px" src={emp.image_Url}/></td>
                                <td>{emp.categoryName}</td>
                                <td>{emp.stateName}</td>
                                <td>{emp.userName}</td> 
                                <td><CommentSection recipeId={emp.recipe_Id} /></td>                      
                             
                            </tr>
                        )}
                    </tbody>
                </table>
               
             </div>
                             
        )
    }   
       
 }
 export default Recipes;
