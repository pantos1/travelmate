/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import * as firebase from 'react-native-firebase';
import PlanList from "./src/views/PlanList";
import {Text} from "react-native";

const mockPlans = [
    {
        key: "id0",
        name: "Borobudur",
        owner: "Jan Kowalski",
        date: new Date(),
        start_location: 0,
        status: "CREATED",
        places: [
            {
                key: "id0",
                name: "Borobudur",
                price: 200000,
                duration: 2,
                coordinates: 0
            },
            {
                key: "id1",
                name: "Prambanan",
                price: 150000,
                duration: 2.5,
                coordinates: 0
            }
        ]
    },
    {
        key: "id1",
        name: "Abc",
        owner: "Test test",
        date: new Date(),
        start_location: 0,
        status: "CREATED",
        places: [
            {
                key: "id0",
                name: "Defeg 1",
                price: null,
                duration: 2,
                coordinates: 0
            },
            {
                key: "id1",
                name: "Test test1",
                price: 150000,
                duration: null,
                coordinates: 0
            }
        ]
    }
];

export default class App extends Component {

    constructor(props) {
        super(props);
        // this.ref = firebase.firestore().collection('trips');
        this.state = {
            trips: []
        };
    }

    _addKeys = trips => {
        return trips.map(trip => {
            return Object.assign(trip, { key: trip.id });
        });
    };

    // componentDidMount() {
    //     this.ref.get()
    //         .then(trips => {
    //             this.setState({trips: this._addKeys(trips.docs)});
    //         })
    //         .catch(error => {
    //             console.log('Fetch failed: ', error);
    //         });
    // };

    render() {
        return (
            <PlanList trips={mockPlans} />
        )
    }
}
