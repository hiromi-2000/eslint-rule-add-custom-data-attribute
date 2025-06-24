# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions CI/CD workflow
- Renovate configuration for dependency management
- Issue and PR templates
- Code owners configuration

## [1.0.0] - 2024-12-21

### Added
- Initial release of eslint-plugin-react-component-tracker
- `add-component-data-attribute` rule for automatically adding data attributes to React components
- Support for custom attribute names via `attributeName` option
- Support for targeting specific elements via `elements` option
- Support for targeting all elements via `includeAllElements` option
- File pattern filtering to target only `.jsx` and `.tsx` files
- Automatic component name generation from file paths
- ESLint 8.x and 9.x compatibility
- Comprehensive test suite with Vitest
- Vite-based build system for ES modules and CommonJS output
- Complete documentation and usage examples

### Features
- **Data Attribute Generation**: Automatically adds `data-component-name` attributes to React components
- **Customizable Configuration**: Flexible options for attribute names, target elements, and file patterns
- **GA/Analytics Ready**: Optimized for Google Analytics data collection and E2E testing
- **Modern Tooling**: Built with Vite, tested with Vitest, supports latest ESLint versions
- **Production Ready**: Published to npm with full TypeScript support and comprehensive documentation

[Unreleased]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/releases/tag/v1.0.0 
