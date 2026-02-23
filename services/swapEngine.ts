import Decimal from "decimal.js";

export function generateQuote(input: string, output: string, amount: string) {
  const amt = new Decimal(amount);

  // deterministic mock price (biar reproducible untuk agent)
  const rate = new Decimal("1.0125");
  const feeRate = new Decimal("0.003");

  const outputAmount = amt.mul(rate);
  const fee = amt.mul(feeRate);

  return {
    pair: `${input}/${output}`,
    inputAmount: amt.toFixed(),
    estimatedOutput: outputAmount.toFixed(6),
    fee: fee.toFixed(6),
    executionRoute: ["INTERCOM_POOL", "TNK_ROUTER"],
    simulationOnly: true,
    generatedAt: new Date().toISOString(),
  };
}