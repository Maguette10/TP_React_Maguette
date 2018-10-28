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
  
  removeRestaurants(restaurant) {
	const oldRestaurants = this.state.restaurants.filter(
      (elem, index) => {

        return (elem !== restaurant) ? elem : null;
      }
    );	
		
		this.setState({
			restaurants: oldRestaurants
		});
	}
  getDataFromServer() {
    console.log("--- GETTING DATA ---");
     fetch('http://localhost:8080/api/restaurants')
     .then(response => {
       return response.json() // transforme le json texte en objet js
     })
     .then(data => { // data c'est le texte json de response ci-dessus
       let restaurants = [];
       data.forEach((el) => {
    
         restaurants.push(el.addRestaurants);
       });

       this.setState({
        restaurants: restaurants
      });
       
     }).catch(err => {
       console.log("erreur dans le get : " + err)
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
				this.state.restaurants.map((el) => {
				return <Restaurant restaurant={el} key={el} removeRestaurants={this.removeRestaurants.bind(this)}/>
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
        <ul>
          {listAvecComponent}
        </ul>
      </div>
    );
  }
}

export default App;