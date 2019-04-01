/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Plan from './src/views/Plan';
import firebase from 'react-native-firebase';

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        firebase.auth()
            .signInAnonymously()
            .then(credential => {
                if (credential) {
                    console.log('default app user ->', credential.user.toJSON());
                }
            });
    }

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
