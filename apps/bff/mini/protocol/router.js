const fs = require('fs');
const path = require('path');

// Load handlers dynamically or statically
const handlers = {
    metacapture: require('./handlers/metacapture'),
    // Add other handlers here:
    // horus: require('./handlers/horus'),
};

/**
 * Routes protocol requests to the appropriate handler.
 * @param {string} appName - The name of the satellite app (e.g., 'metacapture').
 * @param {object} payload - The request body.
 * @param {object} context - Context object containing db, logger, userId, etc.
 */
async function protocolRouter(appName, payload, context) {
    const handler = handlers[appName.toLowerCase()];

    if (!handler) {
        throw new Error(`Unknown protocol app: ${appName}`);
    }

    return await handler(payload, context);
}

module.exports = protocolRouter;
