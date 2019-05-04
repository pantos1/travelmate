import React, { Component } from "react";
import { FlatList } from "react-native";
import { Body, Button, Container, Fab, Footer, FooterTab, Header, Icon, Left, Spinner, Text, Title } from "native-base";
import PlanListElement from "../components/PlanListElement";
import { firestore } from "react-native-firebase";

class PlanListScreen extends Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firestore().collection('trips');
        this.unsubscribe = null;

        this.state = {
            loading: true,
            plans: []
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const plans = [];
        querySnapshot.forEach((plan) => {
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
        })
    };

    _renderItem = ({item}) => {
        console.log(item);
        return <PlanListElement
            name={item.name}
            owner={item.owner}
            date={item.date}
            onClick={() => {
                this.unsubscribe();
                this.props.navigation.navigate("Plan", {plan: item});
            }}
        />
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Trips around you</Title>
                    </Body>
                </Header>
                <Container>
                    {this.state.loading ?
                        <Spinner/>
                        : (
                            <>
                                <FlatList data={this.state.plans} renderItem={this._renderItem}/>
                                <Fab
                                    position="bottomRight"
                                    onPress={() => {
                                        this.props.navigation.navigate("PlanForm");
                                        this.unsubscribe();
                                    }}
                                >
                                    <Icon name="add" type="MaterialIcons"/>
                                </Fab>
                            </>
                        )}
                </Container>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="search" type="MaterialIcons"/>
                            <Text>Search</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="list" type="MaterialIcons"/>
                            <Text>My plans</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" type="MaterialIcons"/>
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default PlanListScreen;