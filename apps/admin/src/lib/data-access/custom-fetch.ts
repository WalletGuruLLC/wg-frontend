/**
 * customFetch is a wrapper around the native fetch function that adds the Authorization header to the request.
 * It also allows you to specify the response type as a generic parameter and automatically parses the response as JSON.
 *
 * @param params The same parameters as the native fetch function.
 * @returns A promise that resolves to the parsed JSON response.
 *
 * @example
 * const data = await customFetch<{ name: string }>("https://api.example.com/user-data/123");
 * console.log(data.name);
 */
export default async function customFetch<ResponseType>(
  ...params: Parameters<typeof fetch>
) {
  const res = await fetch(params[0], {
    ...params[1],
    headers: {
      ...params[1]?.headers,
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  }).catch((err) => {
    throw new Error("UE1", {
      cause: err,
    });
  });

  if (!res.ok) throw new Error("UE2");

  const json = (await res.json()) as {
    statusCode: number;
    customCode: string;
    data?: ResponseType;
  };

  if (json.statusCode !== 200)
    throw new Error(json.customCode, { cause: json });

  return json.data as ResponseType; // double cast to avoid TS thinking its undefined
}
