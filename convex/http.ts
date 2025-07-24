import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";


const http = httpRouter();


export const doSoomething = httpAction(async (ctx, req) => {
  try {
    const { data, type } = await req.json();

    switch (type) { 
      case "user.created":
         await ctx.runMutation(internal.functions.user.createUser, {
          email: data.email_addresses[0].email_address,
          clerkId: data.id,
         })
        break;
      case "user.updated":
        console.log("user updated", data);
        break;
      case "user.deleted":
        console.log("user deleted", data);
        break;
      default:
        console.log("Unknown event type:", type);
    }
    return new Response("User added", { status: 200 });
  } catch (error) {
    console.log("Debug: GET request received, no JSON body");
    return new Response("Webhook endpoint ready for POST requests", { status: 200 });
  }
});



http.route({
   path: "/clerk-users-webhook",
   method: "POST",
   handler: doSoomething,
})

export default http


