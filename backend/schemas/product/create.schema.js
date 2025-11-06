import * as z from "zod";

export const CreateProduct = z.object({
    name: z.string("Name should be string").min(2,"Name at least two characters"),
    description: z.string("Description should be string"),
    image: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain
    }),
    category: z.string("Category should be string").min(2,"Category at least two characters"),
    price: z.number("Price should be number").min(0.1,"Price should greater than 0.1 dollar")
})