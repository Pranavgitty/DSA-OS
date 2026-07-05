---
id: A25
title: Set Matrix Zeroes
difficulty: Medium
topic: 01 Arrays
pattern: Medium
status: Solved
tags:
links:
  striver: https://takeuforward.org/data-structure/set-matrix-zero/
  leetcode: https://leetcode.com/problems/set-matrix-zeroes/
  gfg:
---

# Set Matrix Zeroes

## 🔗 Links


- **Striver:** https://takeuforward.org/data-structure/set-matrix-zero/



- **LeetCode:** https://leetcode.com/problems/set-matrix-zeroes/




---

## 📝 Problem Summary



---

## 💡 Intuition



---

## 🐢 Brute Force

ek ek karke dekhna padega

---

## 🚀 Optimal Approach

```
class Solution {

public:

void setZeroes(vector<vector<int>>& matrix) {

int n= matrix.size();

int m= matrix[0].size();

// vector<int> row(n, 0); --> matrix[..][0]

// vector<int> column(m, 0); --> matrix[0][..]

int col0=1;

for(int i=0; i<n; i++)

{

for(int j=0; j<m; j++)

{

if (matrix[i][j]==0)

{

matrix[i][0]=0;

if(j!=0) matrix[0][j]=0;

else col0=0;

}

}

}

  

for(int i=1; i<n; i++)

{

for(int j=1; j<m; j++)

{

if(matrix[i][0] == 0 || matrix[0][j]== 0)

{

matrix[i][j]=0;

}

}

}

  

if(matrix[0][0]== 0) for(int j=0; j<m; j++) matrix[0][j]=0;

if(col0== 0) for(int i=0; i<n; i++) matrix[i][0]=0;

  

}

};
```

---

## 💻 My Code

```

```

---

## ❌ Mistakes



---

## ⭐ Revision