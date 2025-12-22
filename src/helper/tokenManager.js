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
    // Use relative URL - nginx/proxy will route to backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const refreshUrl = backendUrl ? `${backendUrl}/api/refresh-token` : '/api/refresh-token';
    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to refresh user token';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      console.error('Token refresh failed:', errorMessage, 'Status:', response.status);
      clearUserTokens();
      throw new Error(errorMessage);
    }

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
    // Use relative URL - nginx/proxy will route to backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
    const refreshUrl = backendUrl ? `${backendUrl}/api/alumniRefreshToken` : '/api/alumniRefreshToken';
    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ alumniRefreshToken })
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'Failed to refresh alumni token';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      console.error('Alumni token refresh failed:', errorMessage, 'Status:', response.status);
      clearAlumniTokens();
      throw new Error(errorMessage);
    }

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
    
    // If token is expired (401) or unauthorized (403), try to refresh
    if (response.status === 401 || response.status === 403) {
      console.log('Access token expired or invalid, attempting refresh...');
      try {
        accessToken = await refreshUserAccessToken();
        console.log('Token refreshed successfully, retrying request...');
        response = await makeRequest(accessToken);
        
        // If still getting 401/403 after refresh, token refresh failed
        if (response.status === 401 || response.status === 403) {
          throw new Error('Token refresh failed. Please login again.');
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('User authentication failed. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    // Don't log token refresh errors here as they're already handled above
    if (!error.message?.includes('authentication failed') && !error.message?.includes('login again')) {
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
    
    // If token is expired (401) or unauthorized (403), try to refresh
    if (response.status === 401 || response.status === 403) {
      console.log('Alumni access token expired or invalid, attempting refresh...');
      try {
        accessToken = await refreshAlumniAccessToken();
        console.log('Alumni token refreshed successfully, retrying request...');
        response = await makeRequest(accessToken);
        
        // If still getting 401/403 after refresh, token refresh failed
        if (response.status === 401 || response.status === 403) {
          throw new Error('Alumni token refresh failed. Please login again.');
        }
      } catch (refreshError) {
        console.error('Alumni token refresh failed:', refreshError);
        throw new Error('Alumni authentication failed. Please login again.');
      }
    }
    
    return response;
  } catch (error) {
    // Don't log token refresh errors here as they're already handled above
    if (!error.message?.includes('authentication failed') && !error.message?.includes('login again')) {
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
let consecutiveFailures = 0;
const MAX_CONSECUTIVE_FAILURES = 3;

// Start automatic token refresh for users (runs every 30 seconds to check)
export const startUserTokenRefreshService = () => {
  if (tokenRefreshInterval) {
    console.log('🔄 Token refresh service already running');
    return; // Already running
  }
  
  console.log('🚀 Starting automatic token refresh service...');
  consecutiveFailures = 0; // Reset failure counter
  
  tokenRefreshInterval = setInterval(async () => {
    if (!hasUserAccessToken()) {
      // No token, stop the service
      console.log('⚠️ No access token found, stopping refresh service');
      clearInterval(tokenRefreshInterval);
      tokenRefreshInterval = null;
      consecutiveFailures = 0;
      return;
    }

    // Check if refresh token exists
    if (!getUserRefreshToken()) {
      console.log('⚠️ No refresh token found, stopping refresh service');
      clearInterval(tokenRefreshInterval);
      tokenRefreshInterval = null;
      consecutiveFailures = 0;
      return;
    }

    try {
      // Refresh token proactively before it expires
      console.log('🔄 Auto-refreshing user token...');
      await refreshUserAccessToken();
      console.log('✅ Auto-refreshed user token successfully');
      consecutiveFailures = 0; // Reset on success
    } catch (error) {
      consecutiveFailures++;
      console.error(`❌ Auto token refresh failed (${consecutiveFailures}/${MAX_CONSECUTIVE_FAILURES}):`, error.message);
      
      // Only stop if we've failed multiple times consecutively
      // This handles cases where refresh token is expired or invalid
      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        console.error('🛑 Too many consecutive refresh failures, stopping service');
        clearInterval(tokenRefreshInterval);
        tokenRefreshInterval = null;
        consecutiveFailures = 0;
        // Don't clear tokens here - let the next API call handle it
      }
      // Otherwise, keep trying - might be temporary network issue
    }
  }, 30000); // Every 30 seconds for testing (1 minute tokens)
};

// Stop automatic token refresh
export const stopUserTokenRefreshService = () => {
  if (tokenRefreshInterval) {
    console.log('🛑 Stopping automatic token refresh service');
    clearInterval(tokenRefreshInterval);
    tokenRefreshInterval = null;
    consecutiveFailures = 0;
  }
};
