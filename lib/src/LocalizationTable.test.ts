import { describe, expect, test } from "vitest"
import { LocalizationTable } from "./LocalizationTable"

describe("LocalizationTable", () => {
  test("getString", () => {
    const table = new LocalizationTable(
      {
        en: {
          hello: "Hello",
        },
        ja: {
          hello: "こんにちは",
        },
      },
      []
    )
    expect(table.getString("en", "hello")).toBe("Hello")
    expect(table.getString("ja", "hello")).toBe("こんにちは")
  })
  test("getLanguage", () => {
    const table = new LocalizationTable(
      {
        en: {
          hello: "Hello",
        },
        ja: {
          hello: "こんにちは",
        },
      },
      []
    )
    expect(table.getLanguage("en")).toBe("en")
    expect(table.getLanguage("ja")).toBe("ja")
    expect(table.getLanguage("zh")).toBe(null)
    expect(table.getLanguage("en-US")).toBe(null)
  })
  test("alias", () => {
    const table = new LocalizationTable(
      {
        en: {
          hello: "Hello",
        },
        ja: {
          hello: "こんにちは",
        },
      },
      [[/^en-/, "en"]]
    )
    expect(table.getLanguage("en")).toBe("en")
    expect(table.getLanguage("ja")).toBe("ja")
    expect(table.getLanguage("en")).toBe("en")
    expect(table.getLanguage("en-US")).toBe("en")
  })
})
