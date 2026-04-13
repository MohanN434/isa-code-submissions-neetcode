class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        longest = strs[0]

        for s in strs:
            c_long = ""
            i = 0

            while i < len(s) and i < len(longest):
                if s[i] != longest[i]:
                    break
                c_long += s[i]
                i += 1
            
            longest = c_long
            if longest == "":
                return ""

        return longest