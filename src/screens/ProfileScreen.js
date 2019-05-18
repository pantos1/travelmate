import React, { Component } from 'react';
import { Body, Button, Container, Content, Header, Left, Right, Text, Title } from 'native-base';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

class ProfileScreen extends Component {
    user = firebase.auth().currentUser;

    _handleLogout = async () => {
        if (this.user.providerId === 'google.com') {
            await GoogleSignin.signOut();
        }
        firebase.auth().signOut();
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Your profile</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this._handleLogout()}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content />
            </Container>
        );
    }
}

export default ProfileScreen;
