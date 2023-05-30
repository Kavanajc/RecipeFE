import React, { Component } from 'react';

export class Veg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            veg: [],
            modalTitle: "",
            recipeId: "",
            title: "",
            description: "",
            ingredients: "",
            recipeSteps: "",
            serves: "",
            recipeStatus: "",
            imageUrl: "",
            categoryName: "",
            stateName: "",
            userName: ""

        }
    }

    refreshList() {

        fetch('https://ocrpsbe.azurewebsites.net/api/Recipes/search-Recipe-By_Veg?CategoryName=Veg')
            .then(response => response.json())
            .then(data => {
                this.setState({ veg: data });
            });


    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            veg,
          
        } = this.state;
        return (
            <div className="login-containers" style={{margin:'0px 100px 100px 100px'}}>
                
                <table className="table table-striped"style={{fontSize:'x-small',fontWeight:'bold'}}>
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

                        {veg.map(emp =>
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
                                
                            </tr>
                        )}
                    </tbody>
                </table>
             </div>
                             
        )
    }   
                      
 }
 export default Veg;
