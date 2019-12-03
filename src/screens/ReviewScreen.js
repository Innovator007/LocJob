import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, Platform, Linking, Dimensions } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

class ReviewScreen extends Component {
	renderLikedJobs = () => {
		if(this.props.liked_jobs.length > 0) {
			return this.props.liked_jobs.map(likedJob => {
				const { title, url, company, location } = likedJob;
				return (
					<Card key={likedJob.id} title={title} titleStyle={{fontSize: 20, fontFamily: "google-sans"}}>
						<View>
							<Text style={{fontFamily: "google-sans", fontSize: 18}}>{company}</Text>
							<Text style={{fontFamily: "google-sans", fontSize: 16}}>Location: {location}</Text>
						</View>
						<Button
							buttonStyle={{ backgroundColor:"#03A9F4", marginTop: 15 }}
						    icon={<Icon name='code' color='#ffffff' />}
						    title='APPLY NOW' 
						    titleStyle={{fontFamily: 'google-sans'}}
						    onPress={() => Linking.openURL(url)}
						/>
					</Card>
				);
			});
		} else {
			return (
				<View style={{flex:1,height: Dimensions.get('window').height-100,justifyContent:'center',alignItems:'center',marginHorizontal:15}}>
					<Icon name='emoji-sad' type="entypo" size={100} />
					<Text style={{marginTop:10,fontFamily:'google-sans',fontSize: 25,textAlign:'center'}}>It's empty in here, no saved jobs!</Text>
					<Text style={{marginTop:10,fontFamily:'google-sans',fontSize: 20,textAlign:'center'}}>Right Swipe on a job to like it.</Text>
					<Button
						buttonStyle={{ backgroundColor:"#03A9F4", marginTop: 15 }}
					    icon={<Icon type="material-community" name="cards" color="#fff" />}
					    title='BACK TO JOBS' 
					    titleStyle={{fontFamily: 'google-sans',marginLeft: 10}}
					    onPress={() => this.props.navigation.navigate('jobs')}
					/>
				</View>
			);
		}
	}

	render() {
		return (
			<ScrollView>
				{ this.renderLikedJobs() }
			</ScrollView>
		);
	}
}

function mapStateToProps({ liked_jobs }) {
	return {
		liked_jobs
	}
}

export default connect(mapStateToProps, null)(ReviewScreen);