class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if (len(s) != len(t)):
            return False

        s_count = defaultdict(int)
        for ch in s:
            s_count[ch] += 1
        
        for ch in t:
            if ch in s_count:
                s_count[ch] -= 1
        
        return all(val == 0 for val in s_count.values())