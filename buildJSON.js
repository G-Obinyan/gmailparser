import { createEntry, createAsset } from "./pushtoContentful.mjs";

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
          Friday: {
            open: "",
            closed: "",
          },
          Sunday: {
            open: "",
            closed: "",
          },
          Tuesday: {
            open: "",
            closed: "",
          },
          Saturday: {
            open: "",
            closed: "",
          },
          Thursday: {
            open: "",
            closed: "",
          },
          Wednesday: {
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
  // //fields.location["en-US"] = restoDetails.address;
  fields.tags["en-US"].push(restoDetails.cuisine);

  // fields.image["en-US"] = restoDetails.image;
  let link =
    "https://images2.minutemediacdn.com/image/upload/c_crop,h_2172,w_3864,x_0,y_202/v1558021472/shape/mentalfloss/80312-istock-957009874.jpg?itok=GcNVLt6Q";
  createAsset(link).then((res) => {
    fields.image["en-US"].sys.id = res.sys.id;
    res.processForLocale("en-US").then((finalAsset) => createEntry(fields));
  });
}
