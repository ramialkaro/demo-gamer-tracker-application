import React from 'react';
import {HTTP} from './http';

export default class GameList extends React.Component{
    constructor(props){
        super(props);
        this.state={games:[],game:{id:0,gameName:"",consoleType:"",image:"",price:""}};
    }

    

    componentDidMount(){
        HTTP.get("/api/game").then(games => this.setState({games}));
    }
        textChanged(ev){
            this.state.game[ev.target.id]=ev.target.value;
            this.forceUpdate();
        }
    render(){
        console.log(this.state.games);

        const handleChange = event => {
            HTTP.get("/api/game/"+event.target.value).then(game => this.setState({game}));
            console.log(event.target.value);
          };



        let rows=this.state.games.map(o => <option key={o.id} value={o.id} >{o.gameName}</option>)

// to show data in the input field...     

        return (
            <div>
            <h2>My Own Games</h2>
                <select className="shadow-lg p-2 mb-5 bg-white rounded w-100"  onChange={handleChange}>
                    {rows}
                </select>

                <form className="container-fluid">

                    <div className="form-group">

                        <label htmlFor="gameName" 
                                className="col-sm-2 col-form-label">Game Name</label>
                        <input  type="text" 
                                className="form.control col-sm-10 " 
                                placeholder="game name" 
                                id="gameName"  
                                onChange={ev => this.textChanged(ev)} 
                                value={this.state.game.gameName}                             
                                />
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="consoleType" 
                                    className="col-sm-4 col-form-label">Console</label>
                            <input  type="text" 
                                    className=" col-sm-8 w-100" 
                                    placeholder="console type" 
                                    id="consoleType"
                                    onChange={ev => this.textChanged(ev)}
                                    value={this.state.game.consoleType}
                                    />
                        </div>

                        <div className="col">
                            <label htmlFor="price" 
                                    className="col-sm-3 col-form-label">Price</label>
                            <input  type="number" 
                                    className="col-sm-4 " 
                                    placeholder="price" 
                                    id="price"
                                    onChange={ev => this.textChanged(ev)}
                                    value={this.state.game.price}
                                    />
                        </div>
                                
                    </div>
                                           
                    <div className="row mt-3 text-center">
                           <label htmlFor="image" className="col-sm-3 ">Image</label>
                           <input id="image" value={this.state.game.image} className="col-sm-8 w-100"/>
                           
                              <img src={this.state.game.image} className="rounded w-50 mt-5 col-md-6"/>
                           
                        </div>



                    <div className="row mt-5 justify-content-center">
                    <button type="submit" 
                            className="col-sm-2 m-3 btn btn-primary btn-lg">Create</button>
                    <button type="submit" 
                            className="col-sm-2 m-3 btn btn-info btn-lg">Save</button>
                    <button type="button" 
                            className="col-sm-2 m-3 btn btn-danger btn-lg">Delete</button>
                    </div>


                </form>
                
        </div>
        )
    }
}
