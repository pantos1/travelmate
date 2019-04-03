/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Plan from './src/views/Plan';
import * as firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.plans = firebase.firestore().collection('trips');
        this.state = {
            trips: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.plans.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const trips = [];
        querySnapshot.forEach((doc) => {
            trips.push({
                key: doc.id,
                ...doc
            })
        });
        this.setState(trips);
    };

    render() {
        return (
            <Plan
                planTitle={"Borobudur"}
                organizer={"Jan Kowalski"}
                startTime={"9:00"}
                duration={"7h"}
                sights={mockPlan}
            />
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
