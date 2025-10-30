import { NextRequest, NextResponse } from 'next/server';
import { transformSync } from '@swc/core';

/**
 * POST /api/transpile-jsx
 * Transpile JSX/TSX code to JavaScript on the server
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No code provided' },
        { status: 400 }
      );
    }

    // Transpile JSX to JavaScript using SWC
    const result = transformSync(code, {
      jsc: {
        parser: {
          syntax: 'ecmascript',
          jsx: true,
        },
        transform: {
          react: {
            runtime: 'classic',
            pragma: 'React.createElement',
            pragmaFrag: 'React.Fragment',
          },
        },
        target: 'es2020',
      },
      module: {
        type: 'commonjs',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        code: result.code,
      },
    });
  } catch (error) {
    console.error('JSX transpilation error:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Transpilation failed',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
