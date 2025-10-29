import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
/**
 * Get version from package.json dynamically
 * @returns {string} Version string or fallback version
 */
export function getVersion() {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const packagePath = join(__dirname, '..', '..', 'package.json');
        const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
        return packageJson.version && packageJson.version.trim() ? packageJson.version : '0.1.1'; // fallback if version is missing or empty
    }
    catch (error) {
        return '0.1.1'; // fallback version
    }
}
