# VibeSDK Agent Documentation

## Overview

VibeSDK is a Cloudflare Workers-based platform for AI-powered code generation and deployment. This document provides comprehensive information about the agent system and its capabilities.

## Architecture

### Core Components

1. **SimpleCodeGeneratorAgent** - Main agent class for code generation
2. **Project Setup Assistant** - Handles project initialization and setup commands
3. **File Manager** - Manages generated files and state
4. **Sandbox Service** - Handles deployment and execution environments
5. **WebSocket System** - Real-time communication with frontend

### Agent States

The agent operates through several states:

- **IDLE** - No active generation
- **PHASE_GENERATING** - Creating new development phases
- **PHASE_IMPLEMENTING** - Implementing code for current phase
- **REVIEWING** - Code review and improvement cycles
- **FINALIZING** - Final cleanup and deployment

## Key Features

### Code Generation

- Blueprint-based phase generation
- Real-time file streaming with WebSocket updates
- Code validation and error correction
- Support for multiple frameworks and languages

### Deployment

- Cloudflare Workers deployment
- Sandbox service integration
- GitHub export functionality
- Screenshot capture and analysis

### Error Handling

- Runtime error detection
- Static code analysis
- Deterministic code fixes
- Rate limiting and security controls

## API Endpoints

### WebSocket Messages

The agent communicates via WebSocket with the following message types:

- `GENERATION_STARTED` - Code generation begins
- `FILE_GENERATING` - Individual file generation
- `FILE_GENERATED` - File generation complete
- `PHASE_IMPLEMENTING` - Phase implementation in progress
- `DEPLOYMENT_STARTED` - Deployment process begins
- `DEPLOYMENT_COMPLETED` - Deployment successful
- `ERROR` - Error occurred
- `RATE_LIMIT_ERROR` - Rate limit exceeded

### HTTP Endpoints

- `POST /api/agent/initialize` - Initialize new agent session
- `POST /api/agent/generate` - Start code generation
- `POST /api/agent/deploy` - Deploy to Cloudflare Workers
- `POST /api/agent/github-export` - Export to GitHub repository
- `POST /api/agent/screenshot` - Capture application screenshot

## Configuration

### Environment Variables

Required environment variables:

- `CLOUDFLARE_API_TOKEN` - Cloudflare API access
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account identifier
- `OPENAI_API_KEY` - OpenAI API access
- `GITHUB_CLIENT_ID` - GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth client secret
- `JWT_SECRET` - JWT signing secret
- `CUSTOM_DOMAIN` - Custom domain for deployment

### Database Schema

The agent uses D1 database with the following key tables:

- `apps` - Generated applications
- `users` - User accounts and sessions
- `model_configs` - AI model configurations
- `rate_limits` - Rate limiting data

## Development

### Local Development

1. Install dependencies: `bun install`
2. Set up environment variables in `.dev.vars`
3. Run development server: `bun run dev`
4. Access at `http://localhost:8787`

### Deployment

1. Configure production variables in `.prod.vars`
2. Deploy to Cloudflare: `bun run deploy:prod`
3. Set up secrets: `bun run secrets:prod`

### Testing

- Unit tests: `bun run test`
- Type checking: `bun run check:types`
- Code formatting: `bun run format`
- **Full check**: `bun run check` (runs both type checking and formatting)

### TypeScript Error Resolution

Before making any changes or when encountering TypeScript errors:

1. **Run full check**: `bun run check`
2. **Fix type errors**: `bun run check:types`
3. **Format code**: `bun run format`
4. **Verify fixes**: `bun run check` again

This ensures all TypeScript errors are resolved and code is properly formatted.

## Troubleshooting

### Common Issues

1. **Dispatch Namespace Error**: Ensure `remote: true` in wrangler.jsonc
2. **Build Failures**: Check import paths and TypeScript configuration
3. **Deployment Issues**: Verify API tokens and permissions
4. **Rate Limiting**: Check rate limit configurations and user quotas

### Debug Mode

Enable debug logging by setting `DEBUG=true` in environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
