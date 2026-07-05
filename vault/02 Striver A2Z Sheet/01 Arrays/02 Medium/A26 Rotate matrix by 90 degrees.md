---
id: A26
title: Rotate matrix by 90 degrees
difficulty: Medium
topic: 01 Arrays
pattern: Medium
status: Solved
tags:
links:
  striver: https://takeuforward.org/data-structure/rotate-image-by-90-degree/
  leetcode: https://leetcode.com/problems/rotate-image/
  gfg:
---

# Rotate matrix by 90 degrees

## 🔗 Links


- **Striver:** https://takeuforward.org/data-structure/rotate-image-by-90-degree/



- **LeetCode:** https://leetcode.com/problems/rotate-image/




---

## 📝 Problem Summary

	Matrix ko 90 degree rotate krna hai

---

## 💡 Intuition

	Brute: i ---->n-i-1
	Optimal: Pehle transpose krdo then reverse krdo

---

## 🐢 Brute Force

```
class Solution {

public:

void rotate(vector<vector<int>>& matrix) {

int n=matrix.size();

vector<vector<int>> temp(matrix);

for (int i=0; i<n; i++)

{

for(int j=0; j<n; j++)

{

matrix[j][n-i-1]=temp[i][j];

}

}

}

};
```

---

## 🚀 Optimal Approach
```
class Solution {

public:

void rotate(vector<vector<int>>& matrix) {

int n=matrix.size();

for(int i=0; i<n-1; i++)

{

for(int j=i+1; j<n; j++)

{

swap(matrix[i][j], matrix[j][i]);

}

}

for(int i=0; i<n; i++)

{

for(int j=0; j<n/2; j++)

{

swap (matrix[i][j], matrix[i][n-j-1]);

}

}

}

};
```


---

## 💻 My Code

```cpp

```

---

## ❌ Mistakes

	matrix[i][j] != temp [j][i]

---

## ⭐ Revision