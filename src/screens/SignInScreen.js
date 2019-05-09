import React, { Component } from 'react';
import { Button, Container, Form, Input, Item, Text } from 'native-base';
import { Formik } from 'formik';
import { GoogleSigninButton } from 'react-native-google-signin';
import * as Yup from 'yup';

const SignInValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

class SignInScreen extends Component {
    async signInWithEmail({ email, password }) {
        // try{
        //     const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        // } catch (e) {
        //     // TODO: Switch based on error codes
        //     Toast.show({
        //         text: 'Error while signing in',
        //         type: "danger",
        //         buttonText: "Dismiss"
        //     })
        // }
    }

    render() {
        return (
            <Container>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={this.signInWithEmail}
                    validationSchema={SignInValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ errors, values, handleChange, handleSubmit }) => (
                        <Form>
                            <Item>
                                <Input
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <Text style={styles.errorText}>
                                        {errors.email}
                                    </Text>
                                )}
                            </Item>
                            <Item>
                                <Input
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    placeholder="Password"
                                    autoCapitalize="none"
                                    secureTextEntry
                                />
                                {errors.password && (
                                    <Text style={styles.errorText}>
                                        {errors.password}
                                    </Text>
                                )}
                            </Item>
                            <Button onPress={handleSubmit} full>
                                <Text>Sign In</Text>
                            </Button>
                            <Button
                                onPress={this.props.navigation.navigate(
                                    'SignUp'
                                )}
                                transparent
                            >
                                <Text>I don't have an account</Text>
                            </Button>
                        </Form>
                    )}
                </Formik>
                <GoogleSigninButton
                    onPress={this.googleSignIn}
                    color={GoogleSigninButton.Color.Auto}
                    size={GoogleSigninButton.Size.Wide}
                />
            </Container>
        );
    }
}

export default SignInScreen;
