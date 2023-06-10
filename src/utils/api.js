// MODULES
import axios from 'axios';

// CONFIG
import config from '../config';

/**
 *
 * AXIOS axios_instance configuration
 *
 */
export const axios_instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API function return types
 *
 * ERROR { code: 'ERR_BAD_REQUEST', message: 'Credentials are not provided', type: 'auth:signin', data: undefined }
 *
 * SUCCESS { data: { _id: '123' }, headers: { 'Content-Type: 'application/json' }, code: undefined }
 *
 */

/**
 *
 * GET PROFILE data from the server, also checks if current user is logged in with sid cookie?
 *
 */
export async function auth_get_profile(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_get_profile');
  }

  const url = config.api_endpoint + '/v' + version + '/profile';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'Network connection error' };
    }

    if (!err.response) {
      return { code: err.code, message: err.message };
    }

    return { ...err.response.data, code: err.code, data: undefined };
  }
}

/**
 *
 * auth_signup Use this to sign a user to the database
 */
export async function auth_signup(version = 1, body) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_signup');
  }

  if (!body) {
    throw new Error('Body or Context not provided in auth_signup');
  }

  const url = config.api_endpoint + '/v' + version + '/auth_signup';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

/**
 *
 * auth_login Use this to log the user into server
 */
export async function auth_login(version = 1, body) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_signup');
  }

  if (!body) {
    throw new Error('Body or Context not provided in auth_signup');
  }

  const url = config.api_endpoint + '/v' + version + '/signin';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

/**
 *
 * VERIFY EMAIL
 *
 */
export async function auth_verify_email(version = 1, token) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_signup');
  }

  if (!token) {
    throw new Error('Token or Context not provided in auth_verify_email');
  }

  const url = config.api_endpoint + '/v' + version + '/verify-email/' + token;

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

/**
 *
 * auth_signout
 *
 */
export async function auth_signout(version = 1) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_signup');
  }

  const url = config.api_endpoint + '/v' + version + '/auth_signout';

  try {
    const res = await axios_instance.get(url);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

/**
 *
 * EMAIL APIS
 *
 */
export async function auth_email_send_password_reset_link(version = 1, body) {
  if (!Number(version)) {
    throw new Error('Invalid api version specified in auth_signup');
  }

  if (!body) {
    throw new Error('Body or Context not provided in auth_signup');
  }

  const url =
    config.api_endpoint + '/v' + version + '/email/send-password-reset-link';

  try {
    const res = await axios_instance.post(url, body);

    res.code = undefined;

    return res;
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return { code: err.code, message: 'No internet connection' };
    }

    if (!err.response) {
      return { code: err.code, message: err.name };
    }

    return { ...err.response.data, code: err.code };
  }
}

export default {
  axios_instance,
  auth_get_profile,
  auth_signup,
  auth_login,
  auth_signout,
  auth_verify_email,
  auth_email_send_password_reset_link,
};
