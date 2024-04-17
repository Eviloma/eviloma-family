"use server";

import LogtoClient from "@logto/next/server-actions";
import type { GetContextParameters } from "@logto/node";
import { cookies } from "next/headers";

import { env } from "@/env";

const config = {
  appId: env.LOGTO_APP_ID,
  appSecret: env.LOGTO_APP_SECRET,
  endpoint: env.LOGTO_ENDPOINT,
  baseUrl: env.VERCEL_URL ?? env.BASE_URL,
  cookieSecret: env.LOGTO_COOKIE_SECRET,
  cookieSecure: env.NODE_ENV === "production",
  scopes: ["email", "admin:family"],
  resources: [`${env.VERCEL_URL ?? env.BASE_URL}/api`],
};

const logtoClient = new LogtoClient(config);

const cookieName = `logto:${config.appId}`;

const setCookies = (value?: string) => {
  if (value === undefined) {
    return;
  }

  cookies().set(cookieName, value, {
    maxAge: 14 * 3600 * 24,
    secure: config.cookieSecure,
  });
};

const getCookie = () => {
  return cookies().get(cookieName)?.value ?? "";
};

export const signIn = async () => {
  const { url, newCookie } = await logtoClient.handleSignIn(getCookie(), `${config.baseUrl}/callback`);

  setCookies(newCookie);

  return url;
};

export const handleSignIn = async (searchParams: URLSearchParams) => {
  const search = searchParams.toString();

  const newCookie = await logtoClient.handleSignInCallback(getCookie(), `${config.baseUrl}/callback?${search}`);

  setCookies(newCookie);
};

export const signOut = async () => {
  const url = await logtoClient.handleSignOut(getCookie(), `${config.baseUrl}/`);

  setCookies("");

  return url;
};

export const getLogtoContext = async (configs?: GetContextParameters) => {
  return logtoClient.getLogtoContext(getCookie(), { resource: config.resources[0], ...configs });
};
