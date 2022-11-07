import test from "ava";
import makeFunctionToExecuteForType from "../helpers/makeFunctionToExecuteForType.js";

test("should create the correct function", (t) => {
  const fn = makeFunctionToExecuteForType({
    string: () => "string",
    array: () => "array",
    object: () => "object"
  });

  t.is(fn("some string"), "string");
  t.is(fn([]), "array");
  t.is(fn({}), "object");
});
