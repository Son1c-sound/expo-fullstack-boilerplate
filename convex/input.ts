import { v } from "convex/values";
import { mutation,   query } from "./_generated/server";


export const getMessages = query(async (ctx) => {
    const messages = await ctx.db.query("inputs").collect();
    return messages;
});

export const addMessage = mutation({
  args: { messageData: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("inputs", { messageData: args.messageData });
  },
});
