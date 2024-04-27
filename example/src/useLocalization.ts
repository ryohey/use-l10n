import { createLocalization } from "use-l10n"
import { localizationTable } from "./localizationTable"

export const { LocalizationContext, useLocalization, Localized } =
  createLocalization(localizationTable, "en", [
    [/^zh-Hans/, "zh-Hans"],
    [/^zh-Hant/, "zh-Hant"],
    [/^zh$/, "zh-Hans"],
    [/^zh-TW$/, "zh-Hant"],
    [/^zh-HK$/, "zh-Hant"],
    [/^zh-MO$/, "zh-Hant"],
    [/^zh-CN$/, "zh-Hans"],
    [/^zh-SG$/, "zh-Hans"],
  ])

export type Language = keyof typeof localizationTable
export type LocalizationKey = keyof (typeof localizationTable)[Language]
