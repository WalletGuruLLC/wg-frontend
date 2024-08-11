export default function customFetch<ResponseType>(
  ...params: Parameters<typeof fetch>
) {
  return fetch(params[0], {
    ...params[1],
    headers: {
      ...params[1]?.headers,
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  }).then((res) => res.json()) as Promise<ResponseType>;
}
