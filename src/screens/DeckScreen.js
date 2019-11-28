import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { likeJobs } from '../actions';
import HTML from 'react-native-render-html';
import Deck from '../components/Deck';

class DeckScreen extends Component {
	renderCard = (job) => {
		return (
			<Card containerStyle={{height: Dimensions.get('window').height - 120}} title={job.title} titleStyle={{fontSize: 20, fontFamily: "google-sans"}}>
				<View>
					<Text style={{fontFamily: "google-sans",fontSize:18}}>{job.company}</Text>
					<Text style={{fontFamily: "google-sans",marginTop: 15, fontSize:16}}>Location: {job.location}</Text>
					<Text style={{fontFamily: "google-sans",marginTop: 15, fontSize:16}}>Job Description:</Text>
					<HTML tagsStyles={{ p: { fontFamily: 'google-sans',marginTop: 10 } }} html={job.description.substring(0,500) + "<span>...</span>"} />
				</View>
			</Card>
		);
	}

	renderAppropriateContent = () => {
		if(this.props.hasSearched && this.props.jobs.length === 0) {
			return (
				<View style={{marginVertical: 15,marginTop: 5}}>
					<Text style={{fontFamily:'google-sans', fontSize: 20, textAlign:'center'}}>Please relax the search criteria and try moving around the marker to a different location!</Text>
				</View>
			);
		} else if(this.props.hasSearched && this.props.jobs.length > 0) {
			return (
				<View style={{marginVertical: 15,marginTop: 5}}>
					<Text style={{fontFamily:'google-sans', fontSize: 20, textAlign:'center'}}>Find more jobs by moving the marker.</Text>
				</View>
			);
		} else {
			return (
				<View style={{marginVertical: 15,marginTop: 5}}>
					<Text style={{fontFamily:'google-sans', fontSize: 20, textAlign:'center'}}>Mark Location on the map and click search area button to show a list of jobs in that area!</Text>
				</View>
			);
		}
	}

	renderNoMoreCards = () => {
		return (
			<View>
				<Card titleStyle={{fontSize: 22, fontFamily: "google-sans"}} title={(this.props.hasSearched && this.props.jobs.length === 0) ? "No Jobs Available" : "Find Your Job"}>
					{ this.renderAppropriateContent() }
					<Button
						title="BACK TO MAP"
						titleStyle={{fontFamily: 'google-sans'}}
						icon={{name: 'my-location', color: '#fff'}}
						buttonStyle={{backgroundColor:"#03a9f4"}}
						onPress={() => this.props.navigation.navigate("map")}
					/>
				</Card>
			</View>
		);
	}
	render() {
		return (
			<View>
				<Deck 
					data={this.props.jobs} 
					renderCard={this.renderCard}
					onSwipeRight={job => this.props.likeJobs(job)}
					renderNoMoreCards={this.renderNoMoreCards}
				/>
			</View>
		);
	}
}

function mapStateToProps({ jobs }) {
	return {
		jobs: jobs.results,
		hasSearched: jobs.hasSearched
	}
}

export default connect(mapStateToProps, { likeJobs })(DeckScreen);