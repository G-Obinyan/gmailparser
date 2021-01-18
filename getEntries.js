import contentful from 'contentful-management'
import pkg from '../contentfulAccess.js';
const {accessToken, spaceID, spaceName} = pkg;


const client = await contentful.createClient({
    accessToken: accessToken
  });
  
  try {
    const space = await client.getSpace(spaceID);
    const environment = await space.getEnvironment(spaceName);
    const entries = await environment.getEntries();
    console.log(JSON.stringify(entries));
  } catch (error) {
    console.log(error);
  }
  

  //.then((space) => space.getEnvironment(spaceName))
  //.then((environment) => environment.getEntries())
  //.then((response) => console.log(response.items))
  //.catch(console.error)