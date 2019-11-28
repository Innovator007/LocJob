import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from '../actions/types';

export default function(state={ token: null, profile: {} }, action) {
	switch(action.type) {
		case FB_LOGIN_SUCCESS:
			return { token: action.payload.token, profile: action.payload.profile };
		case FB_LOGIN_FAIL: 
			return { token: null, profile: null };
		default: 
			return state;
	}
}