import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CheckBox from 'react-native-checkbox-heaven';
import { LinearGradient } from 'expo';
import { TextInput } from 'react-native-gesture-handler';
import firestore from '../database'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

export default class AddWorkouts extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            list_workouts: [],
            checked: false,
        }
        this.ref = firestore.collection("Workouts");
    };

    componentDidMount = () => {
        this.ref
            .doc("List_Workouts")
            .collection("Arms")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        list_workouts: [...this.state.list_workouts, doc.data().Desc]
                    })
                });
            });
    };

    render() {
        return (
            <LinearGradient style={styles.container} colors={['#304352', '#09203f']}>
                <View style={styles.top}>
                    <Text style={{ color: '#A3B7C3', fontSize: 40, fontWeight: 'bold' }}> Stability Workout</Text>
                </View>
                <View style={styles.text_bar} ></View>
                <View style={styles.bottom}>
                    <FlatList
                        style={styles.listView}
                        data={this.state.list_workouts}
                        renderItem={
                            ({ item }) =>
                                <View style={styles.workoutContainer}>
                                    <View style={{ flex: 1, flexWrap: 'wrap' }}>
                                        <Text style={styles.workoutText}>
                                            {item}
                                        </Text>
                                    </View>
                                    <View style={styles.inputFieldContainer}>

                                        <TextInput
                                            style={styles.workoutInput}
                                            keyboardType='numeric'
                                            placeholder='3'
                                            placeholderTextColor='grey'
                                        />
                                        <TextInput
                                            style={styles.workoutInput}
                                            keyboardType='numeric'
                                            placeholder='10'
                                            placeholderTextColor='grey'
                                        />
                                        <TextInput
                                            style={styles.workoutInput}
                                            keyboardType='numeric'
                                            placeholder='100'
                                            placeholderTextColor='grey'
                                            allowFontScaling={true}
                                        />
                                        <View style={styles.info}>
                                            <Icon
                                                name='arrow-forward'
                                                onPress={()=>{this.props.navigation.navigate('Workout')}}
                                                size = {35}
                                                color = '#A3B7C3'
                                            />
                                        </View>
                                    </View>
                                </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </LinearGradient>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_bar: {
        flex: .1,
        margin: 8,
        borderRadius: 15,
        backgroundColor: '#A3B7C3',
        shadowOpacity: 1,
        shadowOffset: { width: 3, height: 4 },
        
    },
    top: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        shadowOpacity: 1,
        shadowOffset: { width: 3, height: 4 },
        
    },
    bottom: {
        flex: 5,
        shadowOpacity: 1,
        shadowOffset: { width: 3, height: 4 },
        
    },
    listView: {
        flex: 1,
        margin: 10,
    },
    workoutContainer: {
        flex: 1,
        borderRadius: 8,
        margin: 8,
        alignItems: 'center',
        borderColor: '#A3B7C3',
        borderWidth: 3,
        flexDirection: 'row',
        height: 50,
    },
    workoutText: {
        fontSize: 15,
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#A3B7C3',
    },
    info: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    workoutInput: {
        flex: 1,
        margin: 5,
        width: 50,
        height: 35,
        backgroundColor: '#A3B7C3',
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    inputFieldContainer: {
        flex: 1.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});




