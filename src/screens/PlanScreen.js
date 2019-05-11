import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Body,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title
} from 'native-base';
import PlanElement from '../components/PlanElement';

class PlanScreen extends Component {
    plan = this.props.navigation.getParam('plan');

    _renderItem = ({ item }) => {
        return (
            <PlanElement
                name={item.name}
                price={item.price}
                duration={item.duration}
            />
        );
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.plan.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Text>Join</Text>
                        </Button>
                    </Right>
                </Header>
                <View style={[styles.header]}>
                    <Text style={styles.mainText}>by {this.plan.owner}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.mainText]}>
                            Start {this.plan.date.toLocaleDateString()}{' '}
                            {this.plan.duration}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList
                        data={this.plan.places}
                        renderItem={this._renderItem}
                    />
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        top: 20
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: 20,
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 2
    },
    body: { flex: 5, flexDirection: 'column', width: '100%' },
    rowContainer: { flex: 1, alignItems: 'flex-start', flexDirection: 'row' },
    flexStart: { alignSelf: 'flex-start' },
    flexEnd: { alignSelf: 'flex-end' },
    flexCenter: { alignSelf: 'center' },
    columnContainer: { flex: 1, flexDirection: 'column' },
    whiteText: { color: 'white' },
    planTitle: { fontSize: 24 },
    mainText: { fontSize: 16 }
});

export default PlanScreen;
