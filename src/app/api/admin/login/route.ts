import { NextRequest, NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/db';
import { verifyPassword, createSessionToken, TOKEN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const envUsername = (process.env.ADMIN_USERNAME || 'admin').trim();
    const envPassword = (process.env.ADMIN_PASSWORD || 'AdminPassword2026!').trim();

    let authenticatedUser: { id: string; username: string; name: string; role: string } | null = null;

    // First check against environment variables (.env / .env.local)
    if (
      username.trim().toLowerCase() === envUsername.toLowerCase() &&
      password === envPassword
    ) {
      const existingUser = await getUserByUsername(username.trim());
      authenticatedUser = {
        id: existingUser?.id || 'usr-admin-env',
        username: envUsername,
        name: existingUser?.name || 'Chief Editor',
        role: existingUser?.role || 'admin',
      };
    } else {
      // Fallback check against stored user in database
      const user = await getUserByUsername(username.trim());
      if (user) {
        const isValid = await verifyPassword(password, user.password_hash, user.salt);
        if (isValid) {
          authenticatedUser = {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role,
          };
        }
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken({
      id: authenticatedUser.id,
      username: authenticatedUser.username,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: authenticatedUser,
    });

    // Set secure httpOnly cookie
    response.cookies.set({
      name: TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
