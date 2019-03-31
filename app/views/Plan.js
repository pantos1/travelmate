import React, {Component} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";
import PlanElement from '../components/PlanElement';

class Plan extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
        // console.log(item);
        return <PlanElement name={item.key} price={item.price} duration={item.duration}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.planTitle}>
                    {this.props.planTitle}
                </Text>
                <Text style={styles.mainText}>
                    by {this.props.organizer}
                </Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.mainText}>
                        Start {this.props.startTime}
                    </Text>
                    <Text style={styles.mainText}>
                        {this.props.duration}
                    </Text>
                </View>
                <FlatList data={this.props.sights} renderItem={this._renderItem} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "center", paddingTop: 20, width: "100%"},
    rowContainer: {flex: 1, flexDirection: "row"},
    columnContainer: {flex: 1, flexDirection: "column"},
    planTitle: {fontSize: 20},
    mainText: {fontSize: 14}
});

export default Plan;