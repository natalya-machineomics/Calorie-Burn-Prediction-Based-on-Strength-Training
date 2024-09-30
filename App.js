import React, { useState, useEffect } from 'react';
import { OAuth2Client } from 'react-oauth2-code-pkce';
import axios from 'axios';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [fitbitData, setFitbitData] = useState(null);

  const clientId = 'YOUR_FITBIT_CLIENT_ID';
  const redirectUri = 'http://localhost:3000';
  const authorizationUri = 'https://www.fitbit.com/oauth2/authorize';
  const tokenUri = 'https://api.fitbit.com/oauth2/token';
  const scopes = ['activity', 'heartrate'];

  const authClient = new OAuth2Client({
    clientId,
    authorizationUri,
    tokenUri,
    redirectUri,
    scopes,
  });

  // Handle OAuth redirect after user logs in
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      authClient
        .getAccessToken(code)
        .then((token) => {
          setAccessToken(token);
        })
        .catch((error) => {
          console.error('Error getting access token', error);
        });
    }
  }, []);

  // Fetch Fitbit data
  const fetchFitbitData = () => {
    axios
      .get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setFitbitData(response.data['activities-heart']);
      })
      .catch((error) => {
        console.error('Error fetching Fitbit data', error);
      });
  };

  return (
    <div>
      <h1>Fitbit Data Integration</h1>
      {!accessToken ? (
        <button onClick={() => authClient.authorize()}>Connect Fitbit</button>
      ) : (
        <div>
          <button onClick={fetchFitbitData}>Fetch Fitbit Data</button>
          {fitbitData && (
            <div>
              <h3>Heart Rate Data:</h3>
              <pre>{JSON.stringify(fitbitData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

