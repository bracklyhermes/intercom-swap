export function simulateSwap(quote: any) {
  return {
    simulationId: "SIM-" + Math.random().toString(36).slice(2),
    status: "SIMULATED_SUCCESS",
    receivedAmount: quote.estimatedOutput,
    routeUsed: quote.executionRoute,
    completedAt: new Date().toISOString(),
  };
}