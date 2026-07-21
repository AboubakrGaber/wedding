import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Database is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const attending = Boolean(body.attending);
    const guests = attending
      ? Math.min(20, Math.max(1, Number(body.guests) || 1))
      : 0;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("rsvp").insert([
      { name, phone: phone || null, guests, message: message || null, attending },
    ]);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
