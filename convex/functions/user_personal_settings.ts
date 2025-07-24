import { mutation, query } from '../_generated/server';
import { v } from 'convex/values';

export const upsertPersonalSettings = mutation({
  args: {
    userId: v.id('user'),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    currentWeight: v.optional(v.number()),
    height: v.optional(v.number()),
    goalWeight: v.optional(v.number()),
    speedRateWeekly: v.optional(v.number()),
    activityLevel: v.optional(v.string()),
    selectedGoal: v.optional(v.string()),
    weightUnit: v.optional(v.string()),
    heightUnit: v.optional(v.string()),
    goalWeightUnit: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('user_personal_settings')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert('user_personal_settings', args);
    }
  },
});

export const getPersonalSettings = query({
  args: { userId: v.id('user') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('user_personal_settings')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique();
  },
});
