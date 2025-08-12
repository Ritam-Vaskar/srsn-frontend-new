// Token management utility for access and refresh tokens

const TOKEN_KEYS = {
  // User tokens
  USER_ACCESS_TOKEN: 'userAccessToken',
  USER_REFRESH_TOKEN: 'userRefreshToken',
  // Alumni tokens
  ALUMNI_ACCESS_TOKEN: 'alumniAccessToken',
  ALUMNI_REFRESH_TOKEN: 'alumniRefreshToken'
};

// === USER TOKEN FUNCTIONS ===

// Get user tokens from localStorage
export const getUserAccessToken = () => {
  return localStorage.getItem(TOKEN_KEYS.USER_ACCESS_TOKEN);
};

export const getUserRefreshToken = () => {
  return localStorage.getItem(TOKEN_KEYS.USER_REFRESH_TOKEN);
};

// Set user tokens in localStorage
export const setUserTokens = (accessToken, refreshToken) => {
  localStorage.setItem(TOKEN_KEYS.USER_ACCESS_TOKEN, accessToken);
  localStorage.setItem(TOKEN_KEYS.USER_REFRESH_TOKEN, refreshToken);
};

// Clear user tokens from localStorage
export const clearUserTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.USER_ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.USER_REFRESH_TOKEN);
};

// Check if user access token exists
export const hasUserAccessToken = () => {
  return !!getUserAccessToken();
};

// === ALUMNI TOKEN FUNCTIONS ===

// Get alumni tokens from localStorage
export const getAlumniAccessToken = () => {
  return localStorage.getItem(TOKEN_KEYS.ALUMNI_ACCESS_TOKEN);
};

export const getAlumniRefreshToken = () => {
  return localStorage.getItem(TOKEN_KEYS.ALUMNI_REFRESH_TOKEN);
};

// Set alumni tokens in localStorage
export const setAlumniTokens = (alumniAccessToken, alumniRefreshToken) => {
  localStorage.setItem(TOKEN_KEYS.ALUMNI_ACCESS_TOKEN, alumniAccessToken);
  localStorage.setItem(TOKEN_KEYS.ALUMNI_REFRESH_TOKEN, alumniRefreshToken);
};

// Clear alumni tokens from localStorage
export const clearAlumniTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.ALUMNI_ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.ALUMNI_REFRESH_TOKEN);
};

// Check if alumni access token exists
export const hasAlumniAccessToken = () => {
  return !!getAlumniAccessToken();
};

// === BACKWARD COMPATIBILITY (OLD FUNCTIONS) ===
// Keep these for existing code that hasn't been updated yet
export const getAccessToken = getUserAccessToken;
export const getRefreshToken = getUserRefreshToken;
export const setTokens = setUserTokens;
export const clearTokens = clearUserTokens;
export const hasAccessToken = hasUserAccessToken;

// Create Authorization header for users
export const createUserAuthHeader = () => {
  const token = getUserAccessToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Create Authorization header for alumni
export const createAlumniAuthHeader = () => {
  const token = getAlumniAccessToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Refresh user token function
export const refreshUserAccessToken = async () => {
  const refreshToken = getUserRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No user refresh token available');
  }

  try {
    console.log('Attempting to refresh user access token...');
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const result = await response.json();
    
    if (!result.success) {
      console.error('Token refresh failed:', result.message);
      clearUserTokens();
      throw new Error(result.message || 'Failed to refresh user token');
    }

    // Update user tokens
    setUserTokens(result.accessToken, result.refreshToken);
    console.log('User tokens refreshed successfully');
    return result.accessToken;
  } catch (error) {
    console.error('refreshUserAccessToken error:', error);
    clearUserTokens();
    throw error;
  }
};

// Refresh alumni token function
export const refreshAlumniAccessToken = async () => {
  const alumniRefreshToken = getAlumniRefreshToken();
  
  if (!alumniRefreshToken) {
    throw new Error('No alumni refresh token available');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/alumniRefreshToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alumniRefreshToken })
    });

    const result = await response.json();
    
    if (!result.success) {
      clearAlumniTokens();
      throw new Error(result.message || 'Failed to refresh alumni token');
    }

    // Update alumni tokens
    setAlumniTokens(result.alumniAccessToken, result.alumniRefreshToken);
    return result.alumniAccessToken;
  } catch (error) {
    clearAlumniTokens();
    throw error;
  }
};

