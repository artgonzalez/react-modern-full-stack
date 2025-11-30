import { app } from './app.js'
import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'

dotenv.config();

/**
 * Main application startup function.
 */
async function startServer() {
    try {
        // Ensure necessary environment variables are set
        if (!process.env.PORT) {
            throw new Error('PORT environment variable not defined.');
        }

        // Initialize the database connection
        console.log('Connecting to database...');
        await initDatabase();
        console.log('Database connected successfully.');

        const PORT = process.env.PORT;
        
        // Start the Express server
        app.listen(PORT, () => {
            console.info(`✅ Express server running on http://localhost:${PORT}`);
        });

    } catch (err) {
        // Handle errors during database connection or startup
        console.error('❌ Application startup failed:', err.message);
        // Exit the process with failure code
        process.exit(1); 
    }
}

// Execute the startup function
startServer();