import React, { useState } from 'react';

function App() {
  const [authMessage, setAuthMessage] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  const authData = {
    email: '1rn22is092.naitikkumar@rnsit.ac.in',
    name: 'Naitik Kumar',
    rollNo: '1rn22is092',
    accessCode: 'pmVsEh',
    clientID: 'd9cbb699-6a27-44a5-8d59-8b1befa816da',
    clientSecret: 'tVJaaaRBSeXcRXeM',
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoadingAuth(true);
    setAuthMessage('');

    try {
      const res = await fetch('http://20.244.56.144/evaluation-service/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });

      if (!res.ok) {
        setAuthMessage(`Auth error: ${res.status}`);
      } else {
        const result = await res.json();
        setAuthMessage('Auth success:\n' + JSON.stringify(result, null, 2));
      }
    } catch (err) {
      setAuthMessage('Auth failed: ' + err.message);
    }

    setLoadingAuth(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial', padding: 20 }}>
      <h2>Authenticate</h2>
      <button
        onClick={handleAuth}
        disabled={loadingAuth}
        style={{ padding: 10, width: '100%' }}
      >
        {loadingAuth ? 'Sending...' : 'Submit Auth'}
      </button>
      {authMessage && <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{authMessage}</pre>}
    </div>
  );
}

export default App;
