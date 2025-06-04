export const WECHAT_CONFIG = {
  appId: process.env.NEXT_PUBLIC_WECHAT_APP_ID || '',
  appSecret: process.env.WECHAT_APP_SECRET || '',
  token: process.env.WECHAT_TOKEN || '',
  encodingAESKey: process.env.WECHAT_ENCODING_AES_KEY || '',
}; 