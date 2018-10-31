import React, { Component } from 'react';

import './App.css';
import Restaurant from './components/Restaurant';

class App extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      restaurants:[],
      newName: '',
      newCuisine: ''
    }
    this.update = this.update.bind(this);
  }
	update(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    });
  }


  addRestaurants() {
    let oldRestaurants = this.state.restaurants;
    let newRestaurant = {
      name : this.state.newName,
      cuisine : this.state.newCuisine
    }
		this.setState({
      restaurants: oldRestaurants.concat(newRestaurant),
    });
    let inputs = document.getElementsByTagName("input");
    for(var item of inputs){
      item.value="";
    }
  }
  
  // removeRestaurants(restaurant) {
	// const oldRestaurants = this.state.restaurants.filter(
  //     (elem, index) => {

  //       return (elem !== restaurant) ? elem : null;
  //     }
  //   );	
		
	// 	this.setState({
	// 		restaurants: oldRestaurants
	// 	});
	// }
  getDataFromServer() {
    console.log("--- GETTING DATA ---");
     fetch('http://localhost:8080/api/restaurants')
     .then(response => {
       return response.json() // transforme le json texte en objet js
     })
     .then(response => { // data c'est le texte json de response ci-dessus
      console.log(response.data);
       this.setState({
        restaurants: response.data
      });
       
     }).catch(err => {
       console.log("erreur dans le get : " + err)
     });

  }

  removeRestaurant = (id,index) => {
    let url = "http://localhost:8080/api/restaurants/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then((responseJSON) => {
      this.getDataFromServer();
    })
    .catch(function (err) {
        console.log(err);
    });
}

  componentWillMount() {
    console.log("Component will mount");
    // on va chercher des donnees sur le Web avec fetch, comme
    // on a fait avec VueJS
    this.getDataFromServer();
  }
  
  render() {
    console.log("render");
    let listAvecComponent = 
				this.state.restaurants.map((el, index) => {
				return <Restaurant key={index} restaurant={el} onRemove={() => this.removeRestaurant(el._id, index)}/>
        //return <li onClick={() => this.removeRestaurants(el)} key={el}>{el}</li>
			}
    );
    
    return (
      <div className="App">
        <h3>Liste des restaurants :</h3>
        {/* <form id = "newResto"> */}
          <output type="text" value="nom"/>
          <input type="text" name="newName" onChange={this.update}/>
          <output type="text" value="cuisine"/>
          <input type="text" name="newCuisine" onChange={this.update}/>
          <button onClick={() => this.addRestaurants()}>Add Restaurant</button>
        {/* </form> */}
        <p style={{color: (this.state.restaurants.length < 5) ? 'green' : 'red'}}>
            Nombre de restaurants : {this.state.restaurants.length}
        </p>
        <table className="table">
        <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Cuisine</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
        <tbody>
            {listAvecComponent}
        </tbody>
          
        </table>
      </div>
    );
  }
}

export default App;
