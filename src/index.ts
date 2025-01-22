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

export const terraformLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        // Terraform keywords
        Resource: t.className,
        Module: t.className,
        LocalKW: t.className,
        LocalsKW: t.className,
        Provider: t.className,
        Data: t.className,
        Variable: t.className,

        // Special highlighting for block labels
        "BlockLabel/StringToken": t.keyword,

        // Booleans
        Boolean: t.bool,

        // Numeric
        FloatExp: t.number,
        FloatNoExp: t.number,
        Int: t.number,

        // Strings
        StringToken: t.string,
        InterpString: t.special(t.string),
        AnyChar: t.null,

        // Identifiers
        Identifier: t.variableName,

        // Operators
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
        Mod: t.operatorKeyword,
        Bang: t.operatorKeyword,
        
        // Comments
        LineComment: t.lineComment,

        // Braces, brackets, parens
        "{": t.brace,
        "}": t.brace,
        "[": t.squareBracket,
        "]": t.squareBracket,
        "(": t.paren,
        ")": t.paren,
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

export function terraform() {
  return new LanguageSupport(terraformLanguage)
}