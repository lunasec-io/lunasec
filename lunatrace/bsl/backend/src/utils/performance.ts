export function newBenchmarkTable(): Map<string, number> {
  return new Map<string, number>();
}

export const start = (tag?: string, bench?: Map<string, number>) => {
  const startTime = new Date().getMilliseconds();
  return () => {
    const endTime = new Date().getMilliseconds();
    const delta = endTime - startTime;

    if (tag !== undefined && bench !== undefined) {
      const perf = bench.get(tag);
      bench.set(tag, (perf || 0) + delta);
    }
    return delta;
  };
};
