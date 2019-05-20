import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';

class PlanElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.listElementContainer}>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.props.name}</Text>
                    <View style={styles.rowContainer}>
                        <Icon name="attach-money" type="MaterialIcons" />
                        {this.props.price ? <Text>{this.props.price} {this.props.currency}</Text> : null}
                    </View>
                    <View style={styles.rowContainer}>
                        <Icon name="timelapse" type="MaterialIcons" />
                        <Text>{this.props.duration}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listElementContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 2
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    rowContainer: { flex: 1, alignItems: 'center', flexDirection: 'row' }
});

export default PlanElement;
