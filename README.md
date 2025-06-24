# eslint-plugin-react-data-attribute

🎯 **React専用ESLintプラグイン** - GAデータ収集とテストに最適化されたdata属性を自動付与

[![npm version](https://badge.fury.io/js/eslint-plugin-react-data-attribute.svg)](https://www.npmjs.com/package/eslint-plugin-react-data-attribute)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 概要

このESLintプラグインは、**Reactコンポーネント内のインタラクション要素**に自動的に`data-component-name`属性を付与します。

### 🎉 主な用途
- **📊 GAデータ収集**: ユーザーインタラクションの追跡
- **🧪 E2Eテスト**: 要素の特定とテスト自動化
- **🔍 デバッグ**: コンポーネントの識別とトラブルシューティング

### ✨ 特徴
- 🚀 **自動修正対応** - ESLintの`--fix`で自動的に属性を追加
- 🎯 **インタラクション要素に特化** - button, input, form等のGA収集に重要な要素
- 🔧 **高度にカスタマイズ可能** - 属性名、対象要素、ファイルパターンを設定可能
- 🌊 **ネスト構造対応** - 深い階層の要素も正しく処理
- 📁 **ファイル名ベース** - `directory_filename`形式で一意な値を生成

## 📦 インストール

```bash
npm install --save-dev eslint-plugin-react-data-attribute
```

### 🔧 対応環境

- **Node.js**: 18.0.0以上
- **ESLint**: 8.0.0以上（ESLint 8.x, 9.x両対応）
- **React**: JSX/TSXファイル対応

## 🚀 使用方法

### ESLint Flat Config（ESLint 9.x推奨）

```javascript
// eslint.config.js
import reactDataAttribute from 'eslint-plugin-react-data-attribute';

export default [
  {
    plugins: {
      'react-data-attribute': reactDataAttribute,
    },
    rules: {
      'react-data-attribute/add-component-data-attribute': 'error',
    },
  },
];
```

### Legacy Config（ESLint 8.x対応）

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['react-data-attribute'],
  rules: {
    'react-data-attribute/add-component-data-attribute': 'error',
  },
};
```

## 🎨 動作例

### Before
```jsx
// components/auth/LoginForm.jsx
function LoginForm() {
  return (
    <form className="login-form">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### After（自動修正後）
```jsx
// components/auth/LoginForm.jsx
function LoginForm() {
  return (
    <form className="login-form" data-component-name="auth_LoginForm">
      <input type="email" placeholder="Email" data-component-name="auth_LoginForm" />
      <input type="password" placeholder="Password" data-component-name="auth_LoginForm" />
      <button type="submit" data-component-name="auth_LoginForm">Login</button>
    </form>
  );
}
```

## ⚙️ 設定オプション

### 基本設定

```javascript
{
  "react-data-attribute/add-component-data-attribute": [
    "error",
    {
      "attributeName": "data-component-name",
      "elements": ["button", "input", "select", "textarea", "a", "form"],
      "includeAllElements": false,
      "filePattern": "\\.(jsx|tsx)$"
    }
  ]
}
```

### オプション詳細

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `attributeName` | string | `"data-component-name"` | 付与する属性名 |
| `elements` | string[] | `["button", "input", "select", "textarea", "a", "form"]` | 対象要素のリスト |
| `includeAllElements` | boolean | `false` | 全てのJSX要素を対象にする |
| `filePattern` | string | `"\\.(jsx\|tsx)$"` | 対象ファイルの正規表現パターン |

### 🎯 GAデータ収集用設定

```javascript
{
  "react-data-attribute/add-component-data-attribute": [
    "error",
    {
      "attributeName": "data-ga-component",
      "elements": ["button", "input", "select", "textarea", "a", "form"]
    }
  ]
}
```

### 🧪 E2Eテスト用設定

```javascript
{
  "react-data-attribute/add-component-data-attribute": [
    "error",
    {
      "attributeName": "data-testid",
      "elements": ["button", "input", "select", "textarea", "a"]
    }
  ]
}
```

### 🎨 カスタムコンポーネント対応

```javascript
{
  "react-data-attribute/add-component-data-attribute": [
    "error",
    {
      "includeAllElements": true,  // Button, Input等のカスタムコンポーネントも対象
      "elements": ["Button", "Input", "Select", "Form"]
    }
  ]
}
```

## 🔧 高度な使用例

### ネストされた構造

```jsx
// pages/checkout/PaymentForm.jsx
<form data-component-name="checkout_PaymentForm">
  <fieldset>
    <legend>Payment Information</legend>
    <div className="form-group">
      <input type="text" placeholder="Card Number" data-component-name="checkout_PaymentForm" />
      <input type="text" placeholder="CVV" data-component-name="checkout_PaymentForm" />
    </div>
    <div className="form-actions">
      <button type="reset" data-component-name="checkout_PaymentForm">Reset</button>
      <button type="submit" data-component-name="checkout_PaymentForm">Pay Now</button>
    </div>
  </fieldset>
</form>
```

### 属性値の形式

| ファイルパス | 生成される値 |
|-------------|-------------|
| `components/ui/Button.jsx` | `"ui_Button"` |
| `pages/auth/login.jsx` | `"auth_login"` |
| `components/forms/ContactForm.tsx` | `"forms_ContactForm"` |
| `src/components/nav/index.jsx` | `"nav_nav"` |

## 🎯 対象要素（デフォルト）

GAデータ収集に最適化された要素のみを対象：

- `button` - クリックイベント追跡
- `input` - フォーム入力追跡  
- `select` - 選択イベント追跡
- `textarea` - テキスト入力追跡
- `a` - リンククリック追跡
- `form` - フォーム送信追跡

## 🚫 対象外要素

コンテナ要素は**デフォルトで対象外**（GAデータ収集に不要なため）：

- `div`, `span`, `section`, `article`, `header`, `footer` など

## 🛠️ 開発・コントリビューション

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/eslint-plugin-react-data-attribute.git
cd eslint-plugin-react-data-attribute

# 依存関係のインストール
npm install

# テストの実行
npm test

# テストUI（ブラウザ）
npm run test:ui

# ウォッチモード
npm run test:watch

# Lintの実行
npm run lint

# ビルド
npm run build
```

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🤝 コントリビューション

Issue、Pull Request、フィードバックを歓迎します！

---

**🎯 GAデータ収集とE2Eテストの効率化に貢献するESLintプラグインです！**
