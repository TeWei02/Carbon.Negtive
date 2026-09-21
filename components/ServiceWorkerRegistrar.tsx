"use client";
import { useEffect } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** 註冊 Service Worker，讓站點可離線瀏覽。 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker.register(`${BASE_PATH}/sw.js`).catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  }, []);
  return null;
}
