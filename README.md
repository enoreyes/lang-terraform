# CodeMirror Terraform Language Support

This repository provides a [CodeMirror 6](https://codemirror.net/6/) language package for [Terraform](https://www.terraform.io). It includes:

- A [Lezer](https://lezer.codemirror.net) grammar for Terraform.
- Highlighting, indentation, and folding rules specific to Terraform syntax.
- An easy-to-use extension for CodeMirror 6.

## Installation

1. Clone this repository or install from npm (once published):
   ```
   npm install codemirror-lang-terraform
   ```
2. Make sure you have the required CodeMirror 6 packages installed (e.g. `@codemirror/language`).

## Usage

In your CodeMirror setup code, import and include the Terraform language extension:

```js
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { terraform } from "codemirror-lang-terraform";

const startState = EditorState.create({
  doc: `# Example Terraform code
resource "aws_instance" "web" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}`,
  extensions: [basicSetup, terraform()],
});

const view = new EditorView({
  state: startState,
  parent: document.querySelector("#editor"),
});
```

This will enable Terraform syntax highlighting, indentation, and folding while you edit `.tf` or `.tfvars` content.

## Development

If you want to develop or modify this language package:

1. Clone the repository:

   ```
   git clone https://github.com/enoreyes/lang-terraform
   cd lang-terraform
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Build the project:

   ```
   npm run prepare
   ```

   This will use [Rollup](https://rollupjs.org) and the [Lezer generator](https://lezer.codemirror.net/docs/guide/) to produce compiled parser files in the `dist` folder.

4. Run tests:
   ```
   npm test
   ```
   Tests are kept in the `test` directory, where parsing behavior is checked.

## Grammar

The Terraform grammar file (`src/terraform.grammar`) uses [Lezer’s grammar syntax](https://lezer.codemirror.net/docs/guide/) to define tokens and parse rules, including interpolation, blocks, attributes, and resource definitions.

Key aspects include:

- Local token contexts for strings, to properly detect interpolation (`"${ ... }"`).
- Precedence rules to handle Terraform operators (`+`, `-`, `*`, `/`, `&&`, `||`, etc.).
- Nodes for `resource`, `module`, `provider`, `data`, and other Terraform block types.
- Special highlight styling for resource/module labels.

## Contributing

- Fork this repo and make a branch for your feature or bugfix.
- Generate the parser by running `npm run prepare` and ensure all tests pass with `npm test`.
- Submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE). Please see the license file for more details.
