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

export default class App extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('trips');
        this.state = {
            trips: []
        };
    }

    _addKeys = trips => {
        return trips.map(trip => {
            return Object.assign(trip, { key: trip.id });
        });
    };

    componentDidMount() {
        // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        this.ref.get()
            .then(trips => {
                this.setState({trips: this._addKeys(trips.docs)});
            })
            .catch(error => {
                console.log('Fetch failed: ', error);
            });
    };

    render() {
        return (
            <PlanList trips={this.state.trips} />
        )
    }
}

const mockPlan = [
    {
        key: "Borobudur",
        price: "200k IND",
        duration: "2h",
    }
];
