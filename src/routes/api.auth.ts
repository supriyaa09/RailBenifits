import { createFileRoute } from "@tanstack/react-router";
import { findUserByUserId, seedInitialUsers, createUser } from "@/database/users";
import { signJwtToken, verifyJwtToken, verifyPassword } from "@/lib/auth";

export const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          // Initialize seed users
          await seedInitialUsers();

          const url = new URL(request.url);
          const action = url.searchParams.get("action") || "me";

          if (action === "logout") {
            return new Response(
              JSON.stringify({ success: true, message: "Logged out successfully" }),
              {
                status: 200,
                headers: {
                  "Content-Type": "application/json",
                  "Set-Cookie": "auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
                },
              },
            );
          }

          // Read cookie or Bearer authorization header
          const cookieHeader = request.headers.get("cookie") || "";
          const authHeader = request.headers.get("authorization") || "";

          let token: string | null = null;
          if (authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
          } else {
            const match = cookieHeader.match(/auth_token=([^;]+)/);
            if (match) {
              token = match[1];
            }
          }

          if (!token) {
            return new Response(JSON.stringify({ authenticated: false, user: null }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }

          const decodedPayload = await verifyJwtToken(token);
          if (!decodedPayload) {
            return new Response(
              JSON.stringify({ authenticated: false, error: "Invalid or expired token" }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          return new Response(
            JSON.stringify({
              authenticated: true,
              user: {
                id: decodedPayload.id,
                userId: decodedPayload.userId,
                name: decodedPayload.name,
                role: decodedPayload.role,
                department: decodedPayload.department,
              },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error: any) {
          console.error("Auth GET error:", error);
          return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          // Initialize seed users if database is fresh
          await seedInitialUsers();

          const body = await request.json();
          const { action, userId, password, role } = body || {};

          if (action === "register") {
            if (!userId || !password) {
              return new Response(
                JSON.stringify({ error: "User ID and Password are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } },
              );
            }

            const existing = findUserByUserId(userId);
            if (existing) {
              return new Response(
                JSON.stringify({ error: "User ID already exists" }),
                { status: 409, headers: { "Content-Type": "application/json" } },
              );
            }

            const newUser = await createUser({
              userId,
              name: body.name || userId,
              password,
              role: role === "officer" ? "officer" : "employee",
              department: body.department,
            });

            const token = await signJwtToken({
              id: newUser.id,
              userId: newUser.user_id,
              name: newUser.name,
              role: newUser.role,
              department: newUser.department,
            });

            return new Response(
              JSON.stringify({
                success: true,
                user: {
                  id: newUser.id,
                  userId: newUser.user_id,
                  name: newUser.name,
                  role: newUser.role,
                  department: newUser.department,
                },
                token,
              }),
              {
                status: 201,
                headers: {
                  "Content-Type": "application/json",
                  "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
                },
              },
            );
          }

          // Default POST: Login Workflow
          if (!userId || !password) {
            return new Response(
              JSON.stringify({ error: "Please provide both User ID and Password." }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const user = findUserByUserId(userId);
          if (!user) {
            return new Response(
              JSON.stringify({ error: `No registered account found for ID '${userId}'.` }),
              { status: 401, headers: { "Content-Type": "application/json" } },
            );
          }

          const isValidPassword = await verifyPassword(password, user.password_hash);
          if (!isValidPassword) {
            return new Response(
              JSON.stringify({ error: "Invalid password. Please check your credentials." }),
              { status: 401, headers: { "Content-Type": "application/json" } },
            );
          }

          const token = await signJwtToken({
            id: user.id,
            userId: user.user_id,
            name: user.name,
            role: user.role,
            department: user.department,
          });

          return new Response(
            JSON.stringify({
              success: true,
              user: {
                id: user.id,
                userId: user.user_id,
                name: user.name,
                role: user.role,
                department: user.department,
              },
              token,
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
              },
            },
          );
        } catch (error: any) {
          console.error("Auth POST error:", error);
          return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
