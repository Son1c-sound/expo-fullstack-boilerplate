import { v } from "convex/values";
import { mutation,   query } from "./_generated/server";


export const getMessages = query(async (ctx) => {
    const messages = await ctx.db.query("user_food_history").collect();
    return messages;
});

export const addMessage = mutation({
  args: { userId: v.id('user'), food_items: v.array(v.object({ name: v.string(), quantity: v.string(), calories: v.number(), carbs: v.number(), fat: v.number(), protein: v.number() })), total: v.object({ name: v.string(), quantity: v.string(), calories: v.number(), carbs: v.number(), fat: v.number(), protein: v.number() }), message: v.string(), createdAt: v.number() },
  handler: async (ctx, args) => {
      await ctx.db.insert("user_food_history", { userId: args.userId, food_items: args.food_items, total: args.total, message: args.message, createdAt: args.createdAt });
  },
});
