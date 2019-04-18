import {Body, Title, Header, Left, Button, Icon} from "native-base";

export const PlanScreenHeader = props => (
    <Header>
    <Left>
        <Button transparent>
            <Icon name='arrow-back'/>
        </Button>
    </Left>
    <Body>
        <Title>{props.title}</Title>
    </Body>
</Header>
);