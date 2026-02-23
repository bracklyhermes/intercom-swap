export function generateQuote(input: string, output: string, amount: string) {
  const amt = Number(amount);

  if (isNaN(amt)) {
    throw new Error("Invalid amount");
  }

  // fake pricing engine (simulasi dulu)
  const feeRate = 0.003;
  const priceImpact = 1.0125;

  const fee = amt * feeRate;
  const estimated = amt * priceImpact;

  return {
    pair: `${input}/${output}`,
    inputAmount: amt.toString(),
    estimatedOutput: estimated.toFixed(6),
    fee: fee.toFixed(6),
    executionRoute: ["INTERCOM_POOL", "TNK_ROUTER"],
    simulationOnly: true,
    generatedAt: new Date().toISOString(),
  };
}

export function simulateSwap(quote: any) {
  console.log("Simulating settlement...");
  console.log("Route:", quote.executionRoute.join(" -> "));
  console.log("Done.");
  return true;
}