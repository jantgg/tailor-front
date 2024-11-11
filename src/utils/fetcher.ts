type FetcherOptions = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  body?: Record<string, unknown>;
  token?: string;
};

const fetcher = async ({
  method,
  endpoint,
  body,
  token,
}: FetcherOptions): Promise<unknown> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined in the environment variables");
  }

  const url = `${baseUrl}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      // En lugar de lanzar un error genérico, solo pasar el mensaje
      throw { status: response.status, message: errorMessage };
    }
    return await response.json();
  } catch (error) {
    // Ahora capturamos el error con más detalle
    console.error("Fetch error:", error);
    throw error; // Lanzamos el error sin envolverlo
  }
};

export default fetcher;
