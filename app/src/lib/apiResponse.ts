import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

export function successResponse<T>(data: T, message: string = 'Success', status: number = 200) {
  const response: ApiResponse<T> = {
    status: 'OK',
    message,
    response: data
  };
  return NextResponse.json(response, { status });
}

export function errorResponse(message: string, status: number = 500) {
  const response: ApiResponse<null> = {
    status: 'Error',
    message,
    response: null
  };
  return NextResponse.json(response, { status });
}
