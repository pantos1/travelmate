import React, { Component } from 'react';
import { Button, Container, Content, Header, Right, Text } from 'native-base';
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
                    <Right>
                        <Button transparent onPress={() => this._handleLogout()}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>

                </Content>
            </Container>
        );
    }
}

export default ProfileScreen;
