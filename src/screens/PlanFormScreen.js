import React, { Component } from 'react';
import { Formik } from "formik";
import { Body, Button, Container, Content, Form, Header, Input, Item, Label, Left, Text, Title } from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as Yup from "yup";

const planValidationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter plan name"),
    date: Yup.date().required("Please select trip's start date"),
    latitude: Yup.number().required("Please select trip's start location"),
    longitude: Yup.number().required("Please select trip's start location")
});


class PlanFormScreen extends Component {
    state = {
        dateTimePickerVisible: false
    };

    toggleDateTimePicker = () => {
        this.setState(state => this.state.dateTimePickerVisible = !state.dateTimePickerVisible);
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Add new trip</Title>
                    </Body>
                </Header>
                <Formik
                    initialValues={{
                        name: '',
                        date: ''
                    }}
                    onSubmit={values => console.log(values)}
                    validationSchema={planValidationSchema}
                >
                    {({errors, handleBlur, handleChange, handleSubmit, setFieldValue, values}) => (
                        <Content>
                            <Form>
                                <Item stackedLabel>
                                    <Label>
                                        Name
                                    </Label>
                                    <Input
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {errors.name &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                    }
                                </Item>
                                <Item onPress={this.toggleDateTimePicker} stackedLabel>
                                    <Label>
                                        Date
                                    </Label>
                                    <Input
                                        disabled={true}
                                        value={values.date ? `${values.date.toLocaleDateString()} ${values.date.toLocaleTimeString()}` : ''}
                                    />
                                    <DateTimePicker
                                        minimumDate={new Date()}
                                        mode="datetime"
                                        isVisible={this.state.dateTimePickerVisible}
                                        onConfirm={date => setFieldValue("date", date)}
                                        onCancel={this.toggleDateTimePicker}
                                    />
                                    {errors.date &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.date}</Text>
                                    }
                                </Item>
                                <Item stackedLabel
                                      onPress={() => this.props.navigation.navigate(
                                          "Map",
                                          {
                                              onLocationSelected: ({latitude, longitude}) => {
                                                  setFieldValue("latitude", latitude);
                                                  setFieldValue("longitude", longitude);
                                              }
                                          })}>
                                    <Label>
                                        Select start location
                                    </Label>
                                    <Input
                                        disabled={true}
                                    />
                                    {errors.latitude &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.latitude}</Text>
                                    }
                                </Item>
                            </Form>
                            <Button onPress={handleSubmit} full>
                                <Text>
                                    Submit
                                </Text>
                            </Button>
                        </Content>
                    )}
                </Formik>
            </Container>
        )
    }
}

export default PlanFormScreen;