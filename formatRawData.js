import initialRestToJson from "./buildJSON.js";

export default function (restoDetails, origin) {
  switch (origin) {
    case "getMail":
      var thisResto = {
        restoName: "",
        desc: "",
        address: "",
        link: "",
        cuisine: "",
        service: "",
        image: "",
      };
      let nextTxt = restoDetails.split("Description - 250 character limit:");
      let final = nextTxt[0].split("Restaurant Name:");
      let restoName = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.restoName = restoName;

      nextTxt = restoDetails.split("Address:");
      final = nextTxt[0].split("Description - 250 character limit:");
      let desc = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.desc = desc;

      nextTxt = restoDetails.split("Hours:");
      final = nextTxt[0].split("Address:");
      let add = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.address = add;

      nextTxt = restoDetails.split("Cuisine:");
      final = nextTxt[0].split(
        "Link to website - (Please use https if possible):"
      );
      let link = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.link = link;

      nextTxt = restoDetails.split("Service Offered:");
      final = nextTxt[0].split("Cuisine:");
      let cuisine = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.cuisine = cuisine;

      nextTxt = restoDetails.split("Please select an image:");
      final = nextTxt[0].split("Service Offered:");
      let service = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.service = service;

      nextTxt = restoDetails.split(
        "I confirm this restaurant offers its own delivery service (ie. no UberEats, DoorDash, Skip the dishes etc.):"
      );
      final = nextTxt[0].split("Please select an image:");
      let image = final[1].replace(/(\r\n|\n|\r)/gm, "");
      thisResto.image = image;
      initialRestToJson(thisResto);
      break;

    case "parseCSV":
      var thisResto = {
        restoName: "",
        desc: "",
        address: "",
        link: "",
        cuisine: "",
        service: "",
        image: "",
        address: "",
      };

      thisResto.restoName = restoDetails["Name of Business"];
      thisResto.cuisine = restoDetails.Cuisine;
      thisResto.address = restoDetails.Address;
      thisResto.image =
        restoDetails["Please upload an image representing your website"];
      thisResto.link =
        restoDetails["Link to website - (Please use https if possible)"];

      if (restoDetails["Same hours everyday"] == "No") {
        thisResto.deliveryHours = {};
        if (restoDetails["Monday Open"]) {
          thisResto.deliveryHours.Monday = {};
          thisResto.deliveryHours.Monday.open = restoDetails["Monday Open"];
          thisResto.deliveryHours.Monday.closed = restoDetails["Monday Closed"];
        }
        if (restoDetails["Tuesday Open"]) {
          thisResto.deliveryHours.Tuesday = {};
          thisResto.deliveryHours.Tuesday.open = restoDetails["Tuesday Open"];
          thisResto.deliveryHours.Tuesday.closed =
            restoDetails["Tuesday Closed"];
        }
        if (restoDetails["Wednesday Open"]) {
          thisResto.deliveryHours.Wednesday = {};
          thisResto.deliveryHours.Wednesday.open =
            restoDetails["Wednesday Open"];
          thisResto.deliveryHours.Wednesday.closed =
            restoDetails["Wednesday Closed"];
        }
        if (restoDetails["Thursday Open"]) {
          thisResto.deliveryHours.Thursday = {};
          thisResto.deliveryHours.Thursday.open = restoDetails["Thursday Open"];
          thisResto.deliveryHours.Thursday.closed =
            restoDetails["Thursday Closed"];
        }
        if (restoDetails["Friday Open"]) {
          thisResto.deliveryHours.Friday = {};
          thisResto.deliveryHours.Friday.open = restoDetails["Friday Open"];
          thisResto.deliveryHours.Friday.closed = restoDetails["Friday Closed"];
        }
        if (restoDetails["Saturday Open"]) {
          thisResto.deliveryHours.Saturday = {};
          thisResto.deliveryHours.Saturday.open = restoDetails["Saturday Open"];
          thisResto.deliveryHours.Saturday.closed =
            restoDetails["Saturday Closed"];
        }
        if (restoDetails["Sunday Open"]) {
          thisResto.deliveryHours.Sunday = {};
          thisResto.deliveryHours.Sunday.open = restoDetails["Sunday Open"];
          thisResto.deliveryHours.Sunday.closed = restoDetails["Sunday Closed"];
        }
      } else {
        thisResto.deliveryHours = {};
        thisResto.deliveryHours.Everyday = {};
        thisResto.deliveryHours.Everyday.open = restoDetails["Open Time"];
        thisResto.deliveryHours.Everyday.closed = restoDetails["Closed Time"];
      }
      thisResto.service = "Delivery & Pickup";
      initialRestToJson(thisResto);
      break;
  }
}
