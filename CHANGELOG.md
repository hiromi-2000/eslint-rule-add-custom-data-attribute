# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2024-12-21

### Changed
- **Repository Cleanup**: Removed development files from public repository
  - RELEASE_PLAN.md now kept local only
  - .cursor/ directory excluded from repository
  - Updated .gitignore for better development experience
- **Release Workflow**: Enhanced automated release process
  - Added NPM_TOKEN validation with helpful error messages
  - Improved GitHub Release creation
  - Added production environment for better security

## [1.1.0] - 2024-12-21

### Added
- **CI/CD Automation**: GitHub Actions workflow for automated testing and releases
  - Multi-Node.js version testing (18, 20, 22)
  - Automated npm publishing on tag creation
  - Security audit integration
  - Automated GitHub Releases creation
- **Dependency Management**: Renovate configuration for automated dependency updates
  - Smart auto-merge for patch and minor updates
  - Manual review required for major updates
  - Security vulnerability prioritization
  - Japanese timezone scheduling
- **Project Governance**: Enhanced collaboration tools
  - Issue templates for bug reports and feature requests
  - Pull request template with comprehensive checklist
  - CODEOWNERS file for code review requirements
  - CONTRIBUTING.md with detailed development guidelines
- **Documentation**: Improved project documentation
  - CHANGELOG.md following Keep a Changelog format
  - Comprehensive development and contribution guides

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

[Unreleased]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/hiromi-2000/eslint-plugin-react-component-tracker/releases/tag/v1.0.0 
