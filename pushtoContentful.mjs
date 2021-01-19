import contentful from "contentful-management";
import pkg from "../contentfulAccess.js";
const { accessToken, spaceID, spaceName } = pkg;

const client = contentful.createClient({
  accessToken: accessToken,
});

const space = await client.getSpace(spaceID);
const environment = await space.getEnvironment(spaceName);

const createAsset = async (link) => {
  return environment.createAsset({
    fields: {
      file: {
        "en-US": {
          contentType: "image/jpg",
          fileName: "image",
          upload: link,
        },
      },
    },
  });
};

const createEntry = async (myResto) => {
  let createResto = { fields: myResto };
  environment
    .createEntry("restaurant", createResto)
    .then((entry) => console.log(entry))
    .catch(console.error);
};

export { createAsset, createEntry };
