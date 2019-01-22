import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


function click() {
    console.log("painoit nappia")
}

const SelectLocation = () => {
    return(
        <View style={[styles.container, {backgroundColor: '#e4e4e4'}]}>
            <Text style={styles.text}>Select a location.</Text>
            <View style={styles.buttons}>
                <Button title="Current location" onPress={click} style={styles.button}></Button>
                <Button title="Helsinki" onPress={click} style={styles.button}></Button>
                <Button title="New York" onPress={click} style={styles.button}></Button>
                <Button title="London" onPress={click} style={styles.button}></Button>
                <Button title="Stockholm" onPress={click} style={styles.button}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1
    }, 

    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        paddingLeft: 65,
        paddingTop: 60,
        color: '#000000'
    },
    buttons: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        flex: 0,
        paddingTop: 55,
        marginTop: 55,
        width: 999
    }
});

export default SelectLocation;