let carArray = [];
let selectedMake = "not selected";

// define a constructor to create player objects
var CarObject = function (pMake, pModel, pYear, pMile, pPrice) {
  this.Make = pMake;
  this.Model = pModel;
  this.Year = pYear;
  this.ID = carArray.length + 1;
  this.Mile = pMile;  // action  comedy  drama  horrow scifi  musical  western
  this.Price = pPrice;
}

carArray.push(new CarObject("Nissan", "Sentra", 2015, "800000", "15000"));
carArray.push(new CarObject("Ford", "Mustang", 2017, "350000", "25500"));
carArray.push(new CarObject("Acura", "RDX", 2010, "860000", "1000"));

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    carArray.push(new CarObject(selectedMake, document.getElementById("model").value, document.getElementById("year").value,
    document.getElementById("mile").value), document.getElementById("price").value);
});

  $(document).bind("change", "#select-make", function (event, ui) {
    selectedMake = $('#select-make').val();
  });

  document.getElementById("buttonSortMake").addEventListener("click", function () {
    carArray.sort(dynamicSort("Make"));
    createList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortYear").addEventListener("click", function () {
    carArray.sort(dynamicSort("Year"));
    createList();
    document.location.href = "index.html#ListAll";
  });

$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});
  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "";
    document.getElementById("price").value = "";
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("make").value = "";
  document.getElementById("model").value = "";
  document.getElementById("year").value = "";
  document.getElementById("price").value = "";
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneMake").innerHTML = "The make of the car is: " + carArray[localID-1].Make;
  document.getElementById("oneModel").innerHTML = "Model " + carArray[localID - 1].Model;
  document.getElementById("oneYear").innerHTML = "Year: " + carArray[localID - 1].Year;
  document.getElementById("oneMile").innerHTML = "Mileage: " + carArray[localID - 1].Mile;
  document.getElementById("onePrice").innerHTML = "Price " + carArray[localID - 1].Price;
 });

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divCarList");
  while (divCarList.firstChild) {    // remove any old data so don't get duplicates
  divCarList.removeChild(divCarList.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(carArray);
  carArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneCar' data-parm=" + element.ID + "  href='#page3'>Get Details </a> " + element.ID + ":  " + element.Make + "  " + element.Mile;
    ul.appendChild(li);
  });
  divCarList.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneCar");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}