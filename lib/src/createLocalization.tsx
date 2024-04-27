import { Context, FC, createContext, useContext } from "react"
import { LocalizationTable } from "./LocalizationTable"
import { getBrowserLanguage } from "./getBrowserLanguage"

type LocalizationContextType<Languages extends string> = {
  language: Languages | null
}

const createLocalizationContext = <Languages extends string>() =>
  createContext<LocalizationContextType<Languages>>({
    language: null,
  })

const createUseLocalization = <
  Languages extends string,
  Keys extends string,
  AliasLanguages extends Languages
>(
  LocalizationContext: Context<LocalizationContextType<Languages>>,
  localizationTable: LocalizationTable<Languages, Keys, AliasLanguages>,
  primaryLanguage: Languages
) => {
  return () => {
    const context = useContext(LocalizationContext)

    if (!context) {
      throw new Error("useLocalized must be used within a LocalizationContext")
    }

    const localize = (key: Keys) => {
      const language = context.language ?? getBrowserLanguage()
      const supportedLanguage =
        localizationTable.getLanguage(language) ?? primaryLanguage
      return localizationTable.getString(supportedLanguage, key)
    }

    return new Proxy(
      {},
      {
        get: (_, key) => localize(key as Keys),
      }
    ) as Record<Keys, string>
  }
}

const createComponent =
  <Keys extends string>(
    useLocalization: () => Record<Keys, string>
  ): FC<{
    name: Keys
  }> =>
  ({ name }) => {
    const localized = useLocalization()
    return <>{localized[name]}</>
  }

export const createLocalization = <
  Languages extends string,
  Keys extends string,
  PrimaryLanguage extends Languages,
  AliasLanguages extends Languages
>(
  table: Record<Languages, Record<Keys, string>>,
  primaryLanguage?: PrimaryLanguage,
  aliases: [RegExp, AliasLanguages][] = []
) => {
  const LocalizationContext = createLocalizationContext<Languages>()
  const localizationTable = new LocalizationTable(table, aliases)
  const firstLanguage = primaryLanguage ?? (Object.keys(table)[0] as Languages)
  const useLocalization = createUseLocalization(
    LocalizationContext,
    localizationTable,
    firstLanguage
  )
  const Localized = createComponent(useLocalization)
  return { LocalizationContext, useLocalization, Localized }
}
