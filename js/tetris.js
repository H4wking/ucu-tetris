var playground = createPlayground();

console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  // 2. re-define objects - done
  console.log(objects)
  let canMove = true
  
  let len = currentObject.position.length
  for (let i = 0; i < len; i++) {
    let curCell = currentObject.position[i]
    let isIncluded = false

    for (let j = 0; j < len; j++) {
      if (currentObject.position[j][0] == curCell[0] - 1 && currentObject.position[j][1] == curCell[1]) {
        isIncluded = true
      }
    }

    if (!isIncluded && (curCell[0] == 0 || playground[curCell[0] - 1][curCell[1]] != undefined)) {
      canMove = false
    }
  }

  if (canMove) {
    currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))
  } else {
    currentObject.state = 'static'

    objects = checkFullRows(objects)

    createObj()
  }

  console.log(objects)
  
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  renderPositions()
  // 5. re-renderPlayground
  renderPlayground()
}

function moveRight(obj) {
  console.log('moving right')
  let currentObject = getCurrentObject();

  if (currentObject.position.filter(position => position[1] == 4).length != 0) {
  } else {
    currentObject.position.forEach(position => (position[1] += 1))
  }

  console.log(currentObject);
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();

  if (currentObject.position.filter(position => position[1] == 0).length != 0) {
  } else {
  currentObject.position.forEach(position => (position[1] -= 1))
  }
  console.log(currentObject);
}

function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
}

function createObj() {
  let rand = Math.floor(Math.random() * 3)
  objects.push({'type': TYPES[rand], 
                'state': 'falling',
                'position': INITIAL_POSITIONS[TYPES[rand]]})
}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()

// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 1000);