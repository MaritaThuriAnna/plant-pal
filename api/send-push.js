import { google } from 'googleapis';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const projectId = serviceAccount.project_id;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: 'Missing token, title, or body' });
  }

  try {
    // Step 1: Get access token using service account
    const jwtClient = new google.auth.JWT(
      serviceAccount.client_email,
      null,
      serviceAccount.private_key,
      ['https://www.googleapis.com/auth/firebase.messaging']
    );
    const { access_token } = await jwtClient.authorize();

    // Step 2: Create FCM message
    const message = {
      message: {
        token,
        notification: {
          title,
          body
        }
      }
    };

    // Step 3: Send notification via HTTP to FCM
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Push failed:', result);
      return res.status(response.status).json(result);
    }

    console.log('✅ Push sent:', result);
    return res.status(200).json(result);
  } catch (err) {
    console.error('🔥 Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err });
  }
}
