#!/usr/bin/env node

/**
 * Pre-publication check script
 * Validates that the package is ready for NPM publication
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let errors = 0;
let warnings = 0;

function error(message) {
  console.log(`${RED}✗ ${message}${RESET}`);
  errors++;
}

function warning(message) {
  console.log(`${YELLOW}⚠ ${message}${RESET}`);
  warnings++;
}

function success(message) {
  console.log(`${GREEN}✓ ${message}${RESET}`);
}

function checkFileExists(path, description) {
  if (existsSync(path)) {
    success(`${description} exists`);
    return true;
  } else {
    error(`${description} missing: ${path}`);
    return false;
  }
}

console.log('🔍 Checking package for NPM publication readiness...\n');

// Check required files
checkFileExists('package.json', 'Package.json');
checkFileExists('README.md', 'README.md');
checkFileExists('LICENSE', 'LICENSE file');
checkFileExists('.gitignore', '.gitignore');
checkFileExists('.npmignore', '.npmignore');
checkFileExists('build/index.js', 'Built main file');

// Check package.json content
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  
  // Check required fields
  if (pkg.name && pkg.name !== 'code') {
    success(`Package name: ${pkg.name}`);
  } else {
    error('Package name is invalid or default');
  }

  if (pkg.version) {
    success(`Version: ${pkg.version}`);
  } else {
    error('Version is missing');
  }

  if (pkg.description && pkg.description.length > 10) {
    success('Description is present');
  } else {
    error('Description is missing or too short');
  }

  if (pkg.author && pkg.author !== '') {
    success(`Author: ${pkg.author}`);
  } else {
    warning('Author field should be updated with your name');
  }

  if (pkg.license) {
    success(`License: ${pkg.license}`);
  } else {
    error('License is missing');
  }

  if (pkg.repository?.url && !pkg.repository.url.includes('yourusername')) {
    success('Repository URL is set');
  } else {
    warning('Repository URL should be updated with your GitHub username');
  }

  if (pkg.keywords && pkg.keywords.length > 0) {
    success(`Keywords: ${pkg.keywords.length} keywords`);
  } else {
    warning('Consider adding more keywords for better discoverability');
  }

  if (pkg.files && pkg.files.includes('build')) {
    success('Build files included in publication');
  } else {
    error('Build directory not included in files array');
  }

} catch (e) {
  error('Could not parse package.json');
}

// Check if build exists and is recent
try {
  execSync('npm run build', { stdio: 'pipe' });
  success('Build completed successfully');
} catch (e) {
  error('Build failed - run "npm run build" to check');
}

// Check tests
try {
  execSync('npm test', { stdio: 'pipe' });
  success('All tests pass');
} catch (e) {
  error('Tests failing - run "npm test" to check');
}

// Check for sensitive files
const sensitiveFiles = ['.env', 'node_modules/', '.DS_Store', 'Thumbs.db'];
for (const file of sensitiveFiles) {
  if (existsSync(file)) {
    warning(`${file} exists - ensure it's in .gitignore/.npmignore`);
  }
}

// Summary
console.log('\n📊 Summary:');
if (errors === 0 && warnings === 0) {
  console.log(`${GREEN}🎉 Package is ready for publication!${RESET}`);
  console.log('\nNext steps:');
  console.log('1. npm login');
  console.log('2. npm publish --dry-run (to test)');
  console.log('3. npm publish');
} else {
  if (errors > 0) {
    console.log(`${RED}❌ ${errors} error(s) must be fixed before publication${RESET}`);
  }
  if (warnings > 0) {
    console.log(`${YELLOW}⚠️  ${warnings} warning(s) should be addressed${RESET}`);
  }
  console.log('\nRefer to PUBLISHING.md for detailed instructions.');
}

process.exit(errors > 0 ? 1 : 0);
