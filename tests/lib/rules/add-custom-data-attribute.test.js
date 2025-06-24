import { describe, it, expect } from "vitest";
import { RuleTester } from "eslint";
import babelParser from "@babel/eslint-parser";
import rule from "../../../lib/rules/add-custom-data-attribute.js";

const ruleTester = new RuleTester({
  languageOptions: {
    parser: babelParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
  },
});

describe("add-component-data-attribute rule", () => {
  it("should work correctly", () => {
    expect(() => {
      ruleTester.run("add-component-data-attribute", rule, {
        valid: [
          // 既にdata-component-name属性がある場合
          {
            code: '<div data-component-name="test_component">Content</div>',
            filename: "/path/to/components/test/component.jsx",
          },
          // 対象外の要素（divは対象外に変更）
          {
            code: "<div>Content</div>",
            filename: "/path/to/components/test/component.jsx",
          },
          // 対象外の要素
          {
            code: "<span>Content</span>",
            filename: "/path/to/components/test/component.jsx",
          },
          // 対象外のファイル（.jsファイル）
          {
            code: "<div>Content</div>",
            filename: "/path/to/utils/helper.js",
          },
          // カスタム設定で対象外の要素
          {
            code: "<div>Content</div>",
            filename: "/path/to/components/test/component.jsx",
            options: [
              {
                elements: ["button"],
              },
            ],
          },
        ],

        invalid: [
          // 基本的なケース - buttonに変更
          {
            code: "<button>Click me</button>",
            filename: "/path/to/components/test/component.jsx",
            errors: [
              {
                messageId: "missingDataAttribute",
              },
            ],
            output:
              '<button data-component-name="test_component">Click me</button>',
          },
          // input要素
          {
            code: '<input type="text" placeholder="Enter text" />',
            filename: "/path/to/pages/home/index.jsx",
            errors: [
              {
                messageId: "missingDataAttribute",
              },
            ],
            output:
              '<input type="text" placeholder="Enter text" data-component-name="home_home" />',
          },
          // 既存の属性がある場合
          {
            code: '<button className="primary">Submit</button>',
            filename: "/path/to/components/layout/container.jsx",
            errors: [
              {
                messageId: "missingDataAttribute",
              },
            ],
            output:
              '<button className="primary" data-component-name="layout_container">Submit</button>',
          },
          // カスタム属性名
          {
            code: "<button>Submit</button>",
            filename: "/path/to/components/ui/button.jsx",
            options: [
              {
                attributeName: "data-testid",
              },
            ],
            errors: [
              {
                messageId: "missingDataAttribute",
              },
            ],
            output: '<button data-testid="ui_button">Submit</button>',
          },
          // includeAllElements: true
          {
            code: "<span>Content</span>",
            filename: "/path/to/components/text/label.jsx",
            options: [
              {
                includeAllElements: true,
              },
            ],
            errors: [
              {
                messageId: "missingDataAttribute",
              },
            ],
            output: '<span data-component-name="text_label">Content</span>',
          },
          // ネストされた要素のテスト
          {
            code: `
              <form>
                <div>
                  <input type="text" />
                  <button type="submit">Submit</button>
                </div>
              </form>
            `,
            filename: "/path/to/components/auth/loginForm.jsx",
            errors: [
              {
                messageId: "missingDataAttribute",
                line: 2,
              },
              {
                messageId: "missingDataAttribute",
                line: 4,
              },
              {
                messageId: "missingDataAttribute",
                line: 5,
              },
            ],
            output: `
              <form data-component-name="auth_loginForm">
                <div>
                  <input type="text" data-component-name="auth_loginForm" />
                  <button type="submit" data-component-name="auth_loginForm">Submit</button>
                </div>
              </form>
            `,
          },
          // 深いネスト構造
          {
            code: `
              <form className="login-form">
                <fieldset>
                  <legend>Login</legend>
                  <div className="form-group">
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                  </div>
                  <div className="form-actions">
                    <button type="reset">Reset</button>
                    <button type="submit">Login</button>
                  </div>
                </fieldset>
              </form>
            `,
            filename: "/path/to/pages/auth/login.jsx",
            errors: [
              {
                messageId: "missingDataAttribute",
                line: 2,
              },
              {
                messageId: "missingDataAttribute",
                line: 6,
              },
              {
                messageId: "missingDataAttribute",
                line: 7,
              },
              {
                messageId: "missingDataAttribute",
                line: 10,
              },
              {
                messageId: "missingDataAttribute",
                line: 11,
              },
            ],
            output: `
              <form className="login-form" data-component-name="auth_login">
                <fieldset>
                  <legend>Login</legend>
                  <div className="form-group">
                    <input type="email" placeholder="Email" data-component-name="auth_login" />
                    <input type="password" placeholder="Password" data-component-name="auth_login" />
                  </div>
                  <div className="form-actions">
                    <button type="reset" data-component-name="auth_login">Reset</button>
                    <button type="submit" data-component-name="auth_login">Login</button>
                  </div>
                </fieldset>
              </form>
            `,
          },
        ],
      });
    }).not.toThrow();
  });

  describe("configuration options", () => {
    it("should respect custom attribute name", () => {
      expect(() => {
        ruleTester.run("custom-attribute-name", rule, {
          valid: [],
          invalid: [
            {
              code: "<div>Content</div>",
              filename: "/path/to/components/button.jsx",
              options: [
                {
                  attributeName: "data-cy",
                },
              ],
              errors: [
                {
                  messageId: "missingDataAttribute",
                },
              ],
              output: '<div data-cy="components_button">Content</div>',
            },
          ],
        });
      }).not.toThrow();
    });

    it("should respect custom elements list", () => {
      expect(() => {
        ruleTester.run("custom-elements", rule, {
          valid: [
            // buttonは対象外に設定
            {
              code: "<button>Click me</button>",
              filename: "/path/to/components/test.jsx",
              options: [
                {
                  elements: ["input", "select"],
                },
              ],
            },
          ],
          invalid: [
            // inputは対象
            {
              code: '<input type="text" />',
              filename: "/path/to/components/test.jsx",
              options: [
                {
                  elements: ["input", "select"],
                },
              ],
              errors: [
                {
                  messageId: "missingDataAttribute",
                },
              ],
              output:
                '<input type="text" data-component-name="components_test" />',
            },
          ],
        });
      }).not.toThrow();
    });

    it("should respect includeAllElements option", () => {
      expect(() => {
        ruleTester.run("include-all-elements", rule, {
          valid: [],
          invalid: [
            {
              code: "<p>Content</p>",
              filename: "/path/to/components/text.jsx",
              options: [
                {
                  includeAllElements: true,
                },
              ],
              errors: [
                {
                  messageId: "missingDataAttribute",
                },
              ],
              output: '<p data-component-name="components_text">Content</p>',
            },
          ],
        });
      }).not.toThrow();
    });
  });
});
