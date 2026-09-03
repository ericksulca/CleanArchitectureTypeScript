/**
 * Simple function to check system health.
 * @returns {string} - Returns "OK" to indicate the system is running.
 */
export function checkHealth(): {status: string, timestamp: Date} {
    return {
        status: "OK",
        timestamp: new Date()
    };
}