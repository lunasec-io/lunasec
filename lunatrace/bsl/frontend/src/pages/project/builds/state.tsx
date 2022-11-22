import { QuickViewCwe, QuickViewState, QuickViewVulnerability } from './types';

export function vulnerabilityOpenInQuickView(state: QuickViewState | null, vulnId: string): boolean {
  if (state === null) {
    return false;
  }
  return state.type === 'vulnerability' && state.id === vulnId;
}

export function vulnerabilityQuickViewState(id: string): QuickViewVulnerability {
  return {
    type: 'vulnerability',
    id,
  };
}

export function cweQuickViewState(id: number): QuickViewCwe {
  return {
    type: 'cwe',
    id,
  };
}
