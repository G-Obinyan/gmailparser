import contentful from 'contentful-management'
import pkg from '../contentfulAccess.js';
const {accessToken, spaceID, spaceName} = pkg;

const client = contentful.createClient({
    accessToken: accessToken
  });

  try {
    export default function(myResto) {
        const space = await client.getSpace(spaceID);
        const environment = await space.getEnvironment(spaceName);
        const newEntry = await environment.createEntry('restaurant', {myResto});
        console.log(entry);
    }
} catch (error) {
    console.log(error);
  }