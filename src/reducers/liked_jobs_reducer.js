import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';
import { LIKE_JOBS, CLEAR_LIKE_JOBS, DELETE_JOB } from '../actions/types';

export default function(state=[], action) {
	switch(action.type) {
		case REHYDRATE:
			try {
				const saved = action.payload.liked_jobs;
				if(saved && saved.constructor === Array) {
					return saved;
				} else {
					return [];
				}
			} catch(e) {
				return [];
			}
		case DELETE_JOB:
			return state.filter(job => {
				return job.id !== action.payload
			});
		case LIKE_JOBS:
			return _.uniqBy([action.payload, ...state], "id");
		case CLEAR_LIKE_JOBS:
			return [];
		default: 
			return state;
	}
}