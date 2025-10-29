import { BASE_PROMPTS } from '../prompts/base-prompts.js';
export class BaseLLMClient {
    createErrorResult(error) {
        return {
            success: false,
            error,
            metadata: {
                provider: this.name,
                model: 'unknown',
                timestamp: new Date().toISOString()
            }
        };
    }
    createSuccessResult(analysis, model) {
        return {
            success: true,
            analysis,
            metadata: {
                provider: this.name,
                model,
                timestamp: new Date().toISOString()
            }
        };
    }
    validateImageBase64(imageBase64) {
        if (!imageBase64 || typeof imageBase64 !== 'string') {
            return false;
        }
        // Basic validation for base64 string
        try {
            return imageBase64.length > 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(imageBase64);
        }
        catch {
            return false;
        }
    }
    buildPrompt(request) {
        if (request.customPrompt) {
            return request.customPrompt;
        }
        return BASE_PROMPTS.LUCID_DIAGRAM_ANALYSIS;
    }
    getConfig() {
        return { ...this.config };
    }
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.reinitializeClient(newConfig);
    }
    // Subclasses can override this if they need to reinit client
    reinitializeClient(_newConfig) { }
}
