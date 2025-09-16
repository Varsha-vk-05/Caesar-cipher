# Let's create a comprehensive Caesar cipher decryption project example
# This will include basic decryption, brute force attack, and frequency analysis

import string
import collections
import matplotlib.pyplot as plt

def caesar_decrypt(ciphertext, shift):
    """Decrypt a Caesar cipher with a given shift"""
    result = ""
    for char in ciphertext:
        if char.isalpha():
            ascii_offset = ord('A') if char.isupper() else ord('a')
            decrypted_char = chr((ord(char) - ascii_offset - shift) % 26 + ascii_offset)
            result += decrypted_char
        else:
            result += char
    return result

def brute_force_decrypt(ciphertext):
    """Try all possible shifts for Caesar cipher decryption"""
    results = []
    for shift in range(26):
        decrypted = caesar_decrypt(ciphertext, shift)
        results.append((shift, decrypted))
    return results

def frequency_analysis(text):
    """Analyze letter frequencies in the text"""
    # Convert to uppercase and keep only alphabetic characters
    clean_text = ''.join([c.upper() for c in text if c.isalpha()])
    
    # Count letter frequencies
    letter_counts = collections.Counter(clean_text)
    
    # Calculate percentages
    total_letters = sum(letter_counts.values())
    frequencies = {}
    for letter in string.ascii_uppercase:
        count = letter_counts.get(letter, 0)
        frequencies[letter] = (count / total_letters * 100) if total_letters > 0 else 0
    
    return frequencies

def find_most_frequent_letter(text):
    """Find the most frequent letter in the text"""
    frequencies = frequency_analysis(text)
    return max(frequencies, key=frequencies.get)

def frequency_based_decrypt(ciphertext):
    """Decrypt using frequency analysis (assuming most frequent letter is E)"""
    most_frequent = find_most_frequent_letter(ciphertext)
    # Calculate shift assuming most frequent letter should be 'E'
    shift = (ord(most_frequent) - ord('E')) % 26
    return caesar_decrypt(ciphertext, shift), shift

# Example usage and demonstration
print("=== CAESAR CIPHER DECRYPTION PROJECT ===\n")

# Example encrypted message
ciphertext = "WKLV LV D VHFUHW PHVVDJH"
print(f"Encrypted message: {ciphertext}")

# Method 1: Brute force attack
print("\n1. BRUTE FORCE ATTACK:")
print("-" * 30)
brute_results = brute_force_decrypt(ciphertext)
for shift, decrypted in brute_results[:10]:  # Show first 10 results
    print(f"Shift {shift:2d}: {decrypted}")

# Method 2: Frequency analysis
print("\n2. FREQUENCY ANALYSIS:")
print("-" * 30)
freq_result, estimated_shift = frequency_based_decrypt(ciphertext)
print(f"Most frequent letter analysis suggests shift: {estimated_shift}")
print(f"Decrypted message: {freq_result}")

# Create frequency analysis data for educational purposes
english_frequencies = {
    'E': 12.02, 'T': 9.10, 'A': 8.12, 'O': 7.68, 'I': 6.97, 'N': 6.75,
    'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78,
    'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97,
    'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15,
    'Q': 0.10, 'Z': 0.07
}

ciphertext_frequencies = frequency_analysis(ciphertext)

# Save the data as CSV for further analysis
import pandas as pd
freq_data = pd.DataFrame({
    'Letter': list(english_frequencies.keys()),
    'English_Frequency': list(english_frequencies.values()),
    'Ciphertext_Frequency': [ciphertext_frequencies[letter] for letter in english_frequencies.keys()]
})

freq_data.to_csv('caesar_frequency_analysis.csv', index=False)
print(f"\nFrequency analysis data saved to: caesar_frequency_analysis.csv")

# Display some project statistics
print("\n3. PROJECT STATISTICS:")
print("-" * 30)
print(f"Ciphertext length: {len(ciphertext)} characters")
print(f"Alphabetic characters: {sum(1 for c in ciphertext if c.isalpha())}")
print(f"Most frequent letter in ciphertext: {find_most_frequent_letter(ciphertext)}")
print(f"Total possible shifts to try: 26")

print("\n=== PROJECT COMPLETE ===")