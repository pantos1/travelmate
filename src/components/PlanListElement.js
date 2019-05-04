import React, {Component} from "react";
import {ListItem, Body, Right, Button, Text} from "native-base";

class PlanListElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ListItem button onPress={this.props.onClick} key={this.props.key}>
                <Body>
                    <Text>
                        {this.props.name}
                    </Text>
                    <Text note numberOfLines={1}>
                        {this.props.owner} {this.props.date.toLocaleDateString()}
                    </Text>
                </Body>
            </ListItem>
        )
    }

}

export default PlanListElement;