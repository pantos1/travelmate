import React, { Component } from 'react';
import { Formik } from "formik";
import { Body, Container, Header, Left, Title, Button, Form, Item, Input, Text, Content, Label} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";
import MapView from "react-native-maps";

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
                    initialValues={{name: ''}}
                    onSubmit={values => console.log(values)}
                >
                    {({handleSubmit, setFieldValue, values}) => (
                        <Content>
                            <Form>
                                <Item stackedLabel>
                                    <Label>
                                        Name
                                    </Label>
                                    <Input />
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
                                </Item>
                                <Item stackedLabel onPress={() => this.props.navigation.navigate("Map")}>
                                    <Label>
                                        Select start location
                                    </Label>
                                    <Input
                                        disabled={true}
                                    />
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