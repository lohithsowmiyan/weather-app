
import './App.css';
import React,{Component} from 'react';

const API={
   key:"a6e864b117add2c7a398c3df9b8392f0",
   base:'https://api.openweathermap.org/data/2.5/'
  };

const d=new Date();

class Weather extends Component{
  constructor(props){
    super(props);

    this.state={
      city:null,
      temp: null,
      type: null,
    };

    this.searchWeather = this.searchWeather.bind(this)

    
  }

  updateCity(newcity){
    this.setState( { city:newcity});
    console.log(this.state.city);
  }

  searchWeather(){
   fetch(`${API.base}weather?q=${this.state.city}&units=metric&APPID=${API.key}`)
    .then(res => res.json())
    .then(result => {
       try{ 
        this.setTemperature(result);
        this.setWeather(result);
        console.log(result.temp.main);
       }
       catch(err){
         
       }
    })
  }
  setTemperature(result){
    this.setState({temp: result.main.temp });
  }

  setWeather(result){
    this.setState({type: result.weather[0].main});
  }

  render(){
    return(

      <div className={ (this.state.temp > 15 ) ? 'background-clear' : 'background-winter'}>
      < div className='app-body'>
           <input type="text" placeholder="Eg: New York" className="search-bar"
           onChange={e => this.updateCity(e.target.value)} ></input>
           <button className='btn' onClick={this.searchWeather()}>SEARCH</button>
           <div className='city'>
             <p>{this.state.city}</p>
           </div>
           <div className='date'>
             <p>{d.getDate() +"/"  +d.getMonth() +"/"  + d.getFullYear()}</p>
           </div>
           <div className='temp-box'>
              <p className='temp'>{this.state.temp}°c </p>
           </div>
           <div className='temp-type'>
              <p>{this.state.type}</p>
           </div>
        </div>
      </div>
    );
  }
 
}

export class App extends Component{
  render(){
    return(
      
       <div>
        <Weather></Weather>
        
      </div>
    );
  }
}


export default App;
