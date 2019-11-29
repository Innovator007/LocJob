import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{
		text: 'Welcome to LocJob',
		background: '#03A9F4'
	},
	{
		text: 'Use this to find a local job that suits your profile',
		background: '#009688'
	},
	{
		text: 'Set your location, then swipe right to save the jobs to apply later',
		background: '#03A9F4'
	}
]

class WelcomeScreen extends Component {
	state = {
		token: null
	}

	async componentDidMount() {
		let token = await AsyncStorage.getItem('fb_token');
		await Font.loadAsync({
	      'google-sans': require('../../assets/fonts/GoogleSans-Regular.ttf')
	    });
		if(token) {
			this.props.navigation.navigate('map');
			this.setState({ token });
		} else {
			this.setState({ token: false });
		}
	}

	onSlidesComplete = async () => {
		this.props.navigation.navigate('auth');
	}

	render() {
		if(this.state.token === null) {
			return <AppLoading />;
		}
		return (
			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
		);
	}
}

export default WelcomeScreen;