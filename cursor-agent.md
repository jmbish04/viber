# Cursor Agent Configuration

This file configures how Cursor's AI assistant should interact with the VibeSDK codebase.

## Project Context

VibeSDK is a Cloudflare Workers-based platform for AI-powered code generation and deployment. The main components include:

- **Frontend**: React/TypeScript application with Vite
- **Backend**: Cloudflare Workers with Hono framework
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 for templates and assets
- **AI Integration**: OpenAI and Google AI Studio APIs

## Code Structure

```
/
├── src/                    # Frontend React application
├── worker/                 # Cloudflare Worker backend
│   ├── agents/            # AI agent implementations
│   ├── api/               # API controllers and routes
│   ├── database/          # Database services and models
│   ├── services/          # Business logic services
│   └── utils/             # Utility functions
├── shared/                # Shared types and utilities
├── scripts/               # Build and deployment scripts
└── templates/             # Code generation templates
```

## Key Technologies

- **Runtime**: Bun (package manager and runtime)
- **Build**: Vite with Rolldown
- **Framework**: React 19, Hono 4
- **Database**: Drizzle ORM with D1
- **Styling**: Tailwind CSS
- **Deployment**: Wrangler CLI

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for formatting
- Prefer functional components in React
- Use async/await over Promises

### Import Patterns
- Use relative imports within the same directory
- Use absolute imports for shared modules
- Import types with `import type` syntax
- Group imports: external, internal, relative

### Error Handling
- Use custom error classes from `shared/types/errors`
- Implement proper error boundaries in React
- Log errors with structured logging
- Return appropriate HTTP status codes

### Database Operations
- Use Drizzle ORM for all database operations
- Implement proper transaction handling
- Use prepared statements for security
- Handle connection errors gracefully

## Common Patterns

### Agent Implementation
```typescript
export class MyAgent extends Agent<Env, StateType> {
  async initialize(args: InitArgs): Promise<StateType> {
    // Initialization logic
  }
  
  async onMessage(connection: Connection, message: string): Promise<void> {
    // Handle WebSocket messages
  }
}
```

### API Controller
```typescript
export async function handleRequest(request: Request, env: Env): Promise<Response> {
  try {
    // Controller logic
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}
```

### Database Service
```typescript
export class MyService {
  constructor(private env: Env) {}
  
  async create(data: CreateData): Promise<Result> {
    return await this.env.DB.prepare(`
      INSERT INTO table (field) VALUES (?)
    `).bind(data.value).run();
  }
}
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: camelCase with `.types.ts` suffix
- **Services**: PascalCase with `Service` suffix
- **Constants**: UPPER_SNAKE_CASE

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows
- Mock external dependencies
- Test error scenarios

## Performance Considerations

- Use React.memo for expensive components
- Implement proper loading states
- Optimize database queries
- Use Cloudflare caching where appropriate
- Minimize bundle size

## Security Best Practices

- Validate all inputs
- Use CSRF protection
- Implement rate limiting
- Sanitize user content
- Use secure headers
- Handle secrets properly

## Deployment Notes

- Environment variables are managed in `.env.vars` files
- Use `wrangler secret bulk` for sensitive data
- Deploy with `bun run deploy:prod`
- Monitor with Cloudflare Analytics

## Debugging Tips

- Use structured logging with context
- Enable debug mode in development
- Check Cloudflare Workers logs
- Use browser dev tools for frontend issues
- Test with different user scenarios

## Common Issues and Solutions

1. **Import Resolution**: Check tsconfig.json paths configuration
2. **Build Errors**: Verify all dependencies are installed
3. **Type Errors**: Ensure proper type definitions
4. **Runtime Errors**: Check environment variables and permissions
5. **Deployment Issues**: Verify wrangler configuration

## AI Assistant Guidelines

When working with this codebase:

1. **Understand the Context**: This is a full-stack TypeScript application
2. **Follow Patterns**: Use established patterns for consistency
3. **Consider Performance**: Optimize for Cloudflare Workers environment
4. **Maintain Security**: Always consider security implications
5. **Test Thoroughly**: Ensure changes work in the target environment
6. **Document Changes**: Update relevant documentation
7. **Use TypeScript**: Leverage type safety throughout
8. **Handle Errors**: Implement proper error handling
9. **Consider Scale**: Design for production usage
10. **Follow Conventions**: Maintain code style and naming consistency

### TypeScript Error Resolution Protocol

**CRITICAL**: Always run `bun run check` before and after making changes to ensure TypeScript errors are resolved.

**Workflow**:
1. **Before changes**: Run `bun run check` to identify existing issues
2. **Make changes**: Implement your modifications
3. **After changes**: Run `bun run check` to verify no new errors
4. **Fix any errors**: Address TypeScript compilation issues
5. **Final verification**: Run `bun run check` again to confirm all issues are resolved

**Available Commands**:
- `bun run check` - Full check (types + formatting)
- `bun run check:types` - TypeScript type checking only
- `bun run check:format` - Code formatting check only
- `bun run format` - Auto-fix formatting issues

**Error Resolution Priority**:
1. Fix TypeScript compilation errors first
2. Address type safety issues
3. Resolve import/export problems
4. Fix formatting issues
5. Verify all checks pass
