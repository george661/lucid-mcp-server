/**
 * Validate required environment variables
 * @returns {EnvValidationResult} Validation result
 */
export function validateEnvironment() {
    const errors = [];
    if (!process.env.LUCID_API_KEY) {
        errors.push('LUCID_API_KEY environment variable is required');
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
/**
 * Exit with environment validation errors
 * @param {string[]} errors - Array of error messages
 */
export function exitWithEnvErrors(errors) {
    console.error('Error: ' + errors[0]);
    console.error('Set it with: export LUCID_API_KEY="your_api_key_here"');
    process.exit(1);
}
