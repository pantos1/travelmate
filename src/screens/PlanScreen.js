import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { Body, Button, Container, Header, Icon, Left, Right, Text, Title, Toast } from 'native-base';
import PlanElement from '../components/PlanElement';
import firebase, { firestore } from 'react-native-firebase';

class PlanScreen extends Component {
    plan = this.props.navigation.getParam('plan');
    planRef = firestore()
        .collection('trips')
        .doc(this.plan.key);
    state = {
        user: firebase.auth().currentUser,
        modalVisible: false,
        loading: false
    };

    _renderItem = ({ item }) => {
        return <PlanElement name={item.name} price={item.price} duration={item.duration} />;
    };

    _deleteItem = async () => {
        try {
            this.setState({ loading: true });
            await this.planRef.delete();
            this.setState({ modalVisible: false });
            this.setState({ loading: false });
            this.props.navigation.navigate('Home');
        } catch (e) {
            this.setState({ loading: false });
            Toast.show({
                text: 'Error deleting the plan',
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    _handleEdit = () => {
        this.props.navigation.navigate('PlanForm', {
            initialValues: {
                ...this.plan
            }
        });
    };

    _joinTrip = async() => {
        try{
            const plan = await this.planRef.get();
            const planData = plan.data();
            planData.participants.push({uid: this.state.user.uid, displayName: this.state.user.displayName});
            await this.planRef.set(planData, {merge: true});
            Toast.show({
                text: 'You have joined the trip!',
                type: 'success',
                buttonText: 'Ok'
            })
        } catch (e) {
            console.log(e);
            Toast.show({
                text: 'Oops something went wrong. Please try again.',
                type: 'danger',
                buttonText: 'Dismiss'
            });
        }
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.plan.name}</Title>
                    </Body>
                    <Right>
                        {this.state.user.uid === this.plan.owner.uid ? (
                            <>
                                <Button transparent onPress={() => this._handleEdit()}>
                                    <Text>Edit</Text>
                                </Button>
                                <Button transparent onPress={() => this.setState({ modalVisible: true })}>
                                    <Text>Delete</Text>
                                </Button>
                            </>
                        ) : (
                            <Button transparent onPress={() => this._joinTrip()}>
                                <Text>Join</Text>
                            </Button>
                        )}
                    </Right>
                </Header>
                <View style={[styles.header]}>
                    <Text style={styles.mainText}>by {this.plan.owner.displayName}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.mainText]}>
                            Start {this.plan.date.toLocaleDateString()} {this.plan.duration}
                        </Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <FlatList data={this.plan.places} renderItem={this._renderItem} />
                </View>
                <View>
                    <Modal
                        isVisible={this.state.modalVisible}
                        onBackButtonPress={() => this.setState({ modalVisible: false })}
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                    >
                        <View style={styles.modalContent}>
                            <Text>Are you sure you want to delete this trip?</Text>
                            <View style={styles.modalButtonWrapper}>
                                <Button small transparent dark onPress={() => this.setState({ modalVisible: false })}>
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    small
                                    transparent
                                    danger
                                    onPress={() => this._deleteItem()}
                                    disabled={this.state.loading}
                                >
                                    <Text>Delete</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
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
    mainText: { fontSize: 16 },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default PlanScreen;
