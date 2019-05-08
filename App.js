import React from 'react';
import PlanListScreen from "./src/screens/PlanListScreen";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import PlanScreen from "./src/screens/PlanScreen";
import PlanFormScreen from "./src/screens/PlanFormScreen";
import MapScreen from "./src/screens/MapScreen";
import { Root } from "native-base";
import SignUpScreen from "./src/screens/SignUpScreen";

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

const SignedIn = createStackNavigator(
    {
        Home: {screen: PlanListScreen},
        Plan: {screen: PlanScreen},
        PlanForm: {screen: PlanFormScreen},
        Map: {screen: MapScreen}
    },
    {
        headerMode: 'none'
    });

const SignedOut = createStackNavigator(
    {
        Login: {screen: SignUpScreen}
    },
    {
        headerMode: 'none'
    }
);

const AppNavigator = (signedIn = false) => createAppContainer(createSwitchNavigator(
    {
        SignedIn: {
            screen: SignedIn
        },
        SignedOut: {
            screen: SignedOut
        }
    },
    {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
));

export default () => (
    <Root>
        <AppNavigator/>
    </Root>
);
