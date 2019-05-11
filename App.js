import React, { Component } from 'react';
import PlanListScreen from './src/screens/PlanListScreen';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import PlanScreen from './src/screens/PlanScreen';
import PlanFormScreen from './src/screens/PlanFormScreen';
import MapScreen from './src/screens/MapScreen';
import { Root, Spinner, StyleProvider } from 'native-base';
import SignUpScreen from './src/screens/SignUpScreen';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import SignInScreen from './src/screens/SignInScreen';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.unsubscriber = null;
        this.state = {
            checkedSignIn: false,
            signedIn: false,
            user: null
        };
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user, signedIn: true });
            }
        });
        GoogleSignin.getCurrentUser().then(user => {
            if (user) {
                this.setState({ user, signedIn: true });
            }
        });
        this.setState({ checkedSignIn: true });
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    render() {
        if (!this.state.checkedSignIn) {
            return <Spinner />;
        }

        const AppNavigator = createAppContainer(
            switchNavigator(this.state.signedIn)
        );

        return (
            <Root>
                <StyleProvider style={getTheme(commonColor)}>
                    <AppNavigator />
                </StyleProvider>
            </Root>
        );
    }
}

const SignedIn = createStackNavigator(
    {
        Home: { screen: PlanListScreen },
        Plan: { screen: PlanScreen },
        PlanForm: { screen: PlanFormScreen },
        Map: { screen: MapScreen }
    },
    {
        headerMode: 'none'
    }
);

const SignedOut = createStackNavigator(
    {
        SignUp: { screen: SignUpScreen },
        SignIn: { screen: SignInScreen }
    },
    {
        headerMode: 'none'
    }
);

const switchNavigator = (signedIn = false) =>
    createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
        }
    );
