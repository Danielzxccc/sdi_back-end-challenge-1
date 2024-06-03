// function for getting the nearest index of capacity of the given input
function findNearestNumber(arr, target) {
  if (!arr.length) return null
  arr.sort((a, b) => a - b)
  const insertionIndex = arr.findIndex((num) => num >= target)

  if (insertionIndex === 0) {
    return 0
  } else if (insertionIndex === -1) {
    return null
  } else {
    return insertionIndex
  }
}

function getOptimizedCost(seatCount, carOptions) {
  //initialize starting point to compare
  let minCost = Infinity
  let result = ''

  // loop through car options
  for (const car of carOptions) {
    const { capacity, cost } = car

    // check if seat count is divisible by the capacity of all car options
    const remainder = seatCount % capacity
    if (remainder === 0) {
      const quantity = seatCount / capacity
      const totalCost = quantity * cost
      if (totalCost < minCost) {
        minCost = totalCost
        result = `${car.size} x ${quantity}\nTotal = PHP ${totalCost}`
      }
    }
  }

  //if result is empty, return the nearest available capacity for the given input
  if (!result) {
    const getIndex = findNearestNumber(
      carOptions.map((item) => item.capacity),
      seatCount
    )

    if (carOptions[getIndex]?.cost) {
      const totalCost = carOptions[getIndex].cost

      result = `${carOptions[getIndex].size} x ${1}\nTotal = PHP ${totalCost}`
    }
  }

  return result
}

const carOptions = [
  { size: 'S', capacity: 5, cost: 5000 },
  { size: 'M', capacity: 10, cost: 8000 },
  { size: 'L', capacity: 15, cost: 12000 },
]

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

// get user's input and pass it to function's parameter
readline.question('Please input number (seat): ', (seatCount) => {
  const result = getOptimizedCost(parseInt(seatCount), carOptions)
  if (result) {
    console.log(result)
  } else {
    console.log(
      'The exact number of seats cannot be accommodated in any car size.'
    )
  }
  readline.close()
})
