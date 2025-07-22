import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    inputs: defineTable({
        messageData: v.string(),
    }),
})





