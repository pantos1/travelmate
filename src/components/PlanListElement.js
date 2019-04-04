import React, {Component} from "react";
import {ListItem, Body, Right, Button} from "native-base";
import {Text} from "react-native";

class PlanListElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ListItem>
                <Body>
                    <Text>
                        {this.props.name}
                    </Text>
                    <Text note numberOfLines={1}>
                        {this.props.organizer} {this.props.date}
                    </Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>Details</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

}

export default PlanListElement;