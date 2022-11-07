# cups-print
Util to print a file on a CUPS printer and get the job id and desitnation returned.

# install
`$ npm i cups-print`

# options
By passing the `print` function an object you can use these options:
- file, the file you would like to print
- destination: (optional) on what printer you would like to print
- name: (optional) what name would you like to use in logs inastead of the filename
- cwd: (optional) the directory the files are relative to

# usage
Pass in a string, an object or an array of strings/objects.  
The print function will return a `promise` which is fulfilled with an object with an `id` property and a `destination` property.  
The `id` is the id of the print job in the queue, which is also referenced in the CUPS logs.  
The `destination` is the printer that print job was queued for.  
```
import print from "cups-print";


// just print a file on the default printer
console.log(
  await print("./some-sub-folder/label.pdf")
);
// logs { id: 'someInteger', destination: 'thePrintersName' }


// or print on a specific destination
print({
  destination: 'printerName',
  file: "./some-sub-folder/label.pdf",
});


// do not display the filename in the logs but a self chosen job name
print({
  file: "./some-sub-folder/label.pdf",
  name: "name-of-my-own-choice"
});


// sometimes it may be handy to work from a specific folder
print({
  file: "label.pdf",
  cwd: './some-sub-folder/'
});


// print multiple files
print(['./label1.pdf', './label2.pdf']);

```
