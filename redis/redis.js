import { createClient } from 'redis';
import { redisHostName, redisPassword, redisPostNumber } from '../config/config.js';

const client = createClient({
    password: redisPassword,
    socket: {
        host: redisHostName,
        port: redisPostNumber,
    }
});

// Handle connection events
client.on('connect', () => {
  console.log('Connected to Redis');
});
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Function to save string and URL as key-value
export const saveToRedis = async (key, url) => {
  try {
    await client.connect();
    // Set key and value in Redis
    await client.set(key, url);
    console.log(`Saved to Redis: ${key} -> ${url}`);
  } catch (error) {
    console.error('Error saving to Redis:', error);
  } finally {
    // Close the Redis connection
    client.quit();
  }
}

export const getFromRedis = async  (key) =>  {
  try {
    await client.connect();
    // Get value from Redis
    const value = await client.get(key);
    console.log(`Retrieved from Redis: ${key} -> ${value}`);
    return value;
  } catch (error) {
    console.error('Error retrieving from Redis:', error);
  } finally {
    // Close the Redis connection
    client.quit();
  }
}
