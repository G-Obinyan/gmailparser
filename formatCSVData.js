export default function (restoDetails) {
  var thisResto = {
    restoName: "",
    desc: "",
    address: "",
    link: "",
    cuisine: "",
    service: "",
    image: "",
  };

  //console.log(restoDetails['Friday Open']);
  console.log(restoDetails);
  let text = restoDetails;

  let nextTxt = text.split("Address:");
  let final = nextTxt[0].split("'Name of Business':");
  let restoName = final[1].replace(/(\r\n|\n|\r)/gm, "");
  thisResto.restoName = restoName;
}
