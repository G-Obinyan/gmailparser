import { createEntry, createAsset } from "./pushtoContentful.mjs";
import { getAddress } from "./getAddress.js";

export default function (restoDetails) {
  let fields = {
    name: {
      "en-US": "",
    },
    image: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: "",
        },
      },
    },
    description: {
      "en-US": "",
    },
    hasDelivery: {
      "en-US": false,
    },
    hasPickup: {
      "en-US": false,
    },
    link: {
      "en-US": "",
    },
    location: {
      "en-US": {
        lon: 0,
        lat: 0,
      },
    },
    tags: {
      "en-US": [],
    },
    deliveryHours: {
      "en-US": [
        {
          Monday: {
            open: "",
            closed: "",
          },
          Tuesday: {
            open: "",
            closed: "",
          },
          Wednesday: {
            open: "",
            closed: "",
          },
          Thursday: {
            open: "",
            closed: "",
          },
          Friday: {
            open: "",
            closed: "",
          },
          Saturday: {
            open: "",
            closed: "",
          },
          Sunday: {
            open: "",
            closed: "",
          },
        },
      ],
    },
  };

  fields.name["en-US"] = restoDetails.restoName;
  fields.description["en-US"] = restoDetails.desc;
  if (restoDetails.service == "Delivery & Pickup") {
    fields.hasDelivery["en-US"] = true;
    fields.hasPickup["en-US"] = true;
  } else if (restoDetails.service == "Delivery") {
    fields.hasDelivery["en-US"] = true;
    fields.hasPickup["en-US"] = false;
  } else {
    fields.hasDelivery["en-US"] = false;
    fields.hasPickup["en-US"] = true;
  }
  fields.link["en-US"] = restoDetails.link;
  fields.tags["en-US"].push(restoDetails.cuisine);
  // fields.location["en-US"] = restoDetails.address;
  // fields.image["en-US"] = restoDetails.image;

  let link = ''; //Pass in link from email here
  let restoAddress = restoDetails.address;

  getAddress(restoAddress).then((res) => {
    console.log(res);
    fields.location["en-US"].lat = res[0].latitude;
    fields.location["en-US"].lon = res[0].longitude;

    if (link) {
      createAsset(link)
        .then((res) => {
          fields.image["en-US"].sys.id = res.sys.id;
          res
            .processForLocale("en-US")
            .then((finalAsset) =>
              createEntry(fields)
                .then()
                .catch((err) => {
                  console.log("Create entry failure");
                })
            )
            .catch((err) => {
              console.log("Process.locale failed");
              createEntry(fields)
                .then()
                .catch((err) => {
                  console.log("Create entry failed again");
                });
            });
        })
        .catch((err) => {
          console.log(err);
          createEntry(fields);
        });
    } else {
      createEntry(fields);
    }
  }).catch((err) => {
    if (link) {
      createAsset(link)
        .then((res) => {
          fields.image["en-US"].sys.id = res.sys.id;
          res
            .processForLocale("en-US")
            .then((finalAsset) =>
              createEntry(fields)
                .then()
                .catch((err) => {
                  console.log("Create entry failure");
                })
            )
            .catch((err) => {
              console.log("Process.locale failed");
              createEntry(fields)
                .then()
                .catch((err) => {
                  console.log("Create entry failed again");
                });
            });
        })
        .catch((err) => {
          console.log(err);
          createEntry(fields);
        });
    } else {
      createEntry(fields);
    }
  }) ;
}

//make a function for the if statement - pass in link and fields
