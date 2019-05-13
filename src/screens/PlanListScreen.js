import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Body, Button, Container, Fab, Footer, FooterTab, Header, Icon, Spinner, Text, Title } from 'native-base';
import PlanListElement from '../components/PlanListElement';
import { firestore } from 'react-native-firebase';

class PlanListScreen extends Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firestore().collection('trips');
        this.unsubscribe = null;

        this.state = {
            loading: true,
            plans: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = querySnapshot => {
        const plans = [];
        querySnapshot.forEach(plan => {
            const planData = plan.data();
            plans.push({
                key: plan.id,
                plan,
                ...planData
            });
        });
        this.setState({
            plans,
            loading: false
        });
    };

    _renderItem = ({ item }) => {
        return (
            <PlanListElement
                name={item.name}
                owner={item.owner.displayName}
                date={item.date}
                onClick={() => {
                    this.unsubscribe();
                    this.props.navigation.navigate('Plan', { plan: item });
                }}
            />
        );
    };

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Trips around you</Title>
                    </Body>
                </Header>
                <Container>
                    {this.state.loading ? (
                        <Spinner color="#737373" />
                    ) : (
                        <>
                            <FlatList data={this.state.plans} renderItem={this._renderItem} />
                            <Fab
                                position="bottomRight"
                                style={styles.fab}
                                onPress={() => {
                                    this.props.navigation.navigate('PlanForm');
                                }}
                            >
                                <Icon name="add" type="MaterialIcons" />
                            </Fab>
                        </>
                    )}
                </Container>
                <Footer>
                    <FooterTab>
                        <Button vertical style={styles.grey} active>
                            <Icon name="home" type="MaterialIcons" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical style={styles.grey}>
                            <Icon name="list" type="MaterialIcons" />
                            <Text>My plans</Text>
                        </Button>
                        <Button vertical style={styles.grey}>
                            <Icon name="person" type="MaterialIcons" />
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    grey: { color: '#737373' },
    fab: { backgroundColor: '#028f48' },
    goldenColor: { backgroundColor: '#C7AA3C' }
});

export default PlanListScreen;
