import React, {Component} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import {Container, Header, Left, Body, Button, Icon, Title} from 'native-base';
import PlanElement from '../components/PlanElement';
import { PlanScreenHeader } from '../components/PlanScreenHeader'

class Plan extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <PlanScreenHeader title={navigation.state.params.plan.title}/>
        }
    };

    _renderItem = ({item}) => {
        return <PlanElement name={item.key} price={item.price} duration={item.duration}/>
    };

    render() {
        return (
            <Container>
                <View style={[styles.header]}>
                    <Text style={styles.mainText}>
                        by {this.props.navigation.state.params.plan.organizer}
                    </Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.mainText]}>
                            Start {this.props.navigation.state.params.plan.startTime} {this.props.navigation.state.params.plan.duration}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList data={this.props.navigation.state.params.plan.sights} renderItem={this._renderItem}/>
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

export default Plan;