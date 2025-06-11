import { getAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const auth = await getAuth()
export const { GET, POST } = toNextJsHandler(auth.handler);
