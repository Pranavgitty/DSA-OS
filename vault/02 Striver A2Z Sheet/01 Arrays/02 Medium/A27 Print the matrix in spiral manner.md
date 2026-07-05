---
id: A27
title: Print the matrix in spiral manner
difficulty: Medium
topic: 01 Arrays
pattern: Medium
status: Solved
tags:
links:
  striver: https://takeuforward.org/data-structure/spiral-traversal-of-matrix/
  leetcode: https://leetcode.com/problems/spiral-matrix/
  gfg:
---

# Print the matrix in spiral manner

## 🔗 Links


- **Striver:** https://takeuforward.org/data-structure/spiral-traversal-of-matrix/



- **LeetCode:** https://leetcode.com/problems/spiral-matrix/




---

## 📝 Problem Summary

given a matrix we gotta print it in another vector in a spiral manner starting from matrix[0][0]

---

## 💡 Intuition

	left right top bottom pointers

---

## 🐢 Brute Force



---

## 🚀 Optimal Approach

```
class Solution {

public:

vector<int> spiralOrder(vector<vector<int>>& matrix) {

int m=matrix.size();

int n=matrix[0].size();

vector<int> ans;

int left=0;

int right = n-1;

int top=0;

int bottom = m-1;

while(left<=right && top<=bottom)

{

for(int i=left; i<=right; i++)

{

ans.push_back(matrix[top][i]);

}

top++;

for(int i=top; i<=bottom; i++)

{

ans.push_back(matrix[i][right]);

}

right--;

if(top<=bottom)

{

for(int i=right; i>=left; i--)

{

ans.push_back(matrix[bottom][i]);

}

bottom--x;

}

if(left<=right)

{

for(int i=bottom; i>=top; i--)

{

ans.push_back(matrix[i][left]);

}

left++;

}

}

return ans;

}

};
```

---

## 💻 My Code

```cpp

```

---

## ❌ Mistakes

	check:
	if(top<=bottom)
	if(left<=right)

---

## ⭐ Revision