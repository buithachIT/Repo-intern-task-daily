import { STORAGE_KEY } from "@/config/storageKeys";
import { NextResponse } from "next/server";

export async function POST() {

  const res = new NextResponse(undefined, { status: 204 });

  // Xoá cookie
  res.cookies.delete({
    name: STORAGE_KEY.REFRESH_TOKEN,
    path: "/",
  });

  return res;
}
