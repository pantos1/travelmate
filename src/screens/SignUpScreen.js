import React, { Component } from 'react';
import { Button, Container, Content, Form, Input, Item, Text, Toast } from 'native-base';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';
import { ErrorMessage } from '../components/ErrorMessage';

const SignUpValidationSchema = Yup.object().shape({
    displayName: Yup.string().required('Display name is required'),
    email: Yup.string()
        .email('Wrong email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password has to have at least 6 characters')
        .required('Password is required'),
    passwordConfirmed: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match')
});

class SignUpScreen extends Component {
    state = {
        loading: false
    };

    googleSignIn = async () => {
        try {
            await GoogleSignin.configure({
                scopes: [
                    'https://www.googleapis.com/auth/firebase.readonly',
                    'https://www.googleapis.com/auth/cloud-platform'
                ],
                webClientId: '1075849216932-ed2ngjng8btdddspsm8rtjn8n40f2jcu.apps.googleusercontent.com'
            });
            await GoogleSignin.hasPlayServices();
            const data = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        } catch (e) {
            console.log(e);
            let text;
            if (e.code !== statusCodes.SIGN_IN_CANCELLED) {
                if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    text = 'Play Services are not available';
                } else {
                    text = 'Error while signing in with Google';
                }
                Toast.show({
                    text: text,
                    type: 'danger',
                    buttonText: 'Dismiss'
                });
            }
        }
    };

    signUpWithEmail = async ({ email, password, displayName }) => {
        try {
            this.setState({ loading: true });
            const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = firebase.auth().currentUser;
            await user.updateProfile({ displayName });
            this.setState({ loading: false });
        } catch (e) {
            // TODO: Switch based on error codes
            this.setState({ loading: false });
            Toast.show({
                text: 'Error while signing in',
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    render() {
        return (
            <Container>
                <Content>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            passwordConfirmed: '',
                            displayName: ''
                        }}
                        onSubmit={this.signUpWithEmail}
                        validationSchema={SignUpValidationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form>
                                <Item>
                                    <Input
                                        onChangeText={handleChange('displayName')}
                                        value={values.displayName}
                                        placeholder="Name"
                                    />
                                    <ErrorMessage name="displayName" />
                                </Item>
                                <Item>
                                    <Input
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email" />
                                </Item>
                                <Item>
                                    <Input
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        placeholder="Password"
                                        autoCapitalize="none"
                                        secureTextEntry
                                    />
                                    <ErrorMessage name="password" />
                                </Item>
                                <Item last>
                                    <Input
                                        onChangeText={handleChange('passwordConfirmed')}
                                        value={values.passwordConfirmed}
                                        placeholder="Confirm password"
                                        autoCapitalize="none"
                                        secureTextEntry
                                    />
                                    <ErrorMessage name="passwordConfirmed" />
                                </Item>
                                <Button onPress={handleSubmit} disabled={this.state.loading} block>
                                    <Text>Sign Up</Text>
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <GoogleSigninButton
                        style={styles.googleButton}
                        onPress={this.googleSignIn}
                        color={GoogleSigninButton.Color.Auto}
                        size={GoogleSigninButton.Size.Wide}
                        disabled={this.state.loading}
                    />
                    <Button onPress={() => this.props.navigation.navigate('SignIn')} transparent full>
                        <Text uppercase={false}>I already have an account</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    errorText: {
        fontSize: 10,
        color: 'red'
    },
    googleButton: {
        width: '100%',
        height: 60
    }
});

export default SignUpScreen;
