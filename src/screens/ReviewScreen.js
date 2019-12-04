import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	ScrollView, 
	View, 
	Text, 
	Platform, 
	Linking, 
	Dimensions, 
	TouchableWithoutFeedback,
	Alert
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { deleteJob } from '../actions';

class ReviewScreen extends Component {
	onJobDelete = (jobId) => {
		Alert.alert(
		  'Delete Saved Job',
		  'Do you really want to delete this job?',
		  [
		    {
		      text: 'Nah!',
		      onPress: () => console.log('Cancel Pressed'),
		      style: 'cancel',
		    },
		    {text: 'Confirm', onPress: () => this.props.deleteJob(jobId)},
		  ],
		  {cancelable: false},
		);
	}

	renderLikedJobs = () => {
		if(this.props.liked_jobs.length > 0) {
			return this.props.liked_jobs.map(likedJob => {
				const { title, url, company, location } = likedJob;
				return (
					<Card key={likedJob.id} title={title} titleStyle={{fontSize: 20, fontFamily: "google-sans"}}>
						<View>
							<Text style={{fontFamily: "google-sans", fontSize: 18}}>{company}</Text>
							<Text style={{fontFamily: "google-sans", fontSize: 16}}>Location: {location}</Text>
							<TouchableWithoutFeedback onPress={() => this.onJobDelete(likedJob.id)}>
								<View style={styles.removeIcon}>
									<Icon name="delete" color='#121212' />
								</View>
							</TouchableWithoutFeedback>
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
				{ this.props.liked_jobs.length > 0 ? 
					<View>	
						<Text style={styles.savedNumberTitle}>{ this.props.liked_jobs.length } saved jobs</Text>
					</View> : null 
				}
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

const styles = {
	savedNumberTitle: {
		fontFamily: 'google-sans',
		fontSize: 20,
		marginVertical: 5,
		textAlign: 'center'
	},
	removeIcon: {
		position: 'absolute',
		right: 5,
		top: 0
	}
}

export default connect(mapStateToProps, { deleteJob })(ReviewScreen);