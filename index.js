const users = require('users.json');
const fs = require('fs/promises');
const path = require('path');

async function saveData(jsonPath, folderName, overwrite = false) {
  try {
    
    const jsonData = require(jsonPath);

    
    const folderPath = path.join(__dirname, folderName);
    await fs.mkdir(folderPath, { recursive: true });

    
    for (const user of jsonData) {
      const { id, name, surname, address, phone } = user;

      const fileName = `${id}-${name}-${surname}.txt`;
      const filePath = path.join(folderPath, fileName);

      const dataToWrite = `Name: ${name}\nSurname: ${surname}\nStreet: ${address.street}\nZip Code: ${address.zipCode}\nCity: ${address.city}\nPhone: ${phone}\n`;

      
      if (!overwrite && fs.existsSync(filePath)) {
        console.log(`Plik ${fileName} już istnieje. Ustaw parametr 'overwrite' na true i nadpisz go.`);
      } else {
        
        await fs.writeFile(filePath, dataToWrite);
        console.log(`Plik ${fileName} został zapisany pomyślnie.`);
      }
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error.message);
  }
}


saveData('users.json', 'output-folder', true);

