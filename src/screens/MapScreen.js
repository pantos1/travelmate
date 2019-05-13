import MapView, { Marker } from 'react-native-maps';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text, Toast } from 'native-base';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginBottom: 1,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            markerLocation: {
                latitude: 0,
                longitude: 0
            }
        };
    }

    _onMapReady = () => this.setState({marginBottom: 0});

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
            () =>
                Toast.show({
                    text: 'Error while finding a location.',
                    buttonText: 'Hide',
                    duration: 3000
                })
        );
        this.watchID = navigator.geolocation.watchPosition(position => {
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
        });
    }

    componentWillUnmount() {
        if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={{        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1,
                        marginBottom: this.state.marginBottom}}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    region={this.state.region}
                    onMapReady={this._onMapReady}
                    onPress={(e) => this.setState({markerLocation: e.nativeEvent.coordinate})}
                >
                    <Marker coordinate={this.state.markerLocation} />
                </MapView>
                <Button
                    block
                    success
                    onPress={() => {
                        this.props.navigation.state.params.onLocationSelected(this.state.markerLocation);
                        this.props.navigation.goBack();
                    }}
                >
                    <Text>Select start location</Text>
                </Button>
            </View>
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
        bottom: 0,
        flex: 1
    }
});
