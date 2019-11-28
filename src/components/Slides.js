import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
	renderLastSlide = (index) => {
		if(index === this.props.data.length - 1) {
			return (
				<View style={styles.buttonStyle}>
					<Button 
						buttonStyle={{paddingVertical:10,paddingHorizontal:20,backgroundColor: "#009688"}}
						raised 
						title={this.props.completeButtonText ? this.props.completeButtonText : "LET'S GO"} 
						titleStyle={{fontFamily: 'google-sans'}}
						icon={
							<Icon
						      name="chevron-right"
						      type="material"
						      size={25}
						      color="white"
						    />
						}
						onPress={this.props.onComplete}
						iconRight
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.swipeContainer}>
					<Text style={styles.swipeText}>
						Swipe 
					</Text>
					<Icon
				      name="chevron-right"
				      type="material"
				      size={25}
				      color="white"
				    />
				</View>
			);
		}
	}

	renderSlides = () => {
		return this.props.data.map((slide, index) => {
			return (
				<View style={[styles.slideContainer, { backgroundColor: slide.background }]} key={slide.text}>
					<Text style={styles.slideText}>{slide.text}</Text>
					{ this.renderLastSlide(index) }
				</View>
			);
		})
	}

	render() {
		return (
			<ScrollView pagingEnabled horizontal style={{flex:1}}>
				{ this.renderSlides() }
			</ScrollView>
		);
	}
} 

const styles = {
	slideText: {
		fontSize: 28,
		color: "#fff",
		textAlign: 'center',
		fontFamily: 'google-sans'
	},
	slideContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,
		padding: 20
	},
	buttonStyle: {
		backgroundColor: '#0288D1',
		marginTop: 15
	},
	swipeText: {
		fontSize: 16,
		color: "#fff",
		fontFamily:'google-sans'
	},
	swipeContainer: {
		marginTop:15,
		flexDirection:'row',
		alignItems:'center',
		position:'absolute',
		bottom: 10,
		right: 10
	}
}

export default Slides;