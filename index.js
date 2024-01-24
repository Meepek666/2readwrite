const fs = require('fs');

const path = require('path')

function saveData(jsonFileName, folderName, overwrite) {
  const jsonData = path.join(__dirname + `\\${jsonFileName}`)
  console.log(jsonData)


  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  fs.readFile(jsonData, "utf-8", function (err, data) {
    if (err) {
      console.error(err)
    }

    else {

      let parseData = JSON.parse(data)
      parseData.forEach(user => {


        const { id, name, username, address, phone } = user;
        const { street, zipcode, city } = address;


        let nameWspaces = name.split(" ").join("_")

        const fileName = `${id}-${nameWspaces}-${username}.txt`;
        const filePath = path.join(__dirname, `${folderName}/${fileName}`);

        if (fs.existsSync(filePath) && !overwrite) {
          console.log(`Plik ${fileName} już istnieje. Dane nie zostały nadpisane.`);
        } else {
          const dataToSave = `Name: ${name}\nSurname: ${username}\nStreet: ${street}\nZip Code: ${zipcode}\nCity: ${city}\nPhone: ${phone}\n`;

          fs.writeFileSync(filePath, dataToSave, function () {
            console.log(`Dane zapisane do pliku: ${fileName}`);
          });

        }
      });

    }
  })

}
saveData("users.json", "usersData", false)

module.exports = saveData;



