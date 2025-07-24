import { v } from 'convex/values';
import { query, mutation } from '../_generated/server';

export const addFoodHistory = mutation({
  args: {
    userId: v.id('user'),
    food_items: v.array(
      v.object({
        name: v.string(),
        quantity: v.string(),
        calories: v.number(),
        carbs: v.number(),
        fat: v.number(),
        protein: v.number(),
      })
    ),
    total: v.object({
      name: v.string(),
      quantity: v.string(),
      calories: v.number(),
      carbs: v.number(),
      fat: v.number(),
      protein: v.number(),
    }),
    message: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('user_food_history', args);
  },
});

export const getFoodHistoryForUser = query({
  args: { userId: v.id('user') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('user_food_history')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .collect();
  },
});

export const deleteFoodHistory = mutation({
  args: { historyId: v.id('user_food_history') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.historyId);
  },
});
