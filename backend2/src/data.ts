export type Holding = { asset_id: string; amount: number };
export type Wallets = Record<string, Holding[]>;
export type HoldingsMap = Record<string, Wallets>;
export type Asset = {
  ticker: string;
  name: string;
  type: AssetType;
};

export type AssetType =
  | "stock"
  | "bond"
  | "crypto"
  | "nft"
  | "defi"
  | "real_estate";

export const ASSET_TYPES: Set<AssetType> = new Set([
  "stock",
  "bond",
  "crypto",
  "nft",
  "defi",
  "real_estate",
]);

export const HOLDINGS: HoldingsMap = {
  user_1: {
    wallet_1: [
      { asset_id: "asset_1", amount: 37653 },
      { asset_id: "asset_2", amount: 746 },
    ],
    wallet_2: [
      { asset_id: "asset_1", amount: 4376 },
      { asset_id: "asset_3", amount: 7348 },
    ],
  },
  user_2: {
    wallet_4: [
      { asset_id: "asset_1", amount: 8553 },
      { asset_id: "asset_3", amount: 234 },
    ],
  },
};

export const ASSETS: Record<string, Asset> = {
  asset_1: { ticker: "BTC", name: "Bitcoin", type: "crypto" },
  asset_2: { ticker: "ETH", name: "Ethereum", type: "crypto" },
  asset_3: { ticker: "AAPL", name: "Apple", type: "stock" },
};
