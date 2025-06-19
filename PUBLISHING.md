# Publishing Guide

This document explains how to publish the Lucid MCP Server to NPM and maintain the project.

## Prerequisites

1. **NPM Account**
   - Create account at [npmjs.com](https://www.npmjs.com/)
   - Verify your email address

2. **NPM CLI Setup**
   ```bash
   npm login
   ```

3. **Repository Setup**
   - Push code to GitHub
   - Create repository: `https://github.com/yourusername/lucid-mcp-server`

## Pre-Publication Checklist

### 1. Update Package Information

Edit `package.json`:
```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "url": "git+https://github.com/yourusername/lucid-mcp-server.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/lucid-mcp-server/issues"
  },
  "homepage": "https://github.com/yourusername/lucid-mcp-server#readme"
}
```

### 2. Update License

Edit `LICENSE` file:
- Replace `[Your Name]` with your actual name

### 3. Test Everything

```bash
# Install dependencies
npm install

# Run tests
npm test
npm run test:coverage

# Build the project
npm run build

# Test installation locally
npm pack
npm install -g ./lucid-mcp-server-*.tgz
```

### 4. Version Management

Use semantic versioning:
```bash
# Patch version (0.1.0 -> 0.1.1)
npm version patch

# Minor version (0.1.0 -> 0.2.0)
npm version minor

# Major version (0.1.0 -> 1.0.0)
npm version major
```

## Publishing Steps

### 1. First-Time Publication

```bash
# Dry run to check what will be published
npm publish --dry-run

# Publish to NPM
npm publish
```

### 2. Update Publication

```bash
# Update version
npm version patch  # or minor/major

# Publish new version
npm publish
```

### 3. GitHub Release

1. Go to GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v0.1.0` (match package.json version)
4. Release title: `v0.1.0 - Initial Release`
5. Copy changelog content to description
6. Publish release

## Automated Publishing

The project includes GitHub Actions for automated publishing:

### Setup GitHub Secrets

1. Go to GitHub repository Settings → Secrets and variables → Actions
2. Add secret: `NPM_TOKEN`
   - Generate token at npmjs.com → Access Tokens
   - Use "Automation" token type
   - Copy token value

### Automated Workflow

When you create a GitHub release:
1. CI runs tests on multiple Node.js versions
2. If tests pass, package is automatically published to NPM

## Post-Publication

### 1. Verify Publication

```bash
# Check package on NPM
npm view lucid-mcp-server

# Test installation
npm install -g lucid-mcp-server
lucid-mcp-server --help
```

### 2. Update Documentation

- Add NPM badge to README
- Update installation instructions
- Announce on relevant forums/communities

### 3. Monitor

- Watch for issues on GitHub
- Monitor NPM download stats
- Check for security vulnerabilities

## Package Maintenance

### Regular Updates

1. **Dependencies**
   ```bash
   npm audit
   npm update
   ```

2. **Security**
   ```bash
   npm audit fix
   ```

3. **Testing**
   - Run tests before each release
   - Maintain >80% code coverage
   - Test on multiple Node.js versions

### Version Strategy

- **Patch** (0.1.x): Bug fixes, minor improvements
- **Minor** (0.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

### Deprecation

If you need to deprecate:
```bash
npm deprecate lucid-mcp-server@0.1.0 "This version has security issues"
```

## Troubleshooting

### Common Issues

1. **Publication Fails**
   - Check if package name is available
   - Verify NPM login: `npm whoami`
   - Check package.json syntax

2. **GitHub Actions Fail**
   - Verify NPM_TOKEN secret
   - Check workflow permissions
   - Review build logs

3. **Installation Issues**
   - Test locally with `npm pack`
   - Verify file inclusion with `npm publish --dry-run`
   - Check Node.js version compatibility

### Getting Help

- NPM Support: [npmjs.com/support](https://www.npmjs.com/support)
- GitHub Actions: [docs.github.com](https://docs.github.com/en/actions)
- Community: Open an issue for project-specific help
