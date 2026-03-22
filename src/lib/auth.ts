export async function getAuth() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'include' });
    if (!res.ok) return { authenticated: false };
    return await res.json();
  } catch (e) {
    return { authenticated: false };
  }
}
