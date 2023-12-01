const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require('fs');


require("dotenv").config();
const { json } = require('stream/consumers');
const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env.KEYVAULT_URI, credential);
const secretName = 'config';






async function getSecretValue() {
    try {
      const secret = await client.getSecret(secretName);
      return secret.value;
    } catch (err) {
      console.error("Error fetching secret:", err.message);
      throw err;
    }
  }
  
  // Function to save JSON value to a file without stringify
  function saveToJsonFile(jsonValue) {
    try {
      fs.writeFileSync("output.json", jsonValue, { encoding: "utf-8" });
      console.log("JSON value saved to output.json");
    } catch (err) {
      console.error("Error writing to file:", err.message);
      throw err;
    }
  }
  
  // Fetch secret value and save to file
  getSecretValue()
    .then((secretValue) => {
      saveToJsonFile(secretValue);
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });