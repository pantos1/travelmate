import MapView, { Marker } from 'react-native-maps'
import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Container, Text } from "native-base";

const GEOLOCATION_OPTIONS = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};

let {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markerLocation: {
                latitude: 0,
                longitude: 0
            }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    },
                    markerLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            GEOLOCATION_OPTIONS
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                    markerLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            }
        );
    }

    componentWillUnmount() {
        if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <Container style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    region={this.state.region}
                >
                    <Marker
                        coordinate={this.state.markerLocation}
                    />
                </MapView>
                <Button full success onPress={() => {
                    this.props.navigation.state.params.onLocationSelected(this.state.markerLocation);
                    this.props.navigation.goBack();
                }}>
                    <Text>
                        Select start location
                    </Text>
                </Button>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});