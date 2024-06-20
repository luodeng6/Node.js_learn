// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  arr=[5, 2, 8, 3, 9, 1];
  console.log(bubbleSort(arr));

  // Output: [1, 2, 3, 5, 8, 9]
