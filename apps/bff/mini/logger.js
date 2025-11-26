// Structured Logger for Cloud Logging

const SEVERITY = {
    DEFAULT: 'DEFAULT',
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    NOTICE: 'NOTICE',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    CRITICAL: 'CRITICAL',
    ALERT: 'ALERT',
    EMERGENCY: 'EMERGENCY',
};

function formatLog(severity, message, context = {}) {
    const entry = {
        severity,
        message,
        timestamp: new Date().toISOString(),
        ...context,
    };
    // Cloud Logging prefers single-line JSON
    return JSON.stringify(entry);
}

export const logger = {
    debug: (message, context) => console.log(formatLog(SEVERITY.DEBUG, message, context)),
    info: (message, context) => console.log(formatLog(SEVERITY.INFO, message, context)),
    warn: (message, context) => console.log(formatLog(SEVERITY.WARNING, message, context)),
    error: (message, context) => console.error(formatLog(SEVERITY.ERROR, message, context)),
    critical: (message, context) => console.error(formatLog(SEVERITY.CRITICAL, message, context)),
};
