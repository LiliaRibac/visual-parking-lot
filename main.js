const SIMULATION_LIMIT = 100;

let parkingSpaces = []; // Array of cars occupying a parking space
let qWait = [];         // Array of cars waiting to park. Note currently it is a stack. TO-DO make it a queue

let parkingLot = [
    [0,"Top Row", "Portrait", "Free"],  // Slot 0 is in Top Row, Slot Type is in Portrait, and it's initially free
    [1,"Top Row", "Portrait", "Free"],
    [2,"Top Row", "Portrait", "Free"],
    [3,"Top Row", "Portrait", "Free"],
    [4,"Top Row", "Portrait", "Free"],
    [5,"Middle Row", "Portrait", "Free"],
    [6,"Middle Row", "Portrait", "Free"],
    [7,"Middle Row", "Portrait", "Free"],
    [8,"Middle Row", "Portrait", "Free"],
    [9,"Middle Row", "Portrait", "Free"],
    [10,"Bottom Row", "Portrait", "Free"],
    [11,"Bottom Row", "Portrait", "Free"],
    [12,"Bottom Row", "Portrait", "Free"],
    [13,"Bottom Row", "Portrait", "Free"],
    [14,"Bottom Row", "Portrait", "Free"],
    [15,"Left Row", "Landscape", "Free"],
    [16,"Left Row", "Landscape", "Free"],
    [17,"Left Row", "Landscape", "Free"],
    [18,"Left Row", "Landscape", "Free"],
    [19,"Left Row", "Landscape", "Free"],
    [20,"Left Row", "Landscape", "Free"],
    [21,"Left Row", "Landscape", "Free"],
    [22,"Left Row", "Landscape", "Free"],
    [23,"Left Row", "Landscape", "Free"],
    [24,"Right Row", "Landscape", "Free"],
    [25,"Right Row", "Landscape", "Free"],
    [26,"Right Row", "Landscape", "Free"],
    [27,"Right Row", "Landscape", "Free"],
    [28,"Right Row", "Landscape", "Free"],
    [29,"Right Row", "Landscape", "Free"],
    [30,"Right Row", "Landscape", "Free"],
    [31,"Right Row", "Landscape", "Free"],
    [32,"Right Row", "Landscape", "Free"],
];

let numSpaces = parkingLot.length;

let currentCarID = 0;   // set initial value of car ID, will be incremented each time a new car is generated
let carCollection = [
    ["green", "car-green.png"],
    ["grey", "car-grey.png"],
    ["hot-pink", "car-hot-pink.png"],
    ["lime-green", "car-lime-green.png"],
    ["orange", "car-orange.png"],
    ["pink", "car-pink.png"],
    ["purple", "car-purple.png"],
    ["red-stripes", "car-red-stripes.png"],
    ["red", "car-red.png"],
    ["white", "car-white.png"],
    ["yellow", "car-yellow.png"],
];


class Car {
    constructor(ID, color, imageURL, timeparked, isparked, slot) {
        this.ID = ID;                   // Car ID, it is incremented everytime a new car is generated
        this.color = color;     
        this.imageURL = imageURL;
        this.timeparked = timeparked;   // time limit of how long car will occupy a parking spot
        this.isparked = isparked;
        this.slot = slot;
    }

    park () {
        let i=findEmptySlot();
        parkingLot[i][3]="Occupied";
        this.slot = i;              // put the slot value in the car object
        parkingSpaces.push(this);   // push car into parkingSpaces array to indicate it is occupying a space
        console.log ("Parked Car ", this.ID, this.color, "at Slot # ", parkingLot[this.slot][0], "in ",  parkingLot[this.slot][1]);
        setTimeout(function (e) {   // set timer of how long car will occupy the spot 
            e.leave();
        }, this.time, this);
    }

    leave () {
        let i=this.slot;            // recover the slot value previously stored in the car object
        parkingLot[i][3]="Free";    // mark the spot free
        parkingSpaces.pop(this);    // remove car from parkingSpaces array
        console.log ("Car Left ", this.ID, this.color, "from Slot # ", parkingLot[this.slot][0], "in ",  parkingLot[this.slot][1]);
        this.slot = -1;             // reset parkingLot slot to -1, a value outside the parkingLot array
        Attendant();
    }

}

function start (){  
    // This is the place to begin the simulation

    for (i=0;i<SIMULATION_LIMIT;i++) {
        generateCar();
        Attendant();
    }

};


function generateCar (){
    let car=new Car();
    let index=Math.floor(Math.random() * carCollection.length);
    car.ID = currentCarID;
    car.color=carCollection[index][0];
    car.imageURL=carCollection[index][1];
    car.timeparked=(Math.random() * 29 + 1)*1000;   //time parked is slot is anywhere between 1 to 30 secs, converted to milliseconds. To be realistic we need to make it between 10 t0 120 minutes?
    car.isparked=false;
    car.slot = -1;                                  // initalize parkingLot slot to -1, a value outside the parkingLot array. It will be assigned to the real index when an empty slot is found
    qWait.push(car);
    currentCarID++;
};

function spaceOpen() {
    return (numSpaces - parkingSpaces.length);
}

function Attendant() {
    for (let i = 0; i < numSpaces; i++) {
        if (spaceOpen() !== 0 && qWait.length !== 0) {
            let car = qWait.pop();
            car.park(car);
        } else {
            // console.log('Parking lot full!')
        }
    }

}

function findEmptySlot(){                           // there is probably an array method to return the first availble empty slot?
    for (i=0;i<parkingLot.length;i++){
        if(parkingLot[i][3]==="Free") {
            return i;                               // return the first available empty slot
        }
    }
    return -1;                                      // return -1 to show parking lot is full
}

function driveCar (){
    //TO-DO This function drives the car; moves it in a direction at every clock tick
};

function moveUp (){
    
};

function moveDown (){
    
};

function moveLeft (){
    
};

function moveRight (){
    
};

function stopCar (){

};

function collisionDetect () {
    // TO-DO this function detects if a collision is about to occur when a car moves
};

function collisionWinner(){
    // TO-DO this function 'decides' who is the winning car that will move first to avoid a collision
};

window.addEventListener("load", start, false);