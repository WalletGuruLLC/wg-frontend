import { navigate } from "../actions";

const TIMEOUT_MILLISECONDS = 60000;

/**
 * customFetch is a wrapper around the native fetch function that adds the Authorization header to the request.
 * It also allows you to specify the response type as a generic parameter and automatically parses the response as JSON.
 * Special case: if you want to send a request without the Content-Type header, you can set the x-no-content-type header.
 *
 * @param params The same parameters as the native fetch function.
 * @returns A promise that resolves to the parsed JSON response.
 *
 * @example
 * const data = await customFetch<{ name: string }>("https://api.example.com/user-data/123");
 * console.log(data.name);
 */
/*
export default async function customFetch<ResponseType>(
  ...params: Parameters<typeof fetch>
) {
  const headers = new Headers(params[1]?.headers);
  headers.append(
    "Authorization",
    `Bearer ${localStorage.getItem("access-token")}`,
  );
  headers.append("Content-Type", "application/json");
  if (headers.has("x-no-content-type")) headers.delete("Content-Type");

  const res = await fetch(params[0], {
    ...params[1],
    signal: AbortSignal.timeout(TIMEOUT_MILLISECONDS),
    headers,
  }).catch((err) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err.name === "TimeoutError") throw new Error("WGE0016", { cause: err });
    throw err;
  });

  const json = (await res.json()) as {
    statusCode: number;
    customCode: string;
    data: ResponseType;
  };

  if (!res.ok) {
    if (json.customCode === "WGE0021") await navigate("/login");
    throw new Error(json.customCode, { cause: json });
  }

  return json.data;
}
*/
export default async function customFetch<ResponseType>(
  ...params: Parameters<typeof fetch>
) {
  const headers = new Headers(params[1]?.headers);
  headers.append(
    "Authorization",
    `Bearer ${localStorage.getItem("access-token")}`,
  );
  headers.append("Content-Type", "application/json");
  if (headers.has("x-no-content-type")) headers.delete("Content-Type");

  const res = await fetch(params[0], {
    ...params[1],
    signal: AbortSignal.timeout(TIMEOUT_MILLISECONDS),
    headers,
  }).catch((err) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (err.name === "TimeoutError") throw new Error("WGE0016", { cause: err });
    throw err;
  });

  const contentType = res.headers.get("content-type");

  // Si el servidor responde con CSV:
  if (contentType?.includes("text/csv")) {
    const csvText = await res.text();
    if (!res.ok) {
      // Manejo de errores para respuesta CSV, si aplica.
      throw new Error("Error al descargar el CSV");
    }
    // Simplemente retorna el texto CSV tal cual
    return csvText as unknown as ResponseType;
  } else {
    // Si no es CSV, se asume JSON como antes
    const json = (await res.json()) as {
      statusCode: number;
      customCode: string;
      data: ResponseType;
    };

    if (!res.ok) {
      if (json.customCode === "WGE0021") await navigate("/login");
      throw new Error(json.customCode, { cause: json });
    }

    return json.data;
  }
}
