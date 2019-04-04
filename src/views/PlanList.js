import React, {Component} from "react";
import {FlatList} from "react-native";
import {Container, Body, Title, Header, Left, Footer, FooterTab, Button, Text, Icon} from "native-base";
import PlanListElement from "../components/PlanListElement";

class PlanList extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
        return <PlanListElement name={item.name} owner={item.owner} date={item.date}/>
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
                    <FlatList data={this.props.trips} renderItem={this._renderItem}/>
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

export default PlanList;