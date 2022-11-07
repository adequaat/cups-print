export default function makeFunctionToExecuteForType({
  string,
  array,
  object,
}) {
  return function (instructions) {
    if (Array.isArray(instructions)) {
      return array(instructions);
    } else if ("string" === typeof instructions) {
      return string(instructions);
    } else if ("object" === typeof instructions) {
      return object(instructions);
    }
  };
}
