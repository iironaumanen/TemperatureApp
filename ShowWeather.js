import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { weatherTypes } from './WeatherTypes';
import PTRView from 'react-native-pull-to-refresh';

const ShowWeather = ({ weather, temperature, sunset, sunrise, location, update }) => { //displays the weather
    const currentTime = new Date((new Date).getTime());
    const sunsetTime = new Date(sunset * 1000);
    const sunriseTime = new Date(sunrise * 1000);

    if (currentTime > sunsetTime || currentTime < sunriseTime) { //tests if its night or not
        return (
            <View style={[styles.container, {backgroundColor: '#003366'}]}>
                <PTRView onRefresh={ update }>
                    <View style={styles.header} >
                        <Text style={styles.infoText}>Night</Text>
                        <Text style={styles.infoTextSmall}>It's dark and scary!</Text>
                    </View>
                    
                    <View style={styles.body} >
                        <Ionicons size={100} name='ios-moon' color={'#fff'} />
                        <Text style={styles.temp}>{ temperature }˚</Text>
                    </View>

                    <View style={styles.footer} >
                        <Text style={styles.locationText}>{ location }</Text>
                    </View>
                </PTRView>
            </View>
        )
    } else {
    return (
        <View style={[styles.container, { backgroundColor: weatherTypes[weather].color }]}>
            <PTRView onRefresh={ update }>
            <View style={styles.header} >
                <Text style={styles.infoText}>{ weatherTypes[weather].infoText }</Text>
                <Text style={styles.infoTextSmall}>{ weatherTypes[weather].infoTextSmall }</Text>
            </View>
            <View style={styles.body} >
                <Ionicons size={100} name={ weatherTypes[weather].icon } color={'#fff'} />
                <Text style={styles.temp}>{ temperature }˚</Text>
            </View>

            <View style={styles.footer} >
                    <Text style={styles.locationText}>{ location }</Text>
            </View>
            </PTRView>
                
        </View>
    );
    }
};

const styles = StyleSheet.create({
    container: { 
        flex: 1
    }, 
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    body: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        paddingBottom: 0
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    temp: {
        fontSize: 100,
        color: '#fff'
    },
    infoText: {
        fontSize: 50,
        color: '#fff'
    },
    infoTextSmall: {
        fontSize: 25,
        color: '#fff'
    },
    locationText: {
        fontSize: 30,
        color: '#fff'

    }
});

export default ShowWeather;