import * as z from "zod";

export const LoginUser = z.object({
     email: z.email(),
     password: z.string().min(6,"Password at least six characters")
})