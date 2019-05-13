import React, { Component } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { FieldArray, Formik } from 'formik';
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Text,
    Textarea,
    Title,
    Toast
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';
import firebase, { firestore } from 'react-native-firebase';

const planValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter plan name'),
    date: Yup.date().required("Please select trip's start date"),
    latitude: Yup.number().required("Please select trip's start location"),
    longitude: Yup.number().required("Please select trip's start location"),
    places: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required('Please enter place name'),
                duration: Yup.number()
                    .positive('Duration has to be a positive number')
                    .required('Please enter time to see the place'),
                price: Yup.number().min(0, 'Price cannot be negative'),
                latitude: Yup.number().required("Please select trip's start location"),
                longitude: Yup.number().required("Please select trip's start location")
            })
        )
        .required('Plan has to have at least one trip')
});

class PlanFormScreen extends Component {
    firestoreRef = firestore().collection('trips');
    state = {
        dateTimePickerVisible: false
    };

    toggleDateTimePicker = () => {
        this.setState(state => (this.state.dateTimePickerVisible = !state.dateTimePickerVisible));
    };

    handleSubmit = async values => {
        const { uid, displayName } = firebase.auth().currentUser;
        values.owner = { uid, displayName };
        values.places.forEach((plan, index) => {
            plan.key = index.toString();
        });
        try {
            await this.firestoreRef.add(values);
            this.props.navigation.navigate('Home');
        } catch (e) {
            Toast.show({
                text: 'Error adding trip plan. Please try again',
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add new trip</Title>
                    </Body>
                </Header>
                <Content>
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            date: '',
                            latitude: 0,
                            longitude: 0,
                            places: []
                        }}
                        onSubmit={this.handleSubmit}
                        validationSchema={planValidationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({ errors, handleChange, handleSubmit, setFieldValue, values }) => (
                            <>
                                <Form>
                                    <Item stackedLabel>
                                        <Label>Name</Label>
                                        <Input onChangeText={handleChange('name')} value={values.name} />
                                        <ErrorMessage name="name" />
                                    </Item>
                                    <Item stackedLabel>
                                        <Label>Description</Label>
                                        <Textarea
                                            onChangeText={handleChange('description')}
                                            value={values.description}
                                            rowspan={3}
                                            style={styles.textArea}
                                            bordered
                                        />
                                    </Item>
                                    <Item onPress={this.toggleDateTimePicker} stackedLabel>
                                        <Label>Date</Label>
                                        <Input
                                            disabled={true}
                                            value={
                                                values.date
                                                    ? `${values.date.toLocaleDateString()} ${values.date.toLocaleTimeString()}`
                                                    : ''
                                            }
                                        />
                                        <DateTimePicker
                                            minimumDate={new Date()}
                                            mode="datetime"
                                            isVisible={this.state.dateTimePickerVisible}
                                            onConfirm={date => setFieldValue('date', date)}
                                            onCancel={this.toggleDateTimePicker}
                                        />
                                        <ErrorMessage name="date" />
                                    </Item>
                                    <Item
                                        stackedLabel
                                        onPress={() =>
                                            this.props.navigation.navigate('Map', {
                                                markerLocation: {
                                                    latitude: values.latitude,
                                                    longitude: values.longitude
                                                },
                                                onLocationSelected: ({ latitude, longitude }) => {
                                                    setFieldValue('latitude', latitude);
                                                    setFieldValue('longitude', longitude);
                                                }
                                            })
                                        }
                                    >
                                        <Label>Select start location</Label>
                                        <Input disabled={true} />
                                        <ErrorMessage name="latitude" />
                                    </Item>
                                    <Item>
                                        <Container>
                                            <Text>Places</Text>
                                            {errors.places && typeof errors.places === 'string' && (
                                                <Text style={styles.errorText}>{errors.places}</Text>
                                            )}
                                            <FieldArray
                                                name="places"
                                                render={arrayHelpers => (
                                                    <Container>
                                                        {values.places && values.places.length > 0
                                                            ? values.places.map((place, index) => (
                                                                  <Container key={index}>
                                                                      <Button
                                                                          small
                                                                          rounded
                                                                          danger
                                                                          onPress={() => arrayHelpers.remove(index)}
                                                                          style={styles.deleteButton}
                                                                      >
                                                                          <Icon name="delete" type="MaterialIcons" />
                                                                      </Button>
                                                                      <Item stackedLabel>
                                                                          <Label>Name</Label>
                                                                          <Input
                                                                              onChangeText={handleChange(
                                                                                  `places.${index}.name`
                                                                              )}
                                                                              value={values.places[index].name}
                                                                          />
                                                                          <ErrorMessage name={`places.${index}.name`} />
                                                                      </Item>
                                                                      <Item stackedLabel>
                                                                          <Label>Duration</Label>
                                                                          <Input
                                                                              onChangeText={duration =>
                                                                                  setFieldValue(
                                                                                      `places.${index}.duration`,
                                                                                      parseFloat(duration)
                                                                                  )
                                                                              }
                                                                              value={values.places[
                                                                                  index
                                                                              ].duration.toString(10)}
                                                                              keyboardType="numeric"
                                                                          />
                                                                          <ErrorMessage
                                                                              name={`places.${index}.duration`}
                                                                          />
                                                                      </Item>
                                                                      <Item stackedLabel>
                                                                          <Label>Price</Label>
                                                                          <Input
                                                                              onChangeText={price =>
                                                                                  setFieldValue(
                                                                                      `places.${index}.price`,
                                                                                      parseFloat(price)
                                                                                  )
                                                                              }
                                                                              value={values.places[
                                                                                  index
                                                                              ].price.toString(10)}
                                                                              keyboardType="numeric"
                                                                          />
                                                                          <ErrorMessage
                                                                              name={`places.${index}.price`}
                                                                          />
                                                                      </Item>
                                                                      <Item
                                                                          stackedLabel
                                                                          onPress={() =>
                                                                              this.props.navigation.navigate('Map', {
                                                                                  onLocationSelected: ({
                                                                                      latitude,
                                                                                      longitude
                                                                                  }) => {
                                                                                      setFieldValue(
                                                                                          `places.${index}.latitude`,
                                                                                          latitude
                                                                                      );
                                                                                      setFieldValue(
                                                                                          `places.${index}.longitude`,
                                                                                          longitude
                                                                                      );
                                                                                  }
                                                                              })
                                                                          }
                                                                      >
                                                                          <Label>Select location</Label>
                                                                          <Input disabled={true} />
                                                                          <ErrorMessage
                                                                              name={`places.${index}.latitude`}
                                                                          />
                                                                      </Item>
                                                                  </Container>
                                                              ))
                                                            : null}
                                                        <Button
                                                            block
                                                            light
                                                            style={styles.blockButton}
                                                            onPress={() =>
                                                                arrayHelpers.push({
                                                                    name: '',
                                                                    duration: '',
                                                                    latitude: 0,
                                                                    longitude: 0,
                                                                    price: ''
                                                                })
                                                            }
                                                        >
                                                            <Text> Add new place </Text>
                                                        </Button>
                                                    </Container>
                                                )}
                                            />
                                        </Container>
                                    </Item>
                                </Form>
                                <Button onPress={handleSubmit} full>
                                    <Text>Submit</Text>
                                </Button>
                            </>
                        )}
                    </Formik>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textArea: {
        flex: 1,
        alignSelf: 'flex-start',
        width: '95%'
    },
    errorText: {
        fontSize: 10,
        color: 'red'
    },
    deleteButton: {
        alignSelf: 'flex-end'
    },
    blockButton: {
        width: '95%'
    }
});

export default PlanFormScreen;
