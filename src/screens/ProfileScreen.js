import React, { Component } from 'react';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    Right,
    Text,
    Title,
    Toast
} from 'native-base';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../components/ErrorMessage';

const profileValidationSchema = Yup.object().shape({
    displayName: Yup.string().required('Display name is required'),
    email: Yup.string()
        .email('Wrong email format')
        .required('Email is required')
});

class ProfileScreen extends Component {
    user = firebase.auth().currentUser;
    state = {
        editable: false,
        loading: false
    };

    _handleLogout = async () => {
        try {
            if (this.user.providerId === 'google.com') {
                await GoogleSignin.signOut();
            }
            firebase.auth().signOut();
        } catch (e) {
            Toast.show({
                text: 'Error while logging out. Please try again',
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    _handleSubmit = async ({ displayName, email }) => {
        try {
            this.setState({ loading: true });
            await this.user.updateProfile({ photoURL: this.user.photoURL, displayName });
            if (email !== this.user.email) {
                await this.user.updateEmail(email);
            }
            this.setState({ loading: false, editable: false });
            Toast.show({
                text: 'Your profile is updated',
                type: 'success',
                buttonText: 'Ok'
            });
        } catch (e) {
            this.setState({ loading: false });
            let text;
            if (e.errorCode === 'invalid-email') {
                text = 'Invalid email.';
            } else if (e.errorCode === 'email-already-in-use') {
                text = 'Email is already used by another user.';
            } else {
                text = 'Error while updating data. Please try again.';
            }
            Toast.show({
                text,
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        displayName: this.user.displayName,
                        email: this.user.email
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={profileValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ values, handleChange, handleSubmit, handleReset }) => (
                        <>
                            <Header>
                                <Left />
                                <Body>
                                    <Title>Your profile</Title>
                                </Body>
                                <Right>
                                    {this.state.editable ? (
                                        <Button
                                            transparent
                                            onPress={event => {
                                                this.setState({ editable: false });
                                                handleReset(event);
                                            }}
                                        >
                                            <Text>Cancel</Text>
                                        </Button>
                                    ) : (
                                        <Button transparent onPress={() => this.setState({ editable: true })}>
                                            <Text>Edit</Text>
                                        </Button>
                                    )}
                                    <Button transparent onPress={() => this._handleLogout()}>
                                        <Text>Logout</Text>
                                    </Button>
                                </Right>
                            </Header>
                            <Content>
                                <Form>
                                    <Item stackedLabel>
                                        <Label>Name</Label>
                                        <Input
                                            onChangeText={handleChange('displayName')}
                                            value={values.displayName}
                                            placeholder="Name"
                                            disabled={!this.state.editable}
                                        />
                                        <ErrorMessage name="displayName" />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label>Email</Label>
                                        <Input
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholder="Email"
                                            disabled={!this.state.editable}
                                        />
                                        <ErrorMessage name="email" />
                                    </Item>
                                    {this.state.editable ? (
                                        <Button onPress={handleSubmit} disabled={this.state.loading} block>
                                            <Text>Submit</Text>
                                        </Button>
                                    ) : null}
                                </Form>
                            </Content>
                        </>
                    )}
                </Formik>
            </Container>
        );
    }
}

export default ProfileScreen;
