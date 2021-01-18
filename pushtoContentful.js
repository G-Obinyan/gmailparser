import contentful from 'contentful-management'
import pkg from '../contentfulAccess.js';
const {accessToken, spaceID, spaceName} = pkg;

const client = contentful.createClient({
    accessToken: accessToken
  });

  const space = await client.getSpace(spaceID);
  const environment = await space.getEnvironment(spaceName);

  module.exports = {
    createAsset: (link) => { 
        environment.createAsset(
            {
                fields:{ 
                    file: {
                        "en-US": {
                            "upload": link,
                        }
                    },
                }
            }
        )
    },
    createEntry: (myResto) => {
        let createResto = {fields: myResto};
        environment.createEntry('restaurant', createResto).then((entry)=> console.log(entry)).catch(console.error);
    }

};

// module.exports.createAsset = (link) => {
//     environment.createAsset(
//         {
//             fields:{ 
//                 file: {
//                     "en-US": {
//                         "upload": link,
//                     }
//                 },
//             }
//         }
//     );
// }
  

    // module.exports.createEntry = (myResto) => {
    //     let createResto = {fields: myResto};
    //     environment.createEntry('restaurant', createResto).then((entry)=> console.log(entry)).catch(console.error);
    // }
