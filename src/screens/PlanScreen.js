import React, {Component} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import {Container, Header, Left, Body, Button, Icon, Title} from 'native-base';
import PlanElement from '../components/PlanElement';
import {mockPlans} from "../data/mockPlans";

class PlanScreen extends Component {
    constructor(props) {
        super(props);
        const key = this.props.navigation.getParam('key');
        this.state ={
            plan: mockPlans.find(element => element.key === key)
        }
    }

    _renderItem = ({item}) => {
        return <PlanElement name={item.name} price={item.price} duration={item.duration}/>
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onClick={this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.plan.name}</Title>
                    </Body>
                </Header>
                <View style={[styles.header]}>
                    <Text style={styles.mainText}>
                        by {this.state.plan.owner}
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.mainText]}>
                            Start {this.state.plan.date.toLocaleDateString()} {this.state.plan.duration}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList data={this.state.plan.places} renderItem={this._renderItem}/>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {flex: 1, flexDirection: "column", alignItems: "center", top: 20},
    header: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        paddingTop: 20,
        borderBottomColor: "#AAAAAA",
        borderBottomWidth: 2
    },
    body: {flex: 5, flexDirection: "column", width: "100%"},
    rowContainer: {flex: 1, alignItems: "flex-start", flexDirection: "row"},
    flexStart: {alignSelf: "flex-start"},
    flexEnd: {alignSelf: "flex-end"},
    flexCenter: {alignSelf: "center"},
    columnContainer: {flex: 1, flexDirection: "column"},
    planTitle: {fontSize: 24},
    mainText: {fontSize: 16}
});

export default PlanScreen;