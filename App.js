import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Key } from './WeatherKey';
import ShowWeather from './ShowWeather';
import SelectLocation from './SelectLocation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class App extends React.Component {
  state = { 
    isLoading: true, 
    temperature: 0,
    weatherType: null,
    sunsetTime: null,
    sunriseTime: null,
    currentLocation: null,
    updating: false,
    errors: false //not used currently
  };



  onSwipeDown(gestureState) {
    this.setState({updating: true})
    this.componentDidMount
  }

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
          updating: false
        });
        console.log(json);
      });
  }

  componentDidMount() {  //fetches location
    navigator.geolocation.getCurrentPosition(
      location => { this.getWeather(location.coords.latitude,location.coords.longitude); },
      errors   => { this.setState( {errors: true }); }
    );
  }


  render() {
    const { isLoading, weatherType, temperature, sunsetTime, sunriseTime, currentLocation } = this.state;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    /*return (<SelectLocation></SelectLocation>)*/
    return (
      <GestureRecognizer onSwipeDown={ (state) => this.onSwipeDown(state)} config={config} style={{flex: 1}}></GestureRecognizer>
      <View style={styles.container}>
          {isLoading ?
            (<View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Checking the weather!</Text> 
            </View>) :
            (<ShowWeather weather={ weatherType } temperature={ temperature } sunset={ sunsetTime } sunrise={ sunriseTime } location={ currentLocation }/>)
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

