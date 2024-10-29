import { createClient } from 'redis';
import { redisHostName, redisPassword, redisPostNumber } from '../config/config.js';

const client = await createClient({
    password: redisPassword,
    socket: {
        host: redisHostName,
        port: redisPostNumber,
    }
}).on('error', err => console.error('Redis Client Error', err))
.connect();;

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
    // Set key and value in Redis
    await client.set(key, url);
    console.log(`Saved to Redis: ${key} -> ${url}`);
  } catch (error) {
    console.error('Error saving to Redis:', error);
  } 
}

export const getFromRedis = async  (key) =>  {
  try {
    // Get value from Redis
    const value = await client.get(key);
    console.log(`Retrieved from Redis: ${key} -> ${value}`);
    return value;
  } catch (error) {
    console.error('Error retrieving from Redis:', error);
  }
}

export const removeFromRedis = async (key) =>  {
  console.log(key)
  try {
    // Get delete from Redis
    const value = await client.del([`${key}`]);
    console.log(`Retrieved from Redis: ${key} -> ${value}`);
    return value;
  } catch (error) {
    console.error('Error deleting from Redis:', error);
  }
}