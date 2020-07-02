// Function myForEach

function myForEach(arr, func) {
  for (var i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}

// As a method of the Array object
Array.prototype.myForEach = function myForEach(func) {
  for (var i = 0; i < this.length; i++) {
    func(this[i]);
  }
};
