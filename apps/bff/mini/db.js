import pg from 'pg';
const { Pool } = pg;

// Cloud SQL connection configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // e.g., /cloudsql/project:region:instance
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    max: 10, // Max clients in pool
    idleTimeoutMillis: 30000,
};

// Only create pool if config is present (graceful fallback for local dev without DB)
let pool = null;

if (process.env.DB_HOST) {
    pool = new Pool(dbConfig);
    console.log(`[DB] Initialized connection pool to ${process.env.DB_HOST}`);
} else {
    console.warn('[DB] DB_HOST not set. Running in in-memory/file fallback mode.');
}

export async function query(text, params) {
    if (!pool) {
        throw new Error('Database not configured');
    }
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        // console.log('[DB] executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('[DB] query error', { text, error });
        throw error;
    }
}

export async function getClient() {
    if (!pool) {
        throw new Error('Database not configured');
    }
    const client = await pool.connect();
    return client;
}

export const isDbEnabled = () => !!pool;
