const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessSecretVersion(name) {
  const [version] = await client.accessSecretVersion({
    name: name,
  });

  const payload = version.payload.data.toString();
  return payload;
}

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`
  Method ${method} Not Allowed`);
  }

  const { prompt, file } = req.body;

  try {
    const apiKey = await accessSecretVersion('projects/YOUR_PROJECT_ID/secrets/YOUR_SECRET_ID/versions/latest');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: 'You are an AI assistant specializing in audit disk risk assessment for the medical device and pharmaceutical industries.',
        }, {
          role: 'user',
          content: prompt,
        }],
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred during analysis.' });
  }
}
