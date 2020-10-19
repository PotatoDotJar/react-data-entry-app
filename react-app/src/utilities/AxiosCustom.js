import axios from 'axios';
import config from '../config/appSettings.json';

// This is the default settings for using axios in this app
export default axios.create({
	baseURL: config.SERVER_URL,
	headers: {'X-Some-Header': "This is some header value."}
});