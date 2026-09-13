import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ConstraintConfig } from '@/types/types';

export const DEFAULT_CONSTRAINTS: ConstraintConfig = {
  useRiskLimit: true,
  useSectorCap: true,
  useFullAllocation: true,
  requireMinSectors: true,
};

export const useAnalysisStore = defineStore('analysisStore', () => {
  const selectedSymbols = ref<string[]>([]);
  const start = ref<string>('');
  const end = ref<string>('');
  const acceptableRisk = ref<number | null>(null);
  const modelId = ref<string>('1.0');
  const constraints = ref<ConstraintConfig>({ ...DEFAULT_CONSTRAINTS });

  function toggleSymbol(symbol: string) {
    const i = selectedSymbols.value.indexOf(symbol);
    if (i >= 0) {
      selectedSymbols.value.splice(i, 1);
    } else {
      selectedSymbols.value.push(symbol);
    }
  }

  function selectAll(symbols: string[]) {
    selectedSymbols.value = [...symbols];
  }

  function clearSelection() {
    selectedSymbols.value = [];
  }

  function setModelId(id: string) {
    modelId.value = id;
  }

  function setConstraint<K extends keyof ConstraintConfig>(key: K, value: ConstraintConfig[K]) {
    constraints.value[key] = value;
  }

  function resetConstraints() {
    constraints.value = { ...DEFAULT_CONSTRAINTS };
  }

  return {
    selectedSymbols,
    start,
    end,
    acceptableRisk,
    modelId,
    constraints,
    toggleSymbol,
    selectAll,
    clearSelection,
    setModelId,
    setConstraint,
    resetConstraints,
  }
})
