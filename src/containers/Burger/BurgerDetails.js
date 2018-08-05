import React, { Component } from 'react';
import '../Burgers/Burgers.css';

import axios from '../../axios';

class BurgerDetails extends Component {
    componentWillMount() {
    }
    componentDidMount() {
        this.setState({ loading: true });
        const burgerId = this.props.match.params.id;
        axios.get("/burgers/" + burgerId + ".json")
            .then(response => {           
                const data = response.data;
                const burger = {
                    ...data,
                    id: burgerId
                }
                this.setState({ burger, loading: false });
            })
            .catch(error => console.log(error));
        // axios.get("/burgers.json")
        //     .then(response => {
        //         const burgerId = this.props.match.params.id;
        //         const data = response.data;
        //         const burgers = Object.keys(data).map(key => {
        //             return data[key];
        //         });
        //         const burger = burgers.filter(bur => {
        //             return bur.id === burgerId;
        //         });
        //         this.setState({ burger: burger[0], loading: false });
        //     })
        //     .catch(error => console.log(error));
    }

    handleEditBurger = (burgerId) => {
        this.props.history.push(this.props.location.pathname + "/edit");
    }

    handleDeleteBurger = (burgerId) => {
        console.log("handleDeleteBurger");
        axios.delete("/burgers/" + burgerId + ".json")
            .then(response => {
                this.props.history.goBack();
            })
            .catch(error => console.log(error));
    }

    render() {
        let burgerEl = <p>Loading</p>
        if(this.state.burger) {
            burgerEl = (
                <div
                    className="BurgerItem"
                    key={this.state.burger.id}>
                    <div>
                        <button 
                            onClick={ (burgerId) => this.handleEditBurger(this.state.burger.id) } 
                            >редагувати
                        </button>
                        <button
                            onClick={ (burgerId) => this.handleDeleteBurger(this.state.burger.id) }
                            >видалити
                        </button>
                    </div>
                    <div >
                        <span className="BurgerItemName">{this.state.burger.name}</span>
                    </div>
                    <div>
                        <p className="BurgerItemIngredients">
                            {this.state.burger.ingredients.reduce((accum, curValue, index, array) => {
                                let endChar = (index === array.length-1) ? "" : ", ";
                                return accum + curValue.name + endChar;
                            }, "")}
                        </p>
                    </div>
                    <div className="BurgerItemPrice">
                        <span>{this.state.burger.price} грн</span>
                    </div>
                </div>
            )
        }

        return (
            <div>
               {burgerEl}
            </div>
        );
    }

    state = {
        burger: null,
        loading: false
    };
}

export default BurgerDetails;