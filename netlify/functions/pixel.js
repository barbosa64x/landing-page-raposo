/**
 * NETLIFY SERVERLESS FUNCTION - META CONVERSIONS API (CAPI)
 * 
 * Envia eventos de conversão diretamente do servidor para a API do Facebook,
 * garantindo rastreamento 100% preciso mesmo com AdBlockers no celular.
 */

const https = require('https');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const pixelId = process.env.FACEBOOK_PIXEL_ID || data.pixelId;
    const accessToken = process.env.FACEBOOK_CAPI_TOKEN || data.token;

    if (!pixelId || !accessToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'FACEBOOK_PIXEL_ID ou FACEBOOK_CAPI_TOKEN não configurado.' })
      };
    }

    const payload = JSON.stringify({
      data: [
        {
          event_name: data.eventName || 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: data.sourceUrl || 'https://raposopromocoes.com',
          user_data: {
            client_user_agent: event.headers['user-agent'] || '',
            client_ip_address: event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || ''
          },
          custom_data: {
            button_location: data.location || 'telegram_button',
            currency: 'BRL',
            value: 0.00
          }
        }
      ]
    });

    const options = {
      hostname: 'graph.facebook.com',
      path: `/v21.0/${pixelId}/events?access_token=${accessToken}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          resolve({
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true, metaResponse: JSON.parse(responseBody || '{}') })
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: err.message })
        });
      });

      req.write(payload);
      req.end();
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno ao processar evento CAPI.' })
    };
  }
};

