import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { PORT, CONNECTION_URL,SENDER_EMAIL, EMAIL_PASSWORD, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME, AWS_REGION, FRONTEND_URL, API_KEY } = process.env;

// Correctly destructure and export the variables
export const port = PORT;
export const connectionUrl = CONNECTION_URL;
export const senderEmail = SENDER_EMAIL;
export const emailPassword = EMAIL_PASSWORD;
export const awsAccessKey = AWS_ACCESS_KEY;
export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
export const awsBucketName = AWS_BUCKET_NAME;
export const awsRegion = AWS_REGION
export const frontendUrl = FRONTEND_URL;
export const apiKey = API_KEY;