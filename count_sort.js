function count_sort(origin, k) {
  // k (total numbers)
  // origin: original arr
  // final final arr
  // temp arr (store k arr)
  // origin [2,3,1,5,4,2,5,1,3,4,1]
  // k [1,2,3,4,5]
  let final = [];
  let temp_arr = [];
  for (let i = 0; i < k; i++) {
    temp_arr[i] = 0;
  }
  // temp_arr [0,0,0,0,0]
  let len = origin.length;
  for (let i = 0; i < len; i++) {
    temp_arr[origin[i] - 1]++;
  }
  // temp_arr [3,2,2,2,2]
  for (let i = 1; i < k; i++) {
    temp_arr[i] += temp_arr[i - 1];
  }
  // temp_arr [3,5,7,9,11]
  for (let j = len - 1; j >= 0; j--) {
    final[temp_arr[origin[j] - 1] - 1] = origin[j];
    temp_arr[origin[j] - 1]--;
  }
  return final;
}
