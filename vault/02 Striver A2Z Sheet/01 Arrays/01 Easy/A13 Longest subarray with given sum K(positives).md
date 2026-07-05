---
id: A13
title: Longest subarray with given sum K(positives)
difficulty: Medium
topic: 01 Arrays
pattern: Easy
status: Solved
tags:
links:
  striver: https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k/
  leetcode:
  gfg:
confidence: 1
solvedOn: 2026-07-02
lastRevision: 2026-07-02
nextRevision: 2026-07-03
---

# Longest subarray with given sum K(positives)

## 🔗 Links


- **Striver:** https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k/






---

## 📝 Problem Summary



---

## 💡 Intuition



---

## 🐢 Brute Force



---

## 🚀 Optimal Approach

```
int longestSubarry_optimal_but_only_for_positives (vector<int> &arr, int k)//worst time complexoty is o(2n)

{

int left=0, right=0;

long long sum= arr[0];

int maxlen=0;

int n= arr.size();

while (right<n)

{ while(left<=right&&sum>k)

{

sum-=arr[left];

left++;

}

if(sum==k)

{

maxlen=max(maxlen, right - left + 1);

}

right++;

if (right< n) sum+=arr[right];

}

return maxlen;

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