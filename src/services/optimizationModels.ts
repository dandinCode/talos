import type { OptimizationModel } from '@/types/types'
import { analysisApi } from './http/analysisApi'

export async function fetchOptimizationModels(): Promise<OptimizationModel[]> {
  const res = await analysisApi.get('/analysis/models')
  return res.data
}
