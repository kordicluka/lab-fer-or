import { NextResponse } from 'next/server';
import openApiSpec from '@/../../public/openapi.json';

export async function GET() {
  return NextResponse.json(openApiSpec);
}
