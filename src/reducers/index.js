import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './job_reducer';
import liked_jobs from './liked_jobs_reducer';

export default combineReducers({
	auth,
	jobs,
	liked_jobs
})