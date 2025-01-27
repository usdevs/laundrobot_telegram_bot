import dotenv from 'dotenv';

// Load .env file into process.env
dotenv.config();

const requiredEnvVars = ['MONGODB_CONN', 'SERVER_PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error(
      `❌ Missing required environment variable(s): ${missingVars.join(', ')}\n` + 
      "Please check if you have a .env file in the root directory with the correct variables."
    );
    process.exit(0);
}

const config = {
    mongodbConnection: process.env['MONGODB_CONN'],
    port: (() => {
        const port = parseInt(process.env['SERVER_PORT']);
        if (isNaN(port)) {
            console.error('❌ SERVER_PORT must be a valid number');
            process.exit(0);
        }
        if (port < 1 || port > 65535) {
            console.error('❌ SERVER_PORT must be between 1 and 65535');
            process.exit(0);
        }
        return port;
    })()
};

export default config;
