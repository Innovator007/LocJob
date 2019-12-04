import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoggedIn, clearlikedJobs } from '../actions';
import { View, Text, Platform, ActivityIndicator, Alert, Image, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {
	async componentDidMount() {
		await this.props.isLoggedIn();
	}
	componentWillReceiveProps(nextProps) {
		this.onAuthInComplete(nextProps);
	}

	onAuthInComplete = (props) => {
		if(!props.token) {
			this.props.navigation.navigate('auth');
		}
	}

	logoutConfirmation = () => {
		Alert.alert(
		  'LOGOUT',
		  'Are you sure you wanna logout?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => console.log('Cancel Pressed'),
		      style: 'cancel',
		    },
		    {text: 'Yes', onPress: () => this.logout()},
		  ],
		  {cancelable: false},
		);
	}

	confirmClearJobs = () => {
		Alert.alert(
		  'Clear Saved Jobs',
		  'This will delete all your saved jobs, are you sure?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => console.log('Cancel Pressed'),
		      style: 'cancel',
		    },
		    {text: 'Delete', onPress: () => this.props.clearlikedJobs()},
		  ],
		  {cancelable: false},
		);
	}

	logout = async () => {
		await AsyncStorage.setItem('fb_token', '');
		this.props.navigation.navigate('auth');
	}

	renderContent = () => {
		if(this.props.profile) {
			return (
				<View>
					<View style={styles.profileContainer}>
						<Text style={[styles.textStyle, styles.heading]}>PROFILE</Text>
						<Image
						  source={{ uri: this.props.profile.avatar }}
						  style={{ width: 200, height: 200, borderRadius: 100,overflow:'hidden',marginVertical: 10 }}
						  PlaceholderContent={<ActivityIndicator />}
						/>
						<Text style={[styles.textStyle, styles.name]}>{this.props.profile.name}</Text>
						<Text style={[styles.textStyle, styles.email]}>{this.props.profile.email}</Text>
					</View>
					<View style={styles.settingsContainer}>
						<Text style={[styles.textStyle, styles.heading]}>APP SETTINGS</Text>
						<Button
							buttonStyle={{ backgroundColor:"#f44336", marginTop: 15}}
							icon={{ name: 'delete-forever',color: '#fff' }}
						    title='CLEAR SAVED JOBS' 
						    titleStyle={{fontFamily: 'google-sans'}}
						    onPress={() => this.confirmClearJobs()}
						/>
						<Button
							buttonStyle={{ backgroundColor:"#03A9F4", marginTop: 15}}
						    title='LOGOUT' 
						    titleStyle={{fontFamily: 'google-sans'}}
						    onPress={this.logoutConfirmation}
						/>
					</View>
				</View>
			);
		} else {
			return null;
		}
	}
	render() {
		return (
			<View>
				{ this.renderContent() }
			</View>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		token: auth.token,
		profile: auth.profile
	}
}

const styles = {
	profileContainer: {
		justifyContent:'center',
		alignItems:'center',
		marginBottom: 15
	},
	settingsContainer: {
		margin: 15
	},
	textStyle: {
		fontFamily: "google-sans",
		fontSize: 16
	},
	name: {
		fontSize: 20,
		marginBottom: 5
	},
	email: {
		fontSize: 18
	},
	heading: {
		fontSize: 22,
		textAlign: 'center'
	}
}

export default connect(mapStateToProps, { isLoggedIn, clearlikedJobs })(SettingsScreen);