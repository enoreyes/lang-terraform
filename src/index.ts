import {parser} from "./terraform.grammar"
import {
  LRLanguage,
  LanguageSupport,
  foldNodeProp,
  foldInside,
  indentNodeProp,
  delimitedIndent
} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

/**
 * Create a language definition using the Terraform grammar.
 */
export const TerraformLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Boolean: t.bool,
        FloatExp: t.number,
        FloatNoExp: t.number,
        Int: t.number,
        StringToken: t.string,
        Identifier: t.variableName,

        // Operators, punctuation
        EqualEqual: t.operatorKeyword,
        NotEqual: t.operatorKeyword,
        GreaterEq: t.operatorKeyword,
        LessEq: t.operatorKeyword,
        AndAnd: t.operatorKeyword,
        OrOr: t.operatorKeyword,
        Arrow: t.operatorKeyword,
        Greater: t.operatorKeyword,
        Less: t.operatorKeyword,
        Plus: t.operatorKeyword,
        Minus: t.operatorKeyword,
        Star: t.operatorKeyword,
        Slash: t.operatorKeyword,
        Mod: t.operatorKeyword,
        Bang: t.operatorKeyword,
        Eq: t.operatorKeyword,

        LBrace: t.brace,
        RBrace: t.brace,
        LBracket: t.squareBracket,
        RBracket: t.squareBracket,
        LParen: t.paren,
        RParen: t.paren,

        LineComment: t.lineComment,
        BlockComment: t.blockComment
      }),
      indentNodeProp.add({
        Block: delimitedIndent({closing: "}", align: false}),
        ObjectLit: delimitedIndent({closing: "}", align: false}),
        ArrayLit: delimitedIndent({closing: "]", align: false}),
        Parens: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Block: foldInside,
        ObjectLit: foldInside,
        ArrayLit: foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//"}
  }
})

/**
 * Export a helper function that returns
 * a LanguageSupport instance for Terraform.
 */
export function terraform() {
  return new LanguageSupport(TerraformLanguage)
}