import { NextResponse } from "next/server";

type JsonObj = Record<string, unknown>;

export function ok(data: JsonObj, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

export function badRequest(error: JsonObj) {
    return NextResponse.json({ success: false, error }, { status: 400 });
}

export function serverError(error: JsonObj) {
    return NextResponse.json({ success: false, error }, { status: 500 });
}

export function unauthorized(error: JsonObj) {
    return NextResponse.json({ success: false, error }, { status: 401 });
}

export function invalidToken(error: JsonObj) {
    return NextResponse.json({ success: false, error }, { status: 401 });
}