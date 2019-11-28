import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';
import { LIKE_JOBS, CLEAR_LIKE_JOBS } from '../actions/types';

export default function(state=[], action) {
	switch(action.type) {
		case REHYDRATE:
			return action.payload.liked_jobs || [];
		case LIKE_JOBS:
			return _.uniqBy([action.payload, ...state], "id");
		case CLEAR_LIKE_JOBS:
			return [];
		default: 
			return state;
	}
}