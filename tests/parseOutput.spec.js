import test from "ava";
import parseOutput from "../helpers/parseOutput.js";

test("should parse expected output correctly", (t) => {
  t.deepEqual(parseOutput('request id is printer-1 (1 file(s))'), { destination: "printer", id: "1" });
  t.deepEqual(parseOutput('request id is printer-12345 (1 file(s))'), { destination: "printer", id: "12345" });
  t.deepEqual(parseOutput('request id is printer-with-dashes-1 (1 file(s))'), { destination: "printer-with-dashes", id: "1" });
  t.deepEqual(parseOutput('request id is W3ird_ch4r$_all_0verThePl4ce-1 (1 file(s))'), { destination: "W3ird_ch4r$_all_0verThePl4ce", id: "1" });
});

test('should throw on unexpected output', t => {
  t.throws(() => parseOutput('somerandom string'));
  t.throws(() => parseOutput('printer-1 does not match CLI output'));
  t.throws(() => parseOutput('request id id printer-without-id (1 file(s))'));
  t.throws(() => parseOutput('request id id 123-printer_and_id-reversed (1 file(s))'));
});
