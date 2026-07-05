---
id: A12
title: Find the number that appears once, and other numbers twice.
difficulty: Medium
topic: 01 Arrays
pattern: Easy
status: Solved
tags:
links:
  striver: https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/
  leetcode: https://leetcode.com/problems/single-number/
  gfg:
confidence: 1
solvedOn: 2026-07-02
lastRevision: 2026-07-02
nextRevision: 2026-07-03
---

# Find the number that appears once, and other numbers twice.

## 🔗 Links


- **Striver:** https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/



- **LeetCode:** https://leetcode.com/problems/single-number/




---

## 📝 Problem Summary



---

## 💡 Intuition



---

## 🐢 Brute Force



---

## 🚀 Optimal Approach
```
int singleNumber_optimal(vector<int>& nums) {//space complexity iska o(1) hai gng

int xnor=0;

for( int x: nums)

{

xnor= xnor^x;

}

return xnor;

}
```


---

## 💻 My Code

```cpp

```

---

## ❌ Mistakes



---

## ⭐ Revision