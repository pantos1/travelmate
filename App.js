import React from 'react';
import * as firebase from 'react-native-firebase';
import PlanListScreen from "./src/screens/PlanListScreen";
import {createAppContainer, createStackNavigator} from "react-navigation";
import PlanScreen from "./src/screens/PlanScreen";
import PlanFormScreen from "./src/screens/PlanFormScreen";
import MapScreen from "./src/screens/MapScreen";

// export default class App extends Component {
//
//     constructor(props) {
//         super(props);
//         // this.ref = firebase.firestore().collection('trips');
//         this.state = {
//             trips: []
//         };
//     }
//
//     _addKeys = trips => {
//         return trips.map(trip => {
//             return Object.assign(trip, { key: trip.id });
//         });
//     };
//
//     // componentDidMount() {
//     //     this.ref.get()
//     //         .then(trips => {
//     //             this.setState({trips: this._addKeys(trips.docs)});
//     //         })
//     //         .catch(error => {
//     //             console.log('Fetch failed: ', error);
//     //         });
//     // };
//
//     render() {
//         return (
//             <PlanListScreen trips={mockPlans} />
//         )
//     }
// }

const appNavigator = createStackNavigator(
    {
        Home: {screen: PlanListScreen},
        Plan: {screen: PlanScreen},
        PlanForm: {screen: PlanFormScreen},
        Map: {screen: MapScreen}
    },
    {
        headerMode: 'none'
    });

export default createAppContainer(appNavigator);
