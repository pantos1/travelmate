import React, { Component } from 'react';
import { Button, Container, Form, Input, Item, Text, Toast } from 'native-base';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';

const SignUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password has to have at least 6 characters')
    .required('Password is required'),
  passwordConfirmed: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords do not match'
  )
});

class SignUpScreen extends Component {
  googleSignIn = async () => {
    try {
      await GoogleSignin.configure();

      await GoogleSignin.hasPlayServices();

      const data = await GoogleSignin.signIn();

      const credential = firebase
        .auth()
        .GoogleAuthProvider.credential(data.idToken, data.accessToken);

      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
    } catch (e) {
      let text;
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
  };

  async signUpWithEmail({ email, password }) {
    try {
      const credential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (e) {
      // TODO: Switch based on error codes
      Toast.show({
        text: 'Error while signing in',
        type: 'danger',
        buttonText: 'Dismiss'
      });
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
          onSubmit={this.signUpWithEmail}
          validationSchema={SignUpValidationSchema}
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
                  <Text style={styles.errorText}>{errors.email}</Text>
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
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </Item>
              <Item>
                <Input
                  onChangeText={handleChange('passwordConfirmed')}
                  value={values.passwordConfirmed}
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  secureTextEntry
                />
                {errors.passwordConfirmed && (
                  <Text style={styles.errorText}>
                    {errors.passwordConfirmed}
                  </Text>
                )}
              </Item>
              <Button onPress={handleSubmit} full>
                <Text>Sign Up</Text>
              </Button>
              <Button
                onPress={this.props.navigation.navigate('SignIn')}
                transparent
              >
                <Text>I already have an account</Text>
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

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: 'red'
  }
});

export default SignUpScreen;
