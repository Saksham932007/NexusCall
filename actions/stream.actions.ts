"use server";

// Remove currentUser import
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

// Accept userId as parameter instead of using currentUser()
export const tokenProvider = async (userId: string) => {
  try {
    if (!userId) throw new Error("User ID is missing");
    if (!STREAM_API_KEY) throw new Error("Stream API key secret is missing");
    if (!STREAM_API_SECRET) throw new Error("Stream API secret is missing");

    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(userId, expirationTime, issuedAt);

    return token;
  } catch (error) {
    console.error("Token provider error:", error);
    throw error;
  }
};
