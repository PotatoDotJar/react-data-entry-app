import axios from 'axios';

// This is the default settings for using axios in this app
export default axios.create({
	baseURL: "/",
	headers: {'X-Some-Header': "This is some header value."}
});