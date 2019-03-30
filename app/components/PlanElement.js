import React, {Component} from "react";
import {StyleSheet, Text, View, FlatList} from "react-native";

class PlanElement extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem = data => {
        return <Text>{data.item. key}</Text>
    };

    render() {
        return (
            <View>
                <FlatList style={styles.listElementContainer} data={this.props.data} renderItem={this._renderItem}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  listElementContainer: {flex: 1, flexDirection: "row"}
});

export default PlanElement;
