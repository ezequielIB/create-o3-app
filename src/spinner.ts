// Utility to show a spinner in the CLI using ora
import ora from "ora";

export function withSpinner<T>(text: string, fn: () => Promise<T>): Promise<T> {
  const spinner = ora(text).start();
  return fn()
    .then((result) => {
      spinner.succeed();
      return result;
    })
    .catch((err) => {
      spinner.fail();
      throw err;
    });
}
