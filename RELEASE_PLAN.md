# ESLintカスタムルール リリース作業計画書

## 概要
このドキュメントは、ESLintのカスタムルールをnpmパッケージとして公開するための作業計画書です。

## 作業フェーズ

### Phase 1: プロジェクト初期設定 ✅
- [x] プロジェクト構成の作成
  - [x] `lib/rules/` ディレクトリの作成
  - [x] `tests/` ディレクトリの作成
  - [x] `docs/` ディレクトリの作成（必要に応じて）
- [x] `package.json` の作成と設定
  - [x] パッケージ名、バージョン、説明の設定
  - [x] メインファイルの指定（ES Modules対応）
  - [x] キーワード、リポジトリ、作者、ライセンスの設定
  - [x] `files` フィールドで公開対象ファイルを限定
  - [x] `exports` フィールドの設定（最新仕様対応）
- [x] 依存パッケージのインストール
  - [x] `eslint` v9.29.0のインストール（最新版）
  - [x] Node.js 18+対応
  - [x] ESM（ES Modules）対応
- [x] 開発環境の設定
  - [x] `eslint.config.js` の作成（Flat Config形式）
  - [x] `.gitignore` の作成
  - [x] Node.js組み込みテストランナー使用

### Phase 2: ルール実装 ✅
- [x] カスタムルールの実装
  - [x] ルール本体の作成（`lib/rules/add-custom-data-attribute.js`）
  - [x] ルールのメタデータ設定
    - [x] ドキュメントURL
    - [x] fixable設定（自動修正対応）
    - [x] エラーメッセージの定義（messageIds使用）
    - [x] スキーマ定義（設定オプション対応）
    - [x] suggestions機能の実装
- [x] ルールのエクスポート設定
  - [x] `lib/index.js` でルールをエクスポート
  - [x] プラグイン設定の作成
- [x] 高度な機能の実装
  - [x] `data-component-name`属性の自動付与
  - [x] `filename_componentName`形式の値生成
  - [x] 設定可能な属性名（`attributeName`オプション）
  - [x] 対象要素の設定（`elements`オプション）
  - [x] 全要素対象モード（`includeAllElements`オプション）
  - [x] ファイルパターンフィルタ（`.jsx/.tsx`のみ対象）

### Phase 3: テスト実装 ✅
- [x] テストファイルの作成
  - [x] `tests/lib/rules/add-custom-data-attribute.test.js` の作成
  - [x] 有効なケースのテスト作成
  - [x] 無効なケースのテスト作成
  - [x] 修正機能のテスト作成（fixable対応）
  - [x] 設定オプションのテスト作成
- [x] テスト実行環境の設定
  - [x] **Vitest**を使用した最新テスト環境
  - [x] JSXパース対応（Babel設定）
  - [x] テストスクリプトの `package.json` への追加
  - [x] **Vite**によるビルド環境構築
- [x] 追加機能
  - [x] テストUIモード（`npm run test:ui`）
  - [x] ウォッチモード（`npm run test:watch`）
  - [x] 開発モード（`npm run dev`）

### Phase 4: ドキュメント整備
- [x] `README.md` の作成・更新
  - [x] ルールの概要説明
  - [x] インストール方法
  - [x] 使用方法
  - [x] 設定例
  - [x] ルール一覧
- [ ] 各ルールの詳細ドキュメント作成（必要に応じて）
- [ ] `CHANGELOG.md` の作成
- [ ] `CONTRIBUTING.md` の作成（コントリビューション受付の場合）

### Phase 5: 品質保証 ✅
- [x] テストの実行
  - [x] `npm test` でテスト実行
  - [x] カバレッジの確認
- [x] Lintの実行
  - [x] `npm run lint` でコード品質チェック
  - [x] ESLint設定の確認
- [x] ビルドの実行（TypeScriptの場合）
  - [x] `npm run build` でビルド実行
  - [x] 型定義ファイルの生成確認

### Phase 6: パッケージ設定 ✅
- [x] `.npmignore` の作成
  - [x] テストファイルの除外
  - [x] 開発用ファイルの除外
- [x] パッケージの動作確認
  - [x] `npm pack` でパッケージ内容確認
  - [x] ローカルでのインストールテスト

### Phase 7: バージョン管理
- [ ] Gitでのコミット
  - [ ] 全変更をコミット
  - [ ] コミットメッセージの適切な記述
- [ ] バージョンタグの作成
  - [ ] `git tag v1.0.0` でタグ付け
  - [ ] タグをリモートにプッシュ

### Phase 8: npm公開準備
- [ ] npmアカウントの準備
  - [ ] npmアカウントの作成（未作成の場合）
  - [ ] `npm login` でログイン
- [ ] パッケージ名の確認
  - [ ] `npm search` で名前の重複確認
  - [ ] スコープ付きパッケージの検討（`@username/package-name`）

### Phase 9: リリース実行
- [ ] パッケージの公開
  - [ ] `npm publish` でパッケージ公開
  - [ ] 公開後の動作確認
- [ ] GitHubリリースの作成
  - [ ] リリースノートの作成
  - [ ] タグからリリースを作成

### Phase 10: アフターケア
- [ ] ドキュメントの最終確認
  - [ ] インストール手順の動作確認
  - [ ] サンプルコードの動作確認
- [ ] コミュニティ対応の準備
  - [ ] Issue受付体制の整備
  - [ ] PR受付ガイドラインの整備
- [ ] 告知・プロモーション
  - [ ] ブログ記事の執筆（必要に応じて）
  - [ ] SNSでの告知（必要に応じて）

## チェックリスト項目詳細

### 必須ファイル
- [ ] `package.json` - パッケージ設定
- [ ] `lib/index.js` - メインエントリーポイント
- [ ] `lib/rules/*.js` - ルール実装ファイル
- [ ] `tests/**/*.js` - テストファイル
- [ ] `README.md` - ドキュメント
- [ ] `.npmignore` - npm公開除外設定

### 推奨ファイル
- [ ] `CHANGELOG.md` - 変更履歴
- [ ] `.eslintrc.js` - ESLint設定
- [ ] `.gitignore` - Git除外設定
- [ ] `LICENSE` - ライセンスファイル

## 注意事項
- パッケージ名は npm で一意である必要があります
- セマンティックバージョニングに従ってバージョン管理を行ってください
- テストカバレッジは可能な限り高く保ってください
- ドキュメントは利用者目線で分かりやすく記述してください

## 参考リンク
- [ESLint Developer Guide](https://eslint.org/docs/developer-guide/)
- [npm Publishing Guide](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Semantic Versioning](https://semver.org/) 
