export default function(restoDetails){
    let fields = 
        {
            "name": {
                "en-US": ""
                },
            "image": {
                "en-US": {
                    "sys": {
                        "type": "",
                        "linkType": "",
                        "id": ""
                    }
                }
            },
            "description": {
                "en-US": ""
            },
            "hasDelivery": {
                "en-US": false
            },
            "hasPickup": {
                "en-US": false
            },
            "link": {
                "en-US": ""
            },
            "location": {
                "en-US": {
                    "lon": 0,
                    "lat": 0,
                }
            },
            "tags": {
                "en-US": [
                    ""
                ]
            },
            "deliveryHours": {
                "en-US": [
                    {
                        "Friday": {
                          "open": "",
                          "closed": ""
                        },
                        "Monday": {
                          "open": "",
                          "closed": ""
                        },
                        "Sunday": {
                          "open": "",
                          "closed": ""
                        },
                        "Tuesday": {
                          "open": "",
                          "closed": ""
                        },
                        "Saturday": {
                          "open": "",
                          "closed": ""
                        },
                        "Thursday": {
                          "open": "",
                          "closed": ""
                        },
                        "Wednesday": {
                          "open": "1",
                          "closed": ""
                        }
                    }
                ]
            }
        }
    //var arrayLength = Object.keys(restoDetails).length;


    fields.name["en-US"] = restoDetails.restoName;
    fields.image["en-US"] = restoDetails.image;
    fields.description["en-US"] = restoDetails.desc;
    if (restoDetails.service == "Delivery & Pickup") {
        fields.hasDelivery["en-US"] = true;
        fields.hasPickup["en-US"] = true;
    }
    else if (restoDetails.service == "Delivery") {
        fields.hasDelivery["en-US"] = true;
        fields.hasPickup["en-US"] = false;
    }
    else {
        fields.hasDelivery["en-US"] = false;
        fields.hasPickup["en-US"] = true;
    };
    fields.link["en-US"] = restoDetails.link;
    fields.location["en-US"] = restoDetails.address;
    fields.tags["en-US"] = restoDetails.cuisine;

    console.log(fields);
}




