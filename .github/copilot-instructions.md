# Riot.js v3 - AI Coding Agent Instructions

## Project Overview
This is Riot.js v3, a lightweight component-based UI library. It's a **dual-build system** generating both standalone (`riot.js`) and compiler-included (`riot+compiler.js`) versions, plus CSP-compliant builds.

## Architecture Patterns

### Component Registration System
- Components are registered via `register(name, {css, template, exports})`
- Internal component cache: `COMPONENTS_IMPLEMENTATION_MAP` stores compiled components
- CSS management: Centralized `cssManager` injects all component styles into a single `<style riot>` tag

### Tag Definition (.tag files)
Riot uses a unique single-file component format:
```html
<component-name>
  <div>{message}</div>
  
  this.message = opts.message || 'Hello'
  
  this.on('mount', function() {
    // lifecycle method
  })
</component-name>
```

### Build System (Critical Knowledge)
**Primary Commands:**
- `make riot` - Full build + test cycle (what `npm test` runs)
- `make raw` - Build without minification (for development)
- `make build` - Production build with minification
- `make watch` - Auto-rebuild on changes

**Build Outputs:**
- `/lib/` - ES6 source modules
- `/dist/riot/` - Built artifacts 
- Root level `.js` files - Final distribution files

### Template System
- Uses `@riotjs/dom-bindings` for efficient DOM updates
- Template chunks with binding types: `EACH`, `IF`, `SIMPLE`, `TAG`, `SLOT`
- Special handling for `<template>` tags with placeholder nodes
- CSP compliance via separate build without `new Function()`

## Development Workflows

### Testing Strategy
- **Mocha** for server-side tests (`test/specs/server/`)
- **Karma** for browser tests with dual test suites:
  - `browser/riot` - Tests core riot.js
  - `browser/compiler` - Tests riot+compiler.js
- **SauceLabs** integration for cross-browser testing
- Coverage via Istanbul (only for riot.js, not riot+compiler.js)

### File Organization Patterns
```
lib/
├── browser/
│   ├── common/util/ - Shared utilities (dom, checks, misc, tags)
│   ├── tag/ - Core tag implementation
│   └── compiler/ - Tag compilation logic
├── server/ - Node.js exports
└── riot.js - Main entry point
```

### Tag Development Patterns
- Test tags in `/test/tag/` use `.tag` extension
- Each tag file contains HTML template + JavaScript logic
- Lifecycle methods: `mount`, `unmount`, `update`
- Event system: `this.on('event', handler)`

## Critical Integration Points

### Rollup Configuration
- Main config: `config/defaults.js` 
- UMD builds with Buble for ES5 compatibility
- CommonJS plugin for node_modules integration
- Custom transform for coverage exclusions

### Version Management
Unique versioning workflow:
1. Update `package.json` version
2. `make raw` - Build artifacts
3. `make build` - Generate final files with version injection
4. Git tag with `git tag -s vX.X.X -m 'vX.X.X'`

### Compiler Integration
- Riot compiler (`riot-compiler`) transforms `.tag` files to JavaScript
- Template functions return binding data for DOM updates
- CSS extraction and injection via `styleManager`

## Key Conventions

### API Design
- Dual export strategy: Named exports + default object
- Memoized functions for performance (component creation, style nodes)
- Extensive use of closures for binding contexts

### Error Handling
- `panic()` function for framework errors
- Extensive type checking via `check` utilities
- Template compilation errors surfaced to developer

### Performance Patterns
- Component memoization via `memoizedCreateComponentFromWrapper`
- DOM fragment reuse in template chunks
- Single style node for all component CSS

## Dependencies Context
- `riot-tmpl` - Template engine with `{expression}` syntax
- `riot-observable` - Event system implementation  
- `simple-dom` - Server-side DOM simulation
- Core build tools: Rollup, Buble, Karma, Mocha

When working with this codebase, prioritize understanding the template-to-binding transformation process and the dual browser/server rendering capabilities.