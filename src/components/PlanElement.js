import React, {Component} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";

class PlanElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listElementContainer}>
                <Text>{this.props.name}</Text>
                <Text>{this.props.price}</Text>
                <Text>{this.props.duration}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    listElementContainer: {flex: 1, flexDirection: "row"}
});

export default PlanElement;
