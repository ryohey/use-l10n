export class LocalizationTable<
  Languages extends string,
  Keys extends string,
  AliasLanguages extends Languages
> {
  constructor(
    private readonly table: Record<Languages, Record<Keys, string>>,
    private readonly aliases: [RegExp, AliasLanguages][]
  ) {}

  getString(language: Languages, key: Keys): string {
    if (!(language in this.table)) {
      throw new Error(
        `Language ${language} not found in localization table. Please use getLanguage to get available languages.`
      )
    }
    if (!(key in this.table[language])) {
      throw new Error(
        `Key ${key} not found in localization table for language ${language}.`
      )
    }
    return this.table[language][key]
  }

  getLanguage(language: string): Languages | null {
    for (const [alias, lang] of this.aliases) {
      if (alias.test(language)) {
        return lang
      }
    }
    if (language in this.table) {
      return language as Languages
    }
    return null
  }
}
