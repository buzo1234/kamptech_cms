import axios from 'axios';

export default async function ReDeploy() {
  try {
    const res = axios.post(
      'https://api.vercel.com/v13/deployments',

      {
        target: 'production',
        gitSource: {
          org: 'techsouqdubai-devs',
          repo: 'techsouqdubai-client',
          ref: 'main',
          type: 'github',
        },
        name: 'techsouqdubai-client',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VERCEL_TOKEN}`,
        },
      }
    );

    if (res.id !== null) {
      return {
        success: true,
        message: 'Deployment started',
      };
    } else {
      return {
        success: false,
        message: res,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
}
