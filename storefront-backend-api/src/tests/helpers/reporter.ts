// Node imports
import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from "jasmine-spec-reporter";
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayStacktrace: StacktraceOption.NONE,
      displayDuration: true,
    },
    customProcessors: [CustomProcessor],
  })
);
