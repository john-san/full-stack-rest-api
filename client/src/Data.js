import config from './config';
import axios from 'axios';

class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
  
    // must use data on config obj for axios
    if (body !== null) {
      options.data = body;
    }
    console.log(options);
    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return axios(url, options);
  }

  // Look for user and verify if credentials match 
  // returns user data OR null to Context's signIn()
  async getUser(emailAddress, password) {
    try {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
      if (response.status === 200) {
        console.log('success');
        return response.data;
      } else {
        console.log(response);
        throw new Error('Something went wrong while trying to retrieve User Data!');
      }
    } catch (err) {
      // 401 === Invalid credentials
      console.log(err.toJSON());
      return null;
    }
  }
  
  async createUser(user) {
    try {
      const response = await this.api('/users', 'POST', user);
      if (response.status === 201) {
        return { status: 201 };
      } else {
        console.log(response);
        throw new Error("Something went wrong while trying to create a new User!");
      }
    } catch (err) {
      // 400 === bad request
      console.log(err);
      return { status: 400, errors: err.response.data };
    }
  }
}


export default Data;