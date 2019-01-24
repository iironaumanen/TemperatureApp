import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import { Key } from './WeatherKey';
import ShowWeather from './ShowWeather';
import SelectLocation from './SelectLocation';


export default class App extends React.Component {
  state = { 
    isLoading: true, 
    temperature: 0,
    weatherType: null,
    sunsetTime: null,
    sunriseTime: null,
    currentLocation: null,
    updating: false,
    lat: 0,
    lon: 0,
    errors: false //not used currently
  };


//FIX
  _onRefresh() { //Not very DRY, but a momentary fix for refresh function. 
      this.setState({updating: true})
      fetch (`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=${Key}&units=metric`) 
      .then(data => data.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,  
          weatherType: json.weather[0].main, 
          sunsetTime: json.sys.sunset,
          sunriseTime: json.sys.sunrise,
          currentLocation: json.name,
          isLoading: false,
          updating: false
        });
        //opconsole.log("toimii");
      });
    
  }

  //Primary function to be called when updating weather
  getWeather(latitude, longitude) {
    fetch (`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${Key}&units=metric`) //using openweathermap api
      .then(data => data.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,  //take temperature from the data
          weatherType: json.weather[0].main, //take weathertype from the data
          sunsetTime: json.sys.sunset,
          sunriseTime: json.sys.sunrise,
          currentLocation: json.name,
          isLoading: false,
        });
        //console.log(json);
      });
  }

  componentDidMount() {  //fetches location
    navigator.geolocation.getCurrentPosition(
      location => {
         this.setState({lat: location.coords.latitude, lon: location.coords.longitude});
         this.getWeather(location.coords.latitude,location.coords.longitude);
        },
      errors   => { this.setState( {errors: true }); }
    );
  }


  render() {
    const { isLoading, weatherType, temperature, sunsetTime, sunriseTime, currentLocation } = this.state;
    /*return (<SelectLocation></SelectLocation>)*/   //Program doesn't support selecting location yet
    return (
      
      <View style={styles.container}>
        {isLoading ?
              (<View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Checking the weather!</Text> 
              </View>) :
              (
              <ShowWeather weather={ weatherType } temperature={ temperature } sunset={ sunsetTime } sunrise={ sunriseTime } location={ currentLocation } update={ this._onRefresh.bind(this) }>  
              </ShowWeather>)
            }
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 35
  }


});

