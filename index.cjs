const fs = require("fs");
const { parse } = require("csv-parse");

fs.writeFileSync('sqlCommand.txt', "");

fs.createReadStream("/home/howthorne/repo/spreadsheet-to-sql/sample.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (column) {
    let dataPeserta = [];
    dataPeserta.push(column[2], column[3], column[4]);
    let str = "INSERT INTO " + dataPeserta[0] + " " + dataPeserta[1] + " " + dataPeserta[2] + " \n";
    //console.log(str);
    fs.appendFile('sqlCommand.txt', str, function (err) {
      if (err) throw err;
    });
  })