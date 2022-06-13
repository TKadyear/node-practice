const fs = require("fs");
const pathFile = process.argv[process.argv.length - 1];
const getPopulationDensity = (population, area) => Number((population / area).toFixed(2));

fs.readFile(pathFile, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const listData = data.split("\n");
  listData.pop();
  const header = listData.shift() + " Density";
  const formatedData = listData.map(line => {
    const { index } = line.match(/\d/);
    const country = line.substring(0, index - 1);
    const listPopulationArea = line.substring(index).replaceAll(",", "").split(" ");
    const population = parseFloat(listPopulationArea[0]);
    const area = parseFloat(listPopulationArea[listPopulationArea.length - 1]);
    return {
      country: country,
      population: population,
      area: area,
      density: getPopulationDensity(population, area)
    };
  });
  const sortedDatabyDensity = formatedData.sort((a, b) => b.density - a.density);
  const delimiter = ";";
  const intro = "\n";
  let csvString = header.replaceAll(" ", delimiter) + intro;
  sortedDatabyDensity.forEach(country => {
    csvString += country.country + delimiter + country.population + delimiter + country.area + delimiter + country.density + intro;
  });
  fs.writeFile("paises.csv", csvString, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