// Make authenticated API request for users with automatic token refresh
export const makeUserAuthenticatedRequest = async (url, options = {}) => {
  const makeRequest = async (token) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    };

    return fetch(url, {
      ...options,
      headers
    });
  };

  let accessToken = getUserAccessToken();
  
  if (!accessToken) {
    throw new Error('No user access token available');
  }

  try {
    // Try with current access token
    let response = await makeRequest(accessToken);
    
    // If token is expired, try to refresh
    if (response.status === 401) {
      console.log('Access token expired, attempting refresh...');
      try {
        accessToken = await refreshUserAccessToken();
        console.log('Token refreshed successfully, retrying request...');
        response = await makeRequest(accessToken);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('User authentication failed. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    // Don't log token refresh errors here as they're already handled above
    if (!error.message?.includes('authentication failed')) {
      console.error('makeUserAuthenticatedRequest error:', error);
    }
    throw error;
  }
};

// Make authenticated API request for alumni with automatic token refresh
export const makeAlumniAuthenticatedRequest = async (url, options = {}) => {
  const makeRequest = async (token) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    };

    return fetch(url, {
      ...options,
      headers
    });
  };

  let accessToken = getAlumniAccessToken();
  
  if (!accessToken) {
    throw new Error('No alumni access token available');
  }

  try {
    // Try with current access token
    let response = await makeRequest(accessToken);
    
    // If token is expired, try to refresh
    if (response.status === 401) {
      console.log('Alumni access token expired, attempting refresh...');
      try {
        accessToken = await refreshAlumniAccessToken();
        console.log('Alumni token refreshed successfully, retrying request...');
        response = await makeRequest(accessToken);
      } catch (refreshError) {
        console.error('Alumni token refresh failed:', refreshError);
        throw new Error('Alumni authentication failed. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    // Don't log token refresh errors here as they're already handled above
    if (!error.message?.includes('authentication failed')) {
      console.error('makeAlumniAuthenticatedRequest error:', error);
    }
    throw error;
  }
};

// === BACKWARD COMPATIBILITY ===
// Keep these for existing code that hasn't been updated yet
export const createAuthHeader = createUserAuthHeader;
export const refreshAccessToken = refreshUserAccessToken;
export const makeAuthenticatedRequest = makeUserAuthenticatedRequest;

// === AUTOMATIC TOKEN REFRESH SERVICE ===
let tokenRefreshInterval = null;

// Start automatic token refresh for users (runs every 30 seconds to check)
export const startUserTokenRefreshService = () => {
  if (tokenRefreshInterval) return; // Already running
  
  tokenRefreshInterval = setInterval(async () => {
    if (hasUserAccessToken()) {
      try {
        // Only refresh if token is close to expiry (refresh every 30 seconds for 1 minute tokens)
        await refreshUserAccessToken();
        console.log('Auto-refreshed user token');
      } catch (error) {
        console.error('Auto token refresh failed:', error);
        // Token refresh failed, user will be logged out on next request
        clearInterval(tokenRefreshInterval);
        tokenRefreshInterval = null;
      }
    } else {
      // No token, stop the service
      clearInterval(tokenRefreshInterval);
      tokenRefreshInterval = null;
    }
  }, 30000); // Every 30 seconds for testing (1 minute tokens)
};

// Stop automatic token refresh
export const stopUserTokenRefreshService = () => {
  if (tokenRefreshInterval) {
    clearInterval(tokenRefreshInterval);
    tokenRefreshInterval = null;
  }
};
