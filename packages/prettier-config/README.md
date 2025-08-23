# @repo/prettier-config

Shared Prettier configuration for the monorepo.

## Usage

### In package.json

```json
{
  "prettier": "@repo/prettier-config"
}
```

### In .prettierrc.json

```json
"@repo/prettier-config"
```

### In prettier.config.js

```js
import config from '@repo/prettier-config';

export default config;
```

## Configuration

The configuration includes:

- **Print Width**: 100 characters (not too narrow as requested)
- **Tab Width**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Always
- **Trailing Commas**: ES5 compatible
- **JSX Single Quotes**: Enabled
- **Arrow Function Parentheses**: Avoid when possible
- **End of Line**: LF (Unix style)
- **Tailwind CSS Plugin**: Included for automatic class sorting

## File Type Support

Prettier automatically detects and formats:

- TypeScript (`.ts`, `.tsx`)
- JavaScript (`.js`, `.jsx`)
- JSON (`.json`)
- Markdown (`.md`)
- CSS (`.css`)
- SCSS (`.scss`)
- HTML (`.html`)

## Best Practices

This configuration follows TypeScript project best practices:

1. **Readable line length**: 100 characters provides good readability without being too narrow
2. **Consistent formatting**: Ensures all code follows the same style
3. **Modern JavaScript**: Uses ES5+ trailing commas and arrow function syntax
4. **Framework support**: Includes Tailwind CSS plugin for better CSS class organization
