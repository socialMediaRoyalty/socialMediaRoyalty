var car = {}
car.wheels = 4
car.doors = 2
car.sound = 'vroom'
car.name = 'Lightning McQueen'
console.log(car)
window.localStorage.setItem('car', JSON.stringify(car))
console.log(JSON.parse(window.localStorage.getItem('car')))
