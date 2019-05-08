import React, { Component } from "react";
import { Button, Container, Form, Input, Item, Text, Toast } from "native-base";
import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";
import firebase from "react-native-firebase";
import { Formik } from "formik";

const SignUpValidationSchema = {

};

class SignUpScreen extends Component {

    async googleSignIn() {
        try {
            await GoogleSignin.configure();
            
            const data = await GoogleSignin.signIn();
            
            const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

            const firebaseUserCredential = await firebase.auth.signInWithCredential(credential);

        } catch (e) {
            Toast.show({
                text: 'Error while signing in with Google',
                type: "danger",
                buttonText: "Dismiss"
            })
        }
    }

    async signInWithEmail({email, password}) {
        try{
           const credential = await firebase.auth.createUserWithEmailAndPassword(email, password);
        } catch (e) {
            // TODO: Switch based on error codes
            Toast.show({
                text: 'Error while signing in',
                type: "danger",
                buttonText: "Dismiss"
            })
        }

    }
    
    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirmed: ''
                    }}
                    onSubmit={this.signInWithEmail}
                    validationSchema={SignUpValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({errors, values, handleChange, handleSubmit}) => (
                        <Form>
                            <Item>
                                <Input
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                />
                            </Item>
                            <Item>
                                <Input
                                    onChangeText={handleChange('password')}
                                    value={values.email}
                                    placeholder="Password"
                                    autoCapitalize="none"
                                    secureTextEntry
                                />
                            </Item>
                            <Item>
                                <Input
                                    onChangeText={handleChange('passwordConfirmed')}
                                    value={values.passwordConfirmed}
                                    placeholder="Confirm password"
                                    autoCapitalize="none"
                                    secureTextEntry
                                />
                            </Item>
                            <Button onPress={handleSubmit} full>
                                <Text>
                                    Sign Up
                                </Text>
                            </Button>
                        </Form>
                    )}
                </Formik>
                <GoogleSigninButton
                    onPress={this.googleSignIn}
                    size={GoogleSigninButton.Size.Wide}
                    />
            </Container>
        )
    }
}

export default SignUpScreen;