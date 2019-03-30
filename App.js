import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Plan from './app/views/Plan';

export default class App extends React.Component {
    render() {
        return (
            <Plan
                planTitle={"Borobudur"}
                organizer={"Jan Kowalski"}
                startTime={"9:00"}
                duration={"7h"}
                sights={[
                    {
                        key: "Borobudur",
                        data: [
                            {key: "Borobudur"},
                            {key: "200k IND"},
                            {key: "2h"},
                        ]

                    }
                ]}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
