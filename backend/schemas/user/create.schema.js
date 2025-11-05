import * as z from "zod";

export const CreateUser = z.object({
     first_name: z.string("Name should be string").min(2,"Name at least two characters"),
     last_name: z.string("Name should be string").min(2,"Name at least two characters"),
     email: z.email(),
     password: z.string("Password should be string").min(6,"Password at least six characters")
})