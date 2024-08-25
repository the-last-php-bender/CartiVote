const voteMap = new Map([
    ['candidate1', { name: 'Alice', votes: 50 }],
    ['candidate2', { name: 'Bob', votes: 30 }],
    ['candidate3', { name: 'Charlie', votes: 20 }]
]);

// Convert the Map values to an array
const candidatesJson = Array.from(voteMap.values());

// Convert the array to a JSON string (formatted for readability)
const candidatesJsonString = JSON.stringify(candidatesJson, null, 2);

candidatesJsonString;