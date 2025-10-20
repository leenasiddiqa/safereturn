import React, { createContext, useContext, useReducer, useEffect } from "react";
import { nanoid } from "nanoid";

const STORAGE_KEY = "safereturn:v1";

const initialState = {
  items: [],
  claims: [],
  logs: [],
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const data = JSON.parse(raw);
    return {
      items: data.items || [],
      claims: data.claims || [],
      logs: data.logs || [],
    };
  } catch {
    return initialState;
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = {
        id: nanoid(),
        createdAt: Date.now(),
        type: action.input.type,
        name: action.input.name,
        brand: action.input.brand || "",
        category: action.input.category || "Other",
        description: action.input.description || "",
        location: action.input.location || "",
        hiddenHints: action.input.hiddenHints || "",
        isImportantDoc: !!action.input.isImportantDoc,
      };
      return {
        ...state,
        items: [item, ...state.items],
        logs: [{ ts: Date.now(), type: "item:add", itemId: item.id }, ...state.logs],
      };
    }
    case "ADD_CLAIM": {
      const claim = {
        id: nanoid(),
        itemId: action.input.itemId,
        claimantName: action.input.claimantName,
        contact: action.input.contact,
        providedHints: action.input.providedHints,
        status: "pending",
        createdAt: Date.now(),
      };
      return {
        ...state,
        claims: [claim, ...state.claims],
        logs: [{ ts: Date.now(), type: "claim:add", itemId: claim.itemId, claimId: claim.id }, ...state.logs],
      };
    }
    case "REVIEW_CLAIM": {
      const claims = state.claims.map((c) =>
        c.id === action.claimId
          ? { ...c, status: action.status }
          : c
      );
      return { ...state, claims };
    }
    case "FINALIZE_CLAIM": {
      const claims = state.claims.map((c) =>
        c.id === action.claimId ? { ...c, finalized: true } : c
      );
      const claim = claims.find((c) => c.id === action.claimId);
      const items = state.items.map((i) =>
        i.id === claim.itemId
          ? { ...i, claimId: claim.id, claimedBy: claim.claimantName }
          : i
      );
      return { ...state, claims, items };
    }
    case "AUTO_PROCESS_AGING": {
      const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const updates = [];
      for (const item of state.items) {
        const age = now - item.createdAt;
        if (!item.claimId && age > THIRTY_DAYS) {
          if (item.isImportantDoc) {
            updates.push({ action: "delivery", itemId: item.id });
          } else {
            updates.push({ action: "donate", itemId: item.id });
          }
        }
      }
      let logs = state.logs;
      for (const u of updates) {
        logs = [{ ts: now, type: "aging:" + u.action, itemId: u.itemId }, ...logs];
      }
      return { ...state, logs };
    }
    case "LOAD": {
      return action.state;
    }
    default:
      return state;
  }
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, load);

  useEffect(() => {
    save(state);
  }, [state]);

  // Helper functions
  const addItem = (input) => dispatch({ type: "ADD_ITEM", input });
  const addClaim = (input) => dispatch({ type: "ADD_CLAIM", input });
  const reviewClaim = (claimId, status) => dispatch({ type: "REVIEW_CLAIM", claimId, status });
  const finalizeClaim = (claimId) => dispatch({ type: "FINALIZE_CLAIM", claimId });
  const autoProcessAging = () => dispatch({ type: "AUTO_PROCESS_AGING" });

  // Matching logic (pure function)
  const searchPotentialMatches = (item) => {
    const tokens = (item.name + " " + item.brand)
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
    const score = (other) => {
      if (other.category !== item.category) return 0;
      const otherTokens = (other.name + " " + other.brand)
        .toLowerCase()
        .split(/\W+/);
      return tokens.filter((t) => otherTokens.includes(t)).length;
    };
    const candidates = state.items.filter(
      (i) => i.id !== item.id && i.type !== item.type
    );
    return candidates
      .map((i) => ({ item: i, s: score(i) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 5)
      .map((x) => x.item);
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        addItem,
        addClaim,
        reviewClaim,
        finalizeClaim,
        autoProcessAging,
        searchPotentialMatches,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
