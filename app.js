const fs = require("fs");
data = fs.readFileSync("CSV_file.csv");
var array = data.toString().split("\r");
let r = [];
let k = array[0].split(", ");
//console.log('I am at the header' + k)
for (let i = 1; i < array.length - 1; i++) {
  let Object = {};
  let str = array[i];
  let s = "";
  let flag = 0;
  for (let ch of str) {
    if (ch === '"' && flag === 0) {
      flag = 1;
    } else if (ch === '"' && flag == 1) flag = 0;
    if (ch === ", " && flag === 0) ch = "|";
    if (ch !== '"') s += ch;
  }
  let lexy = s.split("|");
//console.log('I am raw array data'+lexy)
  for (let T in k) {
    if (lexy[T].includes(", ")) {
      Object[k[T]] = lexy[T].split(", ").map((item) => item.trim());
    } else Object[k[T]] = lexy[T];
  } 
  r.push(Object);
}
let json = JSON.stringify(r);
fs.writeFileSync("CDI_MC_Daily_.json", json);
