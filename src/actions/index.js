import { AsyncStorage } from 'react-native';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { googleApiKey, facebookAppKey } from '../../config';
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL, FETCH_JOBS, LIKE_JOBS, CLEAR_LIKE_JOBS, DELETE_JOB } from './types';

const JOB_ROOT_URL = 'https://jobs.github.com/positions.json?';

export const isLoggedIn = () => async dispatch => {
	let token = await AsyncStorage.getItem('fb_token');
	if(token) {
		fetchUserData(token,dispatch);
	}
}

export const likeJobs = (job) => {
	return {
		type: LIKE_JOBS,
		payload: job
	}
}

export const deleteJob = (jobId) => {
	return {
		type: DELETE_JOB,
		payload: jobId
	}
}

export const clearlikedJobs = () => {
	return {
		type: CLEAR_LIKE_JOBS
	}
}

async function fetchUserData(token, dispatch) {
	const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
	const profile = await axios.get(`https://graph.facebook.com/${response["data"]["id"]}?fields=id,name,email&access_token=${token}`);
	dispatch({
		type: FB_LOGIN_SUCCESS,
		payload: {
			token,
			profile: {
				id: profile["data"]["id"],
				name: profile["data"]["name"],
				email: profile["data"]["email"],
				avatar: `https://graph.facebook.com/${profile["data"]["id"]}/picture?type=large`
			}
		}
	});
}

export const fetchJobs = (region, description, cb) => async dispatch => {
	try {
		let zip = await reverseGeocode(region,key=googleApiKey);
		const queryParams = qs.stringify({ location: zip, description });
		const query = `${JOB_ROOT_URL}${queryParams}`;
		let res = await axios.get(query);
		dispatch({
			type: FETCH_JOBS,
			payload: res.data
		});
		cb();
	} catch(e) {
		console.log(e);
	}
}

export const facebookLogin = () => async dispatch => {
	let token = await AsyncStorage.getItem('fb_token');
	if(token) {
		//user has logged in before
		fetchUserData(token,dispatch);
	} else {
		//user needs to login with facebook
		doFacebookLogin(dispatch);
	}	
}

const doFacebookLogin = async (dispatch) => {
	let { type, token } = await Facebook.logInWithReadPermissionsAsync(facebookAppKey, {
		permissions: ['public_profile','email']
	});
	if(type === "cancel") {
		return dispatch({
			type: FB_LOGIN_FAIL
		});
	}
	await AsyncStorage.setItem('fb_token', token);
	const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
	const profile = await axios.get(`https://graph.facebook.com/${response["data"]["id"]}?fields=id,name,email&access_token=${token}`);
	dispatch({
		type: FB_LOGIN_SUCCESS,
		payload: {
			token,
			profile: {
				id: profile["data"]["id"],
				name: profile["data"]["name"],
				email: profile["data"]["email"],
				avatar: `https://graph.facebook.com/${profile["data"]["id"]}/picture?type=large`
			}
		}
	});
}
