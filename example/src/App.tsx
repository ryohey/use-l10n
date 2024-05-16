import React, { useState } from "react"
import {
  Language,
  LocalizationContext,
  Localized,
  useCurrentLanguage,
  useLocalization,
} from "./useLocalization"

export const App = () => {
  const [language, setLanguage] = useState<Language | null>(null)

  return (
    <LocalizationContext.Provider value={{ language }}>
      <select
        onChange={(e) => {
          if (e.target.value === "") {
            setLanguage(null)
          } else {
            setLanguage(e.target.value as Language)
          }
        }}
        value={language as string}
      >
        <option value="">Select a language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ja">Japanese</option>
        <option value="zh-Hans">Simplified Chinese</option>
        <option value="zh-Hant">Traditional Chinese</option>
      </select>
      <Content />
    </LocalizationContext.Provider>
  )
}

const Content = () => {
  const localized = useLocalization()
  const language = useCurrentLanguage()

  return (
    <div>
      <h1>use-l10n</h1>
      <h2>
        <Localized name="hello" />
      </h2>
      <p>{localized.description}</p>
      <button onClick={() => alert(localized.hello)}>Push me</button>
      <p>{language}</p>
    </div>
  )
}
