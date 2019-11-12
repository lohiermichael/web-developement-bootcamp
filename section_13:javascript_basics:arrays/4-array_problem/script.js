// Exercise 1: printReverse

function printReverse(arr){
    for(var i = arr.length - 1; i >= 0; i--){
        console.log(arr[i])
    }
}

// Exercise 2: IsUniform

function isUniform(arr){
    for (var i = 1; i < arr.length; i++){
        if (arr[i] !== arr[0]){
            return false;
        }
    }
    return true;
}

// Exercise 3: sumArray

function sumArray(arr){
    var sum = 0;
    arr.forEach(function(val){
        sum += val;
    })
    return sum;
}

// Exercise 4: max

function max(arr){
    var m = arr[0];
    for(var i = 0; i < arr.length; i++){
        if (arr[i] > m){
            m = arr[i];
        }
    }
    return m;
}