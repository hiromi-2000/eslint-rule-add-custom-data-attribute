# Contributing to eslint-plugin-react-component-tracker

Thank you for your interest in contributing to eslint-plugin-react-component-tracker! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible using our bug report template.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please use our feature request template and provide:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Examples of how the feature would be used
- Any relevant context or motivation

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Install dependencies: `npm install`
3. Make your changes
4. Add tests for your changes
5. Ensure all tests pass: `npm test`
6. Ensure linting passes: `npm run lint`
7. Ensure build works: `npm run build`
8. Commit your changes using conventional commits
9. Push to your fork and submit a pull request

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm 9+

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/eslint-plugin-react-component-tracker.git
cd eslint-plugin-react-component-tracker

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run linting
npm run lint

# Build the project
npm run build
```

## Project Structure

```
├── lib/                    # Source code
│   ├── index.js           # Main entry point
│   └── rules/             # ESLint rules
│       └── add-component-data-attribute.js
├── tests/                 # Test files
│   └── lib/
│       └── rules/
│           └── add-component-data-attribute.test.js
├── .github/               # GitHub configuration
│   ├── workflows/         # GitHub Actions
│   └── ISSUE_TEMPLATE/    # Issue templates
└── docs/                  # Documentation
```

## Coding Standards

### JavaScript Style

- Use ES6+ features
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Prefer arrow functions for short functions
- Use const/let instead of var

### ESLint Rules

When implementing new rules:

1. **Rule Structure**: Follow the standard ESLint rule structure
2. **Metadata**: Include proper meta information (docs, fixable, schema)
3. **Message IDs**: Use messageId instead of direct messages
4. **Schema**: Define proper JSON schema for options
5. **Fixable**: Implement auto-fix when possible
6. **Suggestions**: Provide suggestions when auto-fix isn't appropriate

### Testing

- Write comprehensive tests for all new features
- Include both valid and invalid test cases
- Test all configuration options
- Test edge cases and error conditions
- Maintain high test coverage

### Commit Messages

We use conventional commits. Format: `type(scope): description`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

Examples:
- `feat(rule): add new configuration option`
- `fix(rule): handle edge case in JSX parsing`
- `docs: update installation instructions`

## Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run specific test file
npm test -- add-component-data-attribute.test.js
```

### Writing Tests

Use the ESLint RuleTester for testing rules:

```javascript
import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/add-component-data-attribute.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: { jsx: true }
    }
  }
});

ruleTester.run('rule-name', rule, {
  valid: [
    // Valid test cases
  ],
  invalid: [
    // Invalid test cases with expected errors
  ]
});
```

## Release Process

Releases are automated through GitHub Actions:

1. Create a new tag: `git tag v1.x.x`
2. Push the tag: `git push origin v1.x.x`
3. GitHub Actions will automatically:
   - Run tests
   - Build the package
   - Publish to npm
   - Create a GitHub release

## Questions?

If you have questions, please:

1. Check the existing issues and discussions
2. Create a new issue with the "question" label
3. Reach out to the maintainers

Thank you for contributing! 🚀 
