// Function to check if a string is a palindrome
function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    
    // Reverse the string
    const reversedStr = cleanedStr.split("").reverse().join("");
    
    // Check if the reversed string is equal to the original string
    return cleanedStr === reversedStr;
}

// Exporting the utility functions
module.exports = {
    calculateSum,
    isEven,
    isPalindrome
};