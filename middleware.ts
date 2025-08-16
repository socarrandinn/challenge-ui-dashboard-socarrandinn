// middleware.ts (en la raíz del proyecto, al mismo nivel que app/)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/" && url.search === "") {
    url.searchParams.set("range", "2004-03-01_2004-05-01");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuración del matcher - especifica dónde se ejecuta el middleware
export const config = {
  matcher: "/",
};
