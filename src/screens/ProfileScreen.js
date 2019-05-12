import React, { Component } from 'react';
import { Button, Container, Content, Header, Right, Text } from 'native-base';

class ProfileScreen extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Right>
                        <Button>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content />
            </Container>
        );
    }
}

export default ProfileScreen;
