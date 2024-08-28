import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

/**
 * A dictionary of translations. The first level is the language, the second
 * level is the key and the value is the translation.
 *
 * @example
 * const dictionary = {
 *    en: {
 *      hello: "Hello, World!",
 *    },
 *    pt: {
 *      hello: "Olá, Mundo!",
 *    },
 *    es: {
 *      hello: "¡Hola, Mundo!",
 *    },
 * } satisfies I18nDictionary;
 */
export type I18nDictionary = Readonly<
  Record<Readonly<string>, Readonly<Record<string, string>>>
>;

/**
 * A fully typed function that creates a provider and a hook to handle translations.
 *
 * @example
 * export const { I18nProvider, useI18n } = createI18nHandlers(dictionary, "en");
 */
export default function createI18nHandlers<
  Dictionary extends I18nDictionary,
  Language extends keyof Dictionary = keyof Dictionary,
>(dictionary: Dictionary, defaultLanguage: Language) {
  const I18nContext = createContext<{
    language: Language;
    setLanguage: Dispatch<SetStateAction<Language>>;
    values: Dictionary[Language];
  }>({
    language: defaultLanguage,
    setLanguage: () => null,
    values: dictionary[defaultLanguage],
  });

  /**
   * A provider to handle translations. It sets the current language based on the
   * browser language or the default language if the browser language is not available.
   * @param children The children that consumes the translations.
   * @example
   * export default function App() {
   *  return (
   *    <I18nProvider>
   *      <RootLayout>
   *    </I18nProvider>
   *    );
   * }
   */
  function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState(() => {
      if (typeof window === "undefined") {
        return defaultLanguage;
      }

      const browserLanguages = navigator.languages.map(
        (lang) => lang.split("-")[0],
      );

      for (const browserLanguage of browserLanguages) {
        if (Object.keys(dictionary).includes(browserLanguage ?? "")) {
          return browserLanguage as Language;
        }
      }

      return defaultLanguage;
    });

    return (
      <I18nContext.Provider
        value={{ language, setLanguage, values: dictionary[language] }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  /**
   * A hook to handle translations. It returns the current language, the whole dictionary
   * for the current language and the value for a specific key if provided.
   * @param key The fully typed key to get the translation for. Optional.
   * @returns The current language, the whole dictionary for the current language and the value for a specific key if provided.
   * @example
   * const { value, values, language } = useI18n("hello");
   */
  const useI18n = (key?: keyof Dictionary[Language]) => {
    const ctx = useContext(I18nContext);
    return {
      value: key ? ctx.values[key] : null,
      ...ctx,
    };
  };

  return {
    I18nProvider,
    useI18n,
  };
}

/**
 * A fully typed key to get a translation from the dictionary.
 *
 * @example
 * type MyKeys = I18nKeyHelper<typeof dictionary>;
 */
export type I18nKeyHelper<Dictionary extends I18nDictionary> =
  keyof Dictionary[keyof Dictionary];
