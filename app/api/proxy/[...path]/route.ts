import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'PUT');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return handleRequest(request, path, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    const path = pathSegments.join('/');
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
    
    // Get search params from the request
    const searchParams = request.nextUrl.searchParams.toString();
    const fullUrl = searchParams ? `${apiUrl}?${searchParams}` : apiUrl;

    // Get access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    // Prepare headers
    const headers: HeadersInit = {
      'Accept': 'application/json',
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
    };

    // Handle request body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = request.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        const body = await request.json();
        options.body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      } else if (contentType?.includes('multipart/form-data')) {
        // For multipart, pass through the body as-is
        options.body = await request.blob();
        // Don't set Content-Type for multipart - let fetch handle it
      } else {
        // Default to JSON
        try {
          const body = await request.json();
          options.body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        } catch {
          // If no body, that's fine
        }
      }
    }

    // Make the API request
    const response = await fetch(fullUrl, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
