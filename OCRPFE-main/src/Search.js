import React, { useState } from "react"

const Search = () => {
  const [users, setUsers] = useState([])

  const fetchData = e => {
    const query = e.target.value
    fetch(`https://ocrpsbe.azurewebsites.net/api/Recipes/search-By_State?StateName=${query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  return (
    <div className="Page">
      <input className="Search" placeholder="Search State"
      onChange={fetchData} label="Search State" />
      {users.length>0 ? (
      <table className="table table-striped">
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
                    <tbody className="Table">
                    
                     
                         {users.map(emp => (
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
                                                           
                                ))}                  
                           
                          
                    
                    </tbody>
                </table> 
                 ):( 
                    <p></p>
                )}                                                                                                 
 
    </div>
  )
}

export default Search;
