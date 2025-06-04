import type { NextApiRequest, NextApiResponse } from 'next';

// 重试配置
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    console.error('Invalid URL parameter:', url);
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      console.log(`Fetching URL (attempt ${retries + 1}/${MAX_RETRIES}):`, url);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://wechatrss.com/',
          'Origin': 'https://wechatrss.com'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorText,
          attempt: retries + 1
        });
        
        if (retries < MAX_RETRIES - 1) {
          retries++;
          console.log(`Retrying in ${RETRY_DELAY}ms...`);
          await delay(RETRY_DELAY);
          continue;
        }
        
        return res.status(response.status).json({
          error: `HTTP error! status: ${response.status}`,
          details: {
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            body: errorText,
            attempts: retries + 1
          }
        });
      }

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (!contentType?.includes('xml') && !contentType?.includes('text')) {
        console.error('Invalid content type:', contentType);
        if (retries < MAX_RETRIES - 1) {
          retries++;
          console.log(`Retrying in ${RETRY_DELAY}ms...`);
          await delay(RETRY_DELAY);
          continue;
        }
        return res.status(400).json({
          error: 'Invalid content type',
          details: { contentType, attempts: retries + 1 }
        });
      }

      const text = await response.text();
      console.log('Response length:', text.length);

      if (!text.trim()) {
        console.error('Empty response');
        if (retries < MAX_RETRIES - 1) {
          retries++;
          console.log(`Retrying in ${RETRY_DELAY}ms...`);
          await delay(RETRY_DELAY);
          continue;
        }
        return res.status(400).json({
          error: 'Empty response',
          details: { contentType, attempts: retries + 1 }
        });
      }

      if (!text.includes('<?xml') && !text.includes('<rss')) {
        console.error('Invalid XML response');
        if (retries < MAX_RETRIES - 1) {
          retries++;
          console.log(`Retrying in ${RETRY_DELAY}ms...`);
          await delay(RETRY_DELAY);
          continue;
        }
        return res.status(400).json({
          error: 'Invalid XML response',
          details: { contentType, preview: text.substring(0, 200), attempts: retries + 1 }
        });
      }

      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(text);
      return;
    } catch (error) {
      console.error('Error fetching URL:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        attempt: retries + 1
      });
      
      if (retries < MAX_RETRIES - 1) {
        retries++;
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await delay(RETRY_DELAY);
        continue;
      }
      
      res.status(500).json({
        error: 'Error fetching URL',
        details: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          attempts: retries + 1
        }
      });
      return;
    }
  }
} 