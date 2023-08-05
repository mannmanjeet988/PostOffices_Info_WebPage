//console.log("hello");

const topContainer = document.getElementById("top-container");
const bottomContainer = document.getElementById("bottom-container");

//Fetching IP address
var IPAdd;
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched IP Address: " + data.ip);
    IPAdd = data.ip;
    document.getElementById("ip").innerText = IPAdd;
    document.getElementById("ip1").innerHTML = `Your current IP address is: <span style="color:white">${IPAdd}</span> `;
  })
  .catch((error) => {
    ip.innerText = "OOPS! Error in data featching!Try again";
    console.log("Error", error);
  });


document.getElementById("btn").addEventListener("click", () => {
  console.log("Data has been fetched sucessfully");
  fetch(`https://ipinfo.io/${IPAdd}/json?token=4bcd6fc6912335`)
    .then((response) => response.json())
    .then((data) => {
      let dataJson = data;
      console.log("Json Data:", dataJson);
      let location = dataJson.loc;

      let lat = location.substring(0, location.indexOf(","));
      let long = location.substring(location.indexOf(",") + 1);

      topContainer.style.display = "none";
      bottomContainer.style.display = "block";

      document.getElementById("lat").innerHTML = `<b>Lat : </b>${lat}`;
      document.getElementById("long").innerHTML = `<b>Long : </b>${long}`;
      document.getElementById(
        "city"
      ).innerHTML = `<b>City : </b>${dataJson.city}`;
      document.getElementById(
        "region"
      ).innerHTML = `<b>Region : </b>${dataJson.region}`;

      document.getElementById("map").setAttribute(
        "src",
        `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp&output=embed`
      );
      let date = new Date().toLocaleString("Eng-US", {
        timeZone : `${dataJson.timezone}`,
      });
      document.getElementById(
        "time"
      ).innerHTML = `<b>Time Zone : </b>${dataJson.timezone}`;
      document.getElementById(
        "date"
      ).innerHTML = `<b>Date And Time : </b>${date}`;
      let pinCode = dataJson.postal;
      document.getElementById(
        "pincode"
      ).innerHTML = `<b>Pincode : </b>${dataJson.postal}`;
      postOfficeInfo(pinCode);
    })
    .catch((error) => console.log("Error", error));

  document.querySelector(".manjeet").style.display = "flex";
  document.getElementById("searches").style.display = "block";
  document.querySelector(".pinCodeData").style.display = "block";
  document.getElementById("mapDiv").style.display = "block";
});

// Fetching Post office information based on user pincode
let arr = [];
function postOfficeInfo(pinCode) {
    console.log(pinCode)
    fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('message').innerHTML = `<b>Message: </b>${data[0].Message}`;
            console.log(data[0].PostOffice);
            arr = data[0].PostOffice;
            document.getElementById('search').style.display = 'block';
            renderPostOfficeInfoOnUI(arr);
        })
        .catch((error) => {
            console.log("Error", error);
        })
}


let postData = document.getElementById('postData')
function renderPostOfficeInfoOnUI(item) {
    postData.innerHTML = '';
    let res = '';
   item.forEach((a) => {
        res += `
        <div class="posts">
         <div><b>Name : </b>  ${a.Name}</div>
         <div><b>Branch Type : </b> ${a.BranchType}</div>
         <div><b>Delivery Status : </b> ${a.DeliveryStatus}</div>
         <div><b>District : </b> ${a.District}</div>
         <div><b>Division : </b> ${a.Division}</div>
        </div>
        `
    })
    postData.innerHTML = res;
}

// searching a particular post office
let searchBox = document.getElementById('search')
searchBox.addEventListener('keyup', () => {
    let filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].Name.toLowerCase().includes(searchBox.value.trim().toLowerCase())) {
            filteredArr.push(arr[i]);
        }
        if (arr[i].BranchType.toLowerCase().includes(searchBox.value.trim().toLowerCase())) {
            filteredArr.push(arr[i]);
        }
    }
    renderPostOfficeInfoOnUI( filteredArr);
});

// let searchBox = document.getElementById('search')
// searchBox.addEventListener('keyup', () => {

//     let filteredArr  = arr.filter((item)=>
//     {
//         return (item.Name.toLoWerCase().includes(searchBox.value.trim().toLowerCase()) ||
//         item.BranchType.toLoWerCase().includes(searchBox.value.trim().toLowerCase()))
//     })
//     renderPostOfficeInfoOnUI(filteredArr);
// });

