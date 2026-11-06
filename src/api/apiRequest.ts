export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      responseText || `HTTP ${response.status}: ${response.statusText}`,
    );
  }

  // The current API endpoints return JSON. Handle empty responses explicitly.
  if (response.status === 204) {
    return undefined as T;
  }

  console.log(`apiRequest: ${endpoint} returned status ${response.status}`);
  console.log(`apiRequest: response body: ${await response.clone().text()}`);

  return response.json() as Promise<T>;
}
