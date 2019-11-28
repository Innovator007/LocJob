import { FETCH_JOBS } from '../actions/types';

export default function(state={ results: [], hasSearched: false }, action) {
	switch(action.type) {
		case FETCH_JOBS:
			return { results: action.payload, hasSearched: true };
		default: 
			return state;
	}
}