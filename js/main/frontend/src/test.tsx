const message = 'Hello world' // Try edit me

// Update header text
document.querySelector('#header').innerHTML = message

function fillWaterBasket() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Basket filled')
      resolve();
    }, 5000);
  });
}

function brushTeeth() {
  setTimeout(() => {
    console.log('brush teeth')
  }, 2000)
}

function takeShower() {
  setTimeout(() => {
    console.log('take a shower')
  }, 5000)
}

function wipeBathroomFloor() {
  setTimeout(() => {
    console.log('wipe bathroom')
  }, 1000)
}

function doBeforeWipeFloor() {
  return new Promise((resolve) => {
    brushTeeth();
    fillWaterBasket().then(() => takeShower());
    resolve();
  })
}


function morningRoutine() {
  // brushTeeth();
  // fillWaterBasket().then(() => takeShower());
  doBeforeWipeFloor().then(() => wipeBathroomFloor());
}

// Log to console
console.log(message)
morningRoutine();