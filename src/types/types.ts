export interface Stock {
  symbol: string
  id: number
  status: string
  createdAt: Date
  createdById: number
}

export interface StockSymbol {
  id: number
  symbol: string
  status: string
  sector?: string
  company?: string
}

export interface ConstraintConfig {
  useRiskLimit: boolean;
  useSectorCap: boolean;
  useFullAllocation: boolean;
  requireMinSectors: boolean;
}

export interface OptimizationModel {
  id: string;
  name: string;
  description: string;
  version: string;
  customizable: boolean;
  defaultConstraints: ConstraintConfig;
}

export interface PortfolioAnalysis {
  stocks: string[]
  start?: string
  end?: string
  acceptableRisk?: number
  modelId?: string
  constraints?: ConstraintConfig
}

export interface AuthResponse {
  access_token: string
}

export interface LoginResponse {
  access_token: string
}
export interface SavePortfolioPayload {
  name: string
  totalRisk: number
  totalReturn: number
  stocks: {
    stock: string
    percentage: number
  }[]
}

export interface User {
  id?: number
  name?: string
  email?: string
  sub?: number
  createdAt?: string
}

export interface StocksSummary {
  totalAssets: number
  lastUpdate: string | null
}
