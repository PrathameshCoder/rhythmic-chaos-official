import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand ISR revalidation, triggered by the admin dashboard after a release
 * is created / updated / archived / deleted.
 *
 * Auth: shared secret in the `x-revalidate-secret` header, compared against
 * SUPABASE_REVALIDATION_SECRET. If the secret isn't configured, the endpoint
 * refuses (time-based ISR still keeps the site fresh).
 *
 * Body: { slug?: string }  — revalidates "/", "/music", and "/music/<slug>".
 */
export async function POST(request: Request) {
  const secret = process.env.SUPABASE_REVALIDATION_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!secret || provided !== secret) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { slug } = (await request.json().catch(() => ({}))) as {
    slug?: string;
  };

  revalidatePath("/");
  revalidatePath("/music");
  if (slug) revalidatePath(`/music/${slug}`);

  return NextResponse.json({
    ok: true,
    revalidated: ["/", "/music", slug ? `/music/${slug}` : null].filter(
      Boolean
    ),
  });
}
