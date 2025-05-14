import express, { Request, Response } from 'express';
import cors from 'cors';
import { HOLDINGS, ASSETS, ASSET_TYPES, AssetType } from './data';

const app = express();
const port = 4001;
app.use(cors());


app.get('/status', (_req: Request, res: Response) => {
  res.send('OK');
});


app.get('/portfolio', (req: Request, res: Response) => {
  const userId = req.query.user_id as string;
  const assetType = req.query.asset_type as string | undefined;
  
  if (!userId) {
    return res.status(400).json({ error: "Invalid or missing user_id" });
  }

  if (!(userId in HOLDINGS)) {
    return res.status(404).json({ error: "User not found" });
  }

  if (assetType && !ASSET_TYPES.has(assetType as AssetType)) {
    return res.status(400).json({ error: "Invalid asset_type" });
  }

  const userHoldings = HOLDINGS[userId];
  if (!userHoldings) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const aggregated: Record<string, number> = {};

  for (const wallet of Object.values(userHoldings)) {
    for (const { asset_id, amount } of wallet) {
      aggregated[asset_id] = (aggregated[asset_id] || 0) + amount;
    }
  }

  let result = Object.entries(aggregated)
    .map(([asset_id, value]) => {
      const asset = ASSETS[asset_id];
      return {
        ...asset,
        value,
      };
    });

  if (assetType) {
    result = result.filter(asset => asset.type === assetType);
  }

  const totalValue = result.reduce((sum, item) => sum + item.value, 0);

  result = result
    .map(item => ({
      ...item,
      percentage: totalValue > 0 ? parseFloat(((item.value / totalValue) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.value - a.value);

  return res.json(result);
});


app.get('/portfolio/chart', (req: Request, res: Response) => {
  const userId = req.query.user_id as string;
  const userHoldings = HOLDINGS[userId];

  if (!userHoldings) {
    return res.status(404).json({ error: 'User not found' });
  }

  const typeTotals: Record<AssetType, number> = {
    stock: 0,
    bond: 0,
    crypto: 0,
    nft: 0,
    defi: 0,
    real_estate: 0,
  };

  let totalValue = 0;

  for (const wallet of Object.values(userHoldings)) {
    for (const { asset_id, amount } of wallet) {
      const asset = ASSETS[asset_id];
      if (!asset) continue;

      const assetType = asset.type as AssetType;
      typeTotals[assetType] += amount;
      totalValue += amount;
    }
  }

  const chart: Partial<Record<AssetType, number>> = {};

  for (const type of ASSET_TYPES) {
    const value = typeTotals[type];
    if (value > 0) {
      chart[type] = totalValue ? parseFloat(((value / totalValue) * 100).toFixed(2)) : 0;
    }
  }

  return res.json({
    total_value: totalValue,
    chart,
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});