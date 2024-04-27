# use-l10n: TypeScript Localization Library for React

`use-l10n` is a TypeScript library designed to provide an easy and type-safe way to implement localization in your React applications. By using a user-defined dictionary and custom hooks, this library allows for seamless integration of multiple languages, ensuring that keys are strongly typed and specific to your application.

[![npm version](https://badge.fury.io/js/use-l10n.svg)](https://badge.fury.io/js/use-l10n)
![Node.js CI](https://github.com/ryohey/use-l10n/workflows/Node.js%20CI/badge.svg)

## Features

- **Type Safety**: Ensures that all localization keys are verified at compile time, reducing errors.
- **Customization**: Allows users to define their own localization components based on their unique dictionary.
- **Flexibility**: Supports dynamic language switching and can handle complex scenarios including browser settings and URL parameters.

## How it looks

### Hooks

```typescript
import { useLocalization } from "./l10n"

const App = () => {
  const localized = useLocalization()
  return (
    <div>
      <h1>{localized.hello}</h1>
      <p>{localized.description}</p>
    </div>
  )
}
```

### Components

```typescript
import { Localized } from "./l10n"

const App = () => {
  return (
    <div>
      <h1>
        <Localized name="hello" />
      </h1>
      <p>
        <Localized name="library-description" />
      </p>
    </div>
  )
}
```

## Installation

To get started with `use-l10n`, you can install the library via npm:

```bash
npm install use-l10n
```

Or using yarn:

```bash
yarn add use-l10n
```

## Setup

First, define your `localizationTable` with all supported languages and keys:

### `localizationTable.ts`

```typescript
export const localizationTable = {
  en: {
    hello: "Hello!",
    "library-description":
      "use-l10n is a library for easily implementing multilingual support in React applications.",
  },
  es: {
    hello: "¡Hola!",
    "library-description":
      "use-l10n es una biblioteca para implementar fácilmente soporte multilingüe en aplicaciones React.",
  },
  fr: {
    hello: "Bonjour!",
    "library-description":
      "use-l10n est une bibliothèque permettant de mettre en œuvre facilement le multilinguisme dans les applications React.",
  },
  de: {
    hello: "Hallo!",
    "library-description":
      "use-l10n ist eine Bibliothek, um mehrsprachige Unterstützung in React-Anwendungen einfach zu implementieren.",
  },
  ja: {
    hello: "こんにちは！",
    "library-description":
      "use-l10nは、Reactアプリケーションで簡単に多言語化を実現するためのライブラリです。",
  },
  "zh-Hans": {
    hello: "你好",
    "library-description":
      "use-l10n是一个用于在React应用程序中轻松实现多语言化的库。",
  },
  "zh-Hant": {
    hello: "你好",
    "library-description":
      "use-l10n是一個用於在React應用程序中輕鬆實現多語言化的庫。",
  },
} as const
```

Next, create your localization context and hook using `createLocalization`:

### `useLocalization.ts`

```typescript
import { createLocalization } from "use-l10n"

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
```

### Setup your main application

Incorporate the `LocalizationContext.Provider` within your main application component. You can dynamically set the language based on user preferences, URL parameters, or browser settings.

### `App.tsx`

```typescript
import { LocalizationContext } from "./useLocalization"

render(
  <LocalizationContext.Provider value={{ language: null }}>
    <App />
  </LocalizationContext.Provider>
)
```

## Usage

## Dynamic Language Switching Example

This example demonstrates how you can allow users to switch the language dynamically within your application.

### `LanguageSwitcher.tsx`

```typescript
import React, { useState } from "react"
import { LocalizationContext } from "./useLocalization"

export const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en") // Default language is English

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  return (
    <LocalizationContext.Provider value={{ language }}>
      <select onChange={handleLanguageChange} value={language}>
        <option value="ja">Japanese</option>
        <option value="zh-Hans">Simplified Chinese</option>
        <option value="zh-Hant">Traditional Chinese</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>

      <App />
    </LocalizationContext.Provider>
  )
}
```

## API Reference

### `createLocalization`

Creates a localization context and hook based on the provided dictionary.

```typescript
const { LocalizationContext, useLocalization, Localized } = createLocalization(
  localizationTable: Record<string, Record<string, string>>,
  defaultLanguage: string,
  languageMappings: Array<[RegExp, string]>
)
```

### `LocalizationContext`

A React context that provides the current language to all child components.

### `useLocalization`

A custom hook for retrieving localized strings.

```typescript
const localized = useLocalization()
console.log(localized.hello)) // "Hello!"
```

### `Localized`

A React component that renders the localized string based on the provided key.

```typescript
<Localized name="hello" />
```
