import React, {Component} from "react";
import {FlatList} from "react-native";
import {Container, Body, Title, Header, Left, Footer, FooterTab, Button, Text, Icon, Fab} from "native-base";
import PlanListElement from "../components/PlanListElement";
import {mockPlans} from "../data/mockPlans";

class PlanListScreen extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
        return <PlanListElement name={item.name} owner={item.owner} date={item.date} onClick={() => this.props.navigation.navigate("Plan", { key: item.key })}/>
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Trips around you</Title>
                    </Body>
                </Header>
                <Container>
                    <FlatList data={mockPlans} renderItem={this._renderItem}/>
                    <Fab
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate("PlanForm")}
                    >
                        <Icon name="add" type="MaterialIcons" />
                    </Fab>
                </Container>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="search" type="MaterialIcons" />
                            <Text>Search</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="list" type="MaterialIcons" />
                            <Text>My plans</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="person" type="MaterialIcons" />
                            <Text>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default PlanListScreen;