import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import Table from "cli-table3";

import { generateQuote, simulateSwap } from "../lib/intercom";

const program = new Command();

program
  .name("intercom-cli")
  .description("Intercom Swap CLI Simulator")
  .version("1.0.0");

/**
 * QUOTE COMMAND
 */
program
  .command("quote")
  .description("Get swap quote")
  .requiredOption("-i, --input <token>", "Input token")
  .requiredOption("-o, --output <token>", "Output token")
  .requiredOption("-a, --amount <amount>", "Amount")
  .action(async (opts) => {
    const spinner = ora("Fetching quote...").start();

    await new Promise((r) => setTimeout(r, 600));

    const quote = generateQuote(opts.input, opts.output, opts.amount);

    spinner.stop();

    console.log(chalk.green("\n✔ Quote Generated\n"));

    const table = new Table({
      head: ["Field", "Value"],
      colWidths: [20, 60],
    });

    Object.entries(quote).forEach(([k, v]) => {
      table.push([k, JSON.stringify(v)]);
    });

    console.log(table.toString());
  });

/**
 * SWAP COMMAND
 */
program
  .command("swap")
  .description("Execute simulated swap")
  .requiredOption("-i, --input <token>", "Input token")
  .requiredOption("-o, --output <token>", "Output token")
  .requiredOption("-a, --amount <amount>", "Amount to swap")
  .action(async (opts) => {
    const spinner = ora("Executing simulated swap...").start();

    await new Promise((r) => setTimeout(r, 700));

    const quote = generateQuote(opts.input, opts.output, opts.amount);
    simulateSwap(quote);

    spinner.stop();

    console.log(chalk.green("\n✔ Swap Simulation Complete\n"));

    const table = new Table({
      head: ["Metric", "Value"],
      colWidths: [25, 50],
    });

    table.push(
      ["Pair", quote.pair],
      ["Input", `${quote.inputAmount} ${opts.input}`],
      ["Estimated Output", `${quote.estimatedOutput} ${opts.output}`],
      ["Fee", quote.fee],
      ["Route", quote.executionRoute.join(" → ")],
      ["Mode", "SIMULATION"],
      ["Timestamp", new Date().toISOString()]
    );

    console.log(table.toString());
  });

program.parse();