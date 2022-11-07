const parseOutputRegex = /^request id is (.*)-(\d*)\s\(/;

export default function (str) {
  const match = parseOutputRegex.exec(str);

  if (match === null) {
    throw new Error("unexpeted_output");
  }

  const [, destination, id] = match;
  return { destination, id };
}
