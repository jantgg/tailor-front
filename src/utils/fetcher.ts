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
  
  // Consola para verificar la URL y token
  console.log("Request URL:", url);
  console.log("Token:", token);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("Authorization Header:", headers["Authorization"]); // Consola para verificar el encabezado
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
      throw { status: response.status, message: errorMessage };
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetcher;

