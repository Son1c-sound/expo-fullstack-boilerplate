import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';



export default defineSchema({
   user: defineTable({
     email: v.string(),
     clerkId: v.string(), // now required
   }).index("by_clerk_id", ["clerkId"]),
   user_food_history: defineTable({
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
   }),
   user_personal_settings: defineTable({
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
   }),
 });
 