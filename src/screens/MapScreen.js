import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import { fetchJobs } from '../actions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class MapScreen extends Component {
	state = {
		mapLoaded: false,
		region: {
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09
		},
		coordinate: {
			latitude: 37,
			longitude: -122
		},
		query: "",
		loading: false
	}

	componentDidMount() {
		this.setState({ mapLoaded: true });
	}

	_getLocationAsync = async () => {
	    let { status } = await Permissions.askAsync(Permissions.LOCATION);
	    if (status === 'granted') {
	     	let location = await Location.getCurrentPositionAsync({});
	     	if(location) {
	     		let region = {
		    		latitude: location["coords"]["latitude"],
		    		longitude: location["coords"]["longitude"],
		    		latitudeDelta: 0.09,
		    		longitudeDelta: 0.04
		    	} 
		    	this.setState({ region });
	     	}
	    }
	};

	onRegionChange = (region) => {
	  	this.setState({ region, coordinate:{ latitude: region.latitude, longitude: region.longitude } });
	}

	onButtonPress = () => {
		this.setState({ loading: true });
		const description = this.state.query !== "" ? this.state.query.toLowerCase() : "javascript"
		this.props.fetchJobs(this.state.region, description,() => {
			this.setState({ loading: false });
			this.props.navigation.navigate('jobs');
		});
	}

	onInputChange = (name,value) => {
		this.setState({ [name]: value });
	}

	render() {
		if(!this.state.mapLoaded) {
			return (
				<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
					<ActivityIndicator size="large" />
				</View>
			);
		}

		const { coordinate } = this.state;
		return (
			<View style={styles.mapContainer}>
				<View style={styles.inputContainer}>
					<TextInput
					  value={this.state.query}
					  onChangeText={value=> this.onInputChange("query", value)}
				      style={styles.inputStyle}
				      placeholder="Search Jobs"
					/>
				</View>
				<MapView 
					region={this.state.region} 
					onRegionChangeComplete={this.onRegionChange}
					style={styles.mapStyle} 
				>
					<Marker
				      coordinate={coordinate}
				      title="Current Location"
				    />
				</MapView>
				<View style={styles.currentContainer}>
					<Button 
						containerStyle={{borderRadius:100}}
						raised
						buttonStyle={{borderRadius: 100,backgroundColor:"#fff",paddingVertical: 15,paddingHorizontal:17}}
						icon={
						    <Icon
						      name="md-locate"
						      type="ionicon"
						    />
						}
						onPress={this._getLocationAsync}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button 
						buttonStyle={{ paddingVertical: 15, backgroundColor:"#03A9F4" }}
						titleStyle={{fontFamily: 'google-sans'}}
						title="SEARCH THIS AREA"
						raised  
						loading={this.state.loading}
						icon={{ name:'search', color: '#fff' }}
						onPress={this.onButtonPress}
					/>
				</View>
			</View>
		);
	}
}

const styles = {
	mapContainer: {
	    flex: 1,
	    backgroundColor: '#fff',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 20
	},
	currentContainer: {
		position: 'absolute',
		bottom: 90,
		right: 0,
		paddingHorizontal: 20,
		zIndex: 10000	
	},
	inputStyle: {
		paddingVertical: 15,
		paddingHorizontal: 25,
		fontSize: 18,
		backgroundColor: '#fff',
		borderRadius: 5,
		borderWidth: 2,
		fontFamily: 'google-sans',
		borderColor: '#eee',
		width: Dimensions.get('window').width - 30
	},
	inputContainer: {
		position: 'absolute',
		top: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 15,
		zIndex: 10000
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	}
}

export default connect(null, { fetchJobs })(MapScreen);