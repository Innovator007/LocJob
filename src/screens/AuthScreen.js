import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage, BackHandler, Alert, } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { facebookLogin, isLoggedIn } from '../actions';
import Loading from '../components/Loading';

class AuthScreen extends Component {
	state = {
		loading:false
	}
	componentDidMount() {
		this.props.isLoggedIn();
		this.onAuthComplete(this.props);
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	componentWillUnmount(){
    	BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  	}

	onBackPress() {
	  	if(this.props.navigation.state.routeName === "auth") {
	  		Alert.alert(
	          'Exit Application',
	          'Do you really want to exit?', [{
	              text: 'Cancel',
	              onPress: () => console.log('Cancel Pressed'),
	              style: 'cancel'
	          }, {
	              text: 'OK',
	              onPress: () => BackHandler.exitApp()
	          }, ], {
	              cancelable: false
	          }
	      )
	      return true;
	  	}
	}

	onAuthComplete = (props) => {
		if(props.token) {
			this.props.navigation.navigate('map');
		}
	}

	render() {
		if(this.state.loading) {
			return <Loading />
		} else {
			return (
				<View style={styles.viewContainer}>
					<Icon name="work" type="material" size={75} />
					<Text style={styles.companyTitle}>LocJob</Text>
					<Text style={styles.textStyle}>One Account you need to search local jobs.</Text>
					<Button 
						icon={<Icon type="antdesign" name="facebook-square" color="#fff" />} 
						buttonStyle={styles.fbButtonStyle} 
						title="Sign in with Facebook" 
						titleStyle={{textAlign:'center',marginLeft: 10,fontSize: 18,textTransform:'uppercase'}}
						onPress={this.props.facebookLogin} />
				</View>
			);
		}
	}
}

const styles = {
	viewContainer: {
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		padding: 20,
		backgroundColor: "#eee"
	},
	companyTitle: {
		fontSize: 40,
		fontFamily: 'google-sans'
	},
	fbButtonStyle: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		marginTop: 10
	},
	textStyle: {
		fontSize: 24,
		fontFamily: 'google-sans',
		margin: 15,
		textAlign:'center'
	}
}

function mapStateToProps({ auth }) {
	return {
		token: auth.token
	}
}

export default connect(mapStateToProps, { facebookLogin, isLoggedIn })(AuthScreen);