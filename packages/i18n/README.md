# Internationalization (i18n) package

This package provides a set of fully typed utilities to help you internationalize your application. It automatically generates the necessary hooks and components to handle translations and language changes. It also detects if the user changes the language in the browser and updates the values accordingly.

## Installation

To use this package, first include it in your dependencies list in your `package.json` file:

```json
{
  "dependencies": {
    "@wg-frontend/i18n": "workspace:*"
  }
}
```

## Usage

Create a file to store your translations and import the `createI18nHandlers` default function and the `I18nDictionary` type from the package:

> If you are using Next.js, you have to mark this file as client-only with the `"use client"` directive.

```typescript
// Only for next.js or other SSR frameworks
"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";
import createI18nHandlers from "@wg-frontend/i18n";
```

Then, create a dictionary with your translations and make sure it satisfies the `I18nDictionary` type:

```typescript
const dictionary = {
  en: {
    hello: "Hello, World!",
  },
  pt: {
    hello: "Olá, Mundo!",
  },
  es: {
    hello: "¡Hola, Mundo!",
  },
} satisfies I18nDictionary;
```

Finally, create the handlers for your i18n by providing the dictionary and the default language:

```typescript
export const { I18nProvider, useI18n } = createI18nHandlers(dictionary, "en");
```

Now you can use the `I18nProvider` and `useI18n` hooks to internationalize your application. You can use the `useI18n` hook to get the entire dictionary or a specific value from it.

```tsx
import { I18nProvider, useI18n } from "./i18n";

export default function App() {
  return (
    <I18nProvider>
      <MyComponent />
      <MyOtherComponent />
    </I18nProvider>
  );
}

function MyComponent() {
  const { values, language, setLanguage } = useI18n();

  return <h1>{values.hello}</h1>;
}

function MyOtherComponent() {
  const { value, language, setLanguage } = useI18n("hello");

  return <h1>{value}</h1>;
}
```

### Full files example

`i18n.ts`

```typescript
// Only for next.js or other SSR frameworks
"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";
import createI18nHandlers from "@wg-frontend/i18n";

const dictionary = {
  en: {
    hello: "Hello, World!",
  },
  pt: {
    hello: "Olá, Mundo!",
  },
  es: {
    hello: "¡Hola, Mundo!",
  },
} satisfies I18nDictionary;

export const { I18nProvider, useI18n } = createI18nHandlers(dictionary, "en");
```

`App.tsx`

```tsx
import { I18nProvider, useI18n } from "./i18n";

export default function App() {
  return (
    <I18nProvider>
      <MyComponent />
      <MyOtherComponent />
    </I18nProvider>
  );
}

function MyComponent() {
  const { values, language, setLanguage } = useI18n();

  return <h1>{values.hello}</h1>;
}

function MyOtherComponent() {
  const { value, language, setLanguage } = useI18n("hello");

  return <h1>{value}</h1>;
}
```
