export const fetcher = async (
  query: string,
  variables?: Record<string, unknown>
) => {
  return fetch(`${process.env.EVENT_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
};
