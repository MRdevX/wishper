# Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) for version management and changelog generation.

## Getting Started

### Adding a Changeset

When you make changes to any package that should trigger a new version, you need to add a changeset:

```bash
pnpm changeset
```

This will prompt you to:

1. Select which packages have changed
2. Choose the type of change (patch, minor, major)
3. Write a description of the changes

### Creating New Versions

To create new versions of packages based on your changesets:

```bash
pnpm changeset version
```

This will:

- Update package versions
- Generate changelogs
- Commit the changes (if `commit: true` is set in config)

Or use the combined script that builds, tests, and versions:

```bash
pnpm version-packages
```

## Configuration

The changesets configuration is in `.changeset/config.json`:

- `commit: true` - Automatically commits version changes
- `access: "restricted"` - Packages are kept private (not published)
- `baseBranch: "main"` - Uses main branch as the base

## Available Packages

The following packages are configured for version management:

- `@repo/ui` - React UI components
- `@repo/schemas` - TypeScript schemas and types
- `@repo/eslint-config` - ESLint configurations
- `@repo/typescript-config` - TypeScript configurations
- `@repo/prettier-config` - Prettier configuration
- `@repo/jest-config` - Jest configurations

## Workflow

1. Make changes to packages
2. Add a changeset: `pnpm changeset`
3. Commit and push changes
4. When ready to version: `pnpm version-packages`

## Changelog Generation

Changesets automatically generates detailed changelogs for each package based on your changesets. Here's how it works:

### Automatic Changelog Creation

When you run `pnpm changeset version`, Changesets:

1. **Creates CHANGELOG.md files** for each package that has changes
2. **Organizes changes by version** (major, minor, patch)
3. **Includes detailed descriptions** from your changeset summaries
4. **Tracks dependency updates** between packages
5. **Links to git commits** for traceability

### Writing Good Changesets

For better changelogs, write detailed changeset summaries:

```markdown
---
'@repo/ui': minor
'api': patch
---

feat: add new Button component with variants

- Added new Button component with primary, secondary, and outline variants
- Improved accessibility with proper ARIA attributes
- Added support for loading states and disabled states

BREAKING CHANGE: The Button component API has been updated to use a more consistent prop structure.
```

### Changelog Structure

Generated changelogs include:

- **Version sections** (1.0.0, 1.1.0, etc.)
- **Change types** (Major, Minor, Patch)
- **Detailed descriptions** from changesets
- **Dependency updates** with version changes
- **Git commit links** for reference

## Benefits

- **Version Management**: Keep track of semantic versions across all packages
- **Changelog Generation**: Automatically generate detailed changelogs for each package
- **Dependency Updates**: Automatically update internal dependencies when packages change
- **Git Integration**: Automatic commits and git tags for version changes
- **Build Validation**: Ensures all packages build and test before versioning

## Future Publishing

If you decide to publish packages later, you can:

1. Set `"private": false` in package.json files
2. Add `publishConfig` sections
3. Change `access` to `"public"` in `.changeset/config.json`
4. Add `pnpm changeset publish` to your workflow
