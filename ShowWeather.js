import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { weatherTypes } from './WeatherTypes';

const ShowWeather = ({ weather, temperature, sunset, sunrise, location }) => { //displays the weather
    const currentTime = (new Date).getTime(); //gets current time in unix
    if (currentTime > sunset || currentTime < sunrise) { //tests if its night or not
        return (
            <View style={[styles.container, {backgroundColor: '#003366'}]}>
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
            </View>
        )
    } else {
    return (
        <View style={[styles.container, { backgroundColor: weatherTypes[weather].color }]}>
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
        justifyContent: 'center'
    },
    body: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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