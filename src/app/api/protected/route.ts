export async function GET() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated()) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = getUser();

  const data = { message: "Hello User", id: user.id };

  return NextResponse.json({ data });
}
