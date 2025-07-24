import { internalMutation, mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const createUser = internalMutation({
  args: {
    email: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("user", {
      email: args.email,
      clerkId: args.clerkId,
    });
    return userId;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();
  },
});
