import path from "path";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Automatically add data-component-name attributes to React JSX elements",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/yourusername/eslint-plugin-react-data-attribute#add-component-data-attribute",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      missingDataAttribute:
        "Missing {{attributeName}} attribute on React {{elementType}} element. This helps with component tracking and testing.",
      addDataAttribute: "Add {{attributeName}} attribute to React component",
    },
    schema: [
      {
        type: "object",
        properties: {
          attributeName: {
            type: "string",
            default: "data-component-name",
          },
          elements: {
            type: "array",
            items: {
              type: "string",
            },
            default: ["button", "input", "select", "textarea", "a", "form"],
          },
          includeAllElements: {
            type: "boolean",
            default: false,
          },
          filePattern: {
            type: "string",
            default: "\\.(jsx|tsx)$",
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [
      {
        attributeName: "data-component-name",
        elements: ["button", "input", "select", "textarea", "a", "form"],
        includeAllElements: false,
        filePattern: "\\.(jsx|tsx)$",
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const {
      attributeName = "data-component-name",
      elements = ["button", "input", "select", "textarea", "a", "form"],
      includeAllElements = false,
      filePattern = "\\.(jsx|tsx)$",
    } = options;

    // filenameの取得
    const filename = context.physicalFilename || context.filename || "";

    // ファイルパターンのチェック - .jsファイルは除外、.jsx/.tsxファイルのみ対象
    if (!filename) {
      return {};
    }

    const filePatternRegex = new RegExp(filePattern);
    if (!filePatternRegex.test(filename)) {
      return {};
    }

    // ファイル名からコンポーネント名を取得
    function getComponentNameFromFile(filePath) {
      const basename = path.basename(filePath, path.extname(filePath));
      const dirname = path.basename(path.dirname(filePath));

      // index.jsxの場合はディレクトリ名を使用
      if (basename.toLowerCase() === "index") {
        return dirname;
      }

      return basename;
    }

    // JSX要素が対象かどうかをチェック
    function shouldCheckElement(elementName) {
      if (includeAllElements) {
        return true;
      }
      return elements.includes(elementName);
    }

    // data属性が既に存在するかチェック
    function hasDataAttribute(node, attrName) {
      if (!node.attributes) return false;

      return node.attributes.some((attr) => {
        if (
          attr.type === "JSXAttribute" &&
          attr.name &&
          attr.name.name === attrName
        ) {
          return true;
        }
        return false;
      });
    }

    // data属性の値を生成
    function generateDataAttributeValue(filePath) {
      const componentName = getComponentNameFromFile(filePath);
      const dirname = path.basename(path.dirname(filePath));

      // filename_componentName形式
      return `${dirname}_${componentName}`;
    }

    // 修正を適用
    function addDataAttributeFix(fixer, node, attrName, attrValue) {
      const openingElement = node.openingElement || node;
      const elementName = openingElement.name;

      if (!elementName || !openingElement.attributes) {
        return null;
      }

      const lastAttribute =
        openingElement.attributes[openingElement.attributes.length - 1];
      const insertPosition = lastAttribute
        ? lastAttribute.range[1]
        : elementName.range[1];

      const attributeText = ` ${attrName}="${attrValue}"`;

      return fixer.insertTextAfterRange(
        [insertPosition, insertPosition],
        attributeText
      );
    }

    return {
      JSXElement(node) {
        const openingElement = node.openingElement;
        if (!openingElement || !openingElement.name) {
          return;
        }

        const elementName = openingElement.name.name;

        // 対象要素かチェック
        if (!shouldCheckElement(elementName)) {
          return;
        }

        // 既にdata属性が存在するかチェック
        if (hasDataAttribute(openingElement, attributeName)) {
          return;
        }

        const dataAttributeValue = generateDataAttributeValue(filename);

        context.report({
          node: openingElement,
          messageId: "missingDataAttribute",
          data: {
            attributeName,
            elementType: elementName,
          },
          fix(fixer) {
            return addDataAttributeFix(
              fixer,
              node,
              attributeName,
              dataAttributeValue
            );
          },
          suggest: [
            {
              messageId: "addDataAttribute",
              data: {
                attributeName,
              },
              fix(fixer) {
                return addDataAttributeFix(
                  fixer,
                  node,
                  attributeName,
                  dataAttributeValue
                );
              },
            },
          ],
        });
      },

      JSXFragment() {
        // React Fragmentは対象外
        return;
      },
    };
  },
};
