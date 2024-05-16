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

const createUseCurrentLanguage = <
  Languages extends string,
  Keys extends string,
  AliasLanguages extends Languages,
  PrimaryLanguage extends Languages
>(
  LocalizationContext: Context<LocalizationContextType<Languages>>,
  localizationTable: LocalizationTable<Languages, Keys, AliasLanguages>,
  primaryLanguage: PrimaryLanguage
) => {
  return () => {
    const context = useContext(LocalizationContext)

    if (!context) {
      throw new Error("useLocalized must be used within a LocalizationContext")
    }

    const language = context.language ?? getBrowserLanguage()
    return localizationTable.getLanguage(language) ?? primaryLanguage
  }
}

const createUseLocalization = <
  Languages extends string,
  Keys extends string,
  AliasLanguages extends Languages
>(
  localizationTable: LocalizationTable<Languages, Keys, AliasLanguages>,
  useCurrentLanguage: () => Languages
) => {
  return () => {
    const language = useCurrentLanguage()

    return new Proxy(
      {},
      {
        get: (_, key) => localizationTable.getString(language, key as Keys),
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

  const useCurrentLanguage = createUseCurrentLanguage(
    LocalizationContext,
    localizationTable,
    firstLanguage
  )

  const useLocalization = createUseLocalization(
    localizationTable,
    useCurrentLanguage
  )

  const Localized = createComponent(useLocalization)

  return { LocalizationContext, useCurrentLanguage, useLocalization, Localized }
}
