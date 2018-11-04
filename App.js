import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Key } from './WeatherKey';
import ShowWeather from './ShowWeather';

export default class App extends React.Component {
  state = { 
    isLoading: true, 
    temperature: 0,
    weatherType: null,
    errors: false //not used currently
  };


  getWeather(latitude, longitude) {
    fetch (`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${Key}&units=metric`) //using openweathermap api
      .then(data => data.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,  //take temperature from the data
          weatherType: json.weather[0].main, //take weathertype from the data
          isLoading: false
        });
      });
  }

  componentDidMount() {  //fetches location
    navigator.geolocation.getCurrentPosition(
      location => { this.getWeather(location.coords.latitude,location.coords.longitude); },
      errors   => { this.setState( {errors: true }); }
    );
  }


  render() {
    const { isLoading, weatherType, temperature } = this.state;
    return (
      <View style={styles.container}>
          {isLoading ?
            (<View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Checking the weather!</Text> 
            </View>) :
            (<ShowWeather weather={ weatherType } temperature={ temperature } />)
          }
      </View>
    );
  }
}

  /*render() {
    const { isLoading, weatherType, temperature } = this.state;
    return (
      <View style={styles.container}>
        if (errors) {
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Error getting location! </Text>
          </View>
        } else if (isLoading) {
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Checking the weather!</Text>
            </View>
        } else {
            <ShowWeather weather={ weatherType } temperature={ temperature } />
        }
        }
      </View>
    );
  }
}*/

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

