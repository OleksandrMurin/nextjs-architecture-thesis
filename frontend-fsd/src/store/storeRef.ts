import type { Store } from "@reduxjs/toolkit";

let store: Store | undefined;

export function injectStore(s: Store) {
  store = s;
}

export function getStore() {
  if (!store) {
    throw new Error(
      "Store not injected. Call injectStore(store) at app startup.",
    );
  }
  return store;
}
