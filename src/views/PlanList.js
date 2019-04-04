import React, {Component} from "react";
import {FlatList} from "react-native";
import {Container} from "native-base";
import PlanListElement from "../components/PlanListElement";

class PlanList extends Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
      return <PlanListElement name={item.name} organizer={item.owner} date={item.date} />
    };

    render() {
        return (
            <Container>
                <FlatList data={this.props.trips} renderItem={this._renderItem}/>
            </Container>
        );
    }
}

export default PlanList;