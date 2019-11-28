import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class Loading extends Component {
	render() {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loading: {
	    position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    alignItems: 'center',
	    justifyContent: 'center'
	}
});

export default Loading;