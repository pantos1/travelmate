import React from 'react';
import { Field, getIn } from 'formik';
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';

export const ErrorMessage = ({ name }) => (
    <Field
        name={name}
        render={({ form }) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? <Text style={styles.errorText}>{error}</Text> : null;
        }}
    />
);

const styles = StyleSheet.create({
    errorText: {
        fontSize: 10,
        color: 'red'
    }
});
