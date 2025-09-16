// Caesar Cipher Decryption Tool JavaScript

class CaesarCipherTool {
    constructor() {
        this.englishFrequencies = {
            "E": 12.02, "T": 9.10, "A": 8.12, "O": 7.68, "I": 6.97, "N": 6.75,
            "S": 6.33, "H": 6.09, "R": 5.99, "D": 4.25, "L": 4.03, "C": 2.78,
            "U": 2.76, "M": 2.41, "W": 2.36, "F": 2.23, "G": 2.02, "Y": 1.97,
            "P": 1.93, "B": 1.29, "V": 0.98, "K": 0.77, "J": 0.15, "X": 0.15,
            "Q": 0.10, "Z": 0.07
        };

        this.examples = [
            { text: "WKLV LV D VHFUHW PHVVDJH", description: "Example 1: Secret Message" },
            { text: "FDHVDU FLSKHU LV HDV WR FUDFN", description: "Example 2: About Caesar Cipher" },
            { text: "KHOOR ZRUOG", description: "Example 3: Classic Greeting" }
        ];

        this.commonWords = [
            'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HER', 'WAS', 'ONE',
            'OUR', 'HAD', 'BY', 'WORD', 'WHAT', 'SAID', 'EACH', 'WHICH', 'SHE', 'DO', 'HOW',
            'THEIR', 'IF', 'WILL', 'UP', 'OTHER', 'ABOUT', 'OUT', 'MANY', 'THEN', 'THEM',
            'THESE', 'SO', 'SOME', 'HER', 'WOULD', 'MAKE', 'LIKE', 'INTO', 'HIM', 'IS', 'HAS',
            'TWO', 'MORE', 'VERY', 'TO', 'OF', 'IN', 'IT', 'WITH', 'BE', 'THIS', 'HAVE', 'FROM'
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeTabs();
    }

    bindEvents() {
        // Tab navigation
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Example buttons
        document.querySelectorAll('[data-example]').forEach(button => {
            button.addEventListener('click', (e) => this.loadExample(e.target.dataset.example));
        });

        // Manual decryption slider
        const shiftSlider = document.getElementById('shiftSlider');
        const shiftValue = document.getElementById('shiftValue');
        if (shiftSlider && shiftValue) {
            shiftSlider.addEventListener('input', (e) => {
                shiftValue.textContent = e.target.value;
                this.updateManualDecryption();
            });
        }

        // Input text change
        const encryptedText = document.getElementById('encryptedText');
        if (encryptedText) {
            encryptedText.addEventListener('input', () => {
                this.updateManualDecryption();
            });
        }

        // Brute force button
        const bruteForceBtn = document.getElementById('bruteForceBtn');
        if (bruteForceBtn) {
            bruteForceBtn.addEventListener('click', () => {
                this.performBruteForce();
            });
        }

        // Frequency analysis button
        const frequencyBtn = document.getElementById('frequencyBtn');
        if (frequencyBtn) {
            frequencyBtn.addEventListener('click', () => {
                this.performFrequencyAnalysis();
            });
        }

        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearAll();
            });
        }

        // Copy buttons
        const copyManual = document.getElementById('copyManual');
        if (copyManual) {
            copyManual.addEventListener('click', () => {
                const manualResult = document.getElementById('manualResult');
                if (manualResult) {
                    this.copyToClipboard(manualResult.textContent);
                }
            });
        }
    }

    initializeTabs() {
        this.switchTab('manual');
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            if (button.dataset.tab === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            if (panel.id === `${tabName}-tab`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    loadExample(exampleText) {
        const encryptedTextInput = document.getElementById('encryptedText');
        if (encryptedTextInput) {
            encryptedTextInput.value = exampleText;
            this.updateManualDecryption();
        }
    }

    caesarDecrypt(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[A-Z]/)) {
                const code = char.charCodeAt(0) - 65;
                const newCode = (code - shift + 26) % 26;
                return String.fromCharCode(newCode + 65);
            } else if (char.match(/[a-z]/)) {
                const code = char.charCodeAt(0) - 97;
                const newCode = (code - shift + 26) % 26;
                return String.fromCharCode(newCode + 97);
            }
            return char;
        }).join('');
    }

    updateManualDecryption() {
        const textInput = document.getElementById('encryptedText');
        const shiftSlider = document.getElementById('shiftSlider');
        const resultDiv = document.getElementById('manualResult');
        const copyBtn = document.getElementById('copyManual');

        if (!textInput || !shiftSlider || !resultDiv || !copyBtn) return;

        const text = textInput.value.trim();
        const shift = parseInt(shiftSlider.value);

        if (!text) {
            resultDiv.textContent = 'Enter text above and adjust the shift to see the result';
            copyBtn.classList.add('hidden');
            return;
        }

        const decrypted = this.caesarDecrypt(text, shift);
        resultDiv.textContent = decrypted;
        copyBtn.classList.remove('hidden');
    }

    performBruteForce() {
        const textInput = document.getElementById('encryptedText');
        const resultsDiv = document.getElementById('bruteForceResults');

        if (!textInput || !resultsDiv) return;

        const text = textInput.value.trim();

        if (!text) {
            alert('Please enter some encrypted text first!');
            return;
        }

        resultsDiv.innerHTML = '';

        for (let shift = 0; shift <= 25; shift++) {
            const decrypted = this.caesarDecrypt(text, shift);
            const isReadable = this.isLikelyEnglish(decrypted);

            const resultDiv = document.createElement('div');
            resultDiv.className = `shift-result ${isReadable ? 'highlighted' : ''}`;

            const shiftLabel = document.createElement('span');
            shiftLabel.className = 'shift-label';
            shiftLabel.textContent = `Shift ${shift}:`;

            const shiftText = document.createElement('span');
            shiftText.className = 'shift-text';
            shiftText.textContent = decrypted;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn btn btn--sm btn--outline';
            copyBtn.textContent = 'Copy';
            copyBtn.onclick = () => this.copyToClipboard(decrypted);

            resultDiv.appendChild(shiftLabel);
            resultDiv.appendChild(shiftText);
            resultDiv.appendChild(copyBtn);
            resultsDiv.appendChild(resultDiv);
        }
    }

    isLikelyEnglish(text) {
        const words = text.toUpperCase().replace(/[^A-Z\s]/g, '').split(/\s+/);
        const commonWordCount = words.filter(word => 
            word.length > 2 && this.commonWords.includes(word)
        ).length;
        
        return commonWordCount >= Math.max(1, Math.floor(words.length * 0.3));
    }

    performFrequencyAnalysis() {
        const textInput = document.getElementById('encryptedText');
        if (!textInput) return;

        const text = textInput.value.trim();

        if (!text) {
            alert('Please enter some encrypted text first!');
            return;
        }

        // Calculate letter frequencies
        const letterCounts = {};
        const letters = text.toUpperCase().replace(/[^A-Z]/g, '');
        
        for (const letter of letters) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }

        const totalLetters = letters.length;
        const frequencies = {};
        for (const [letter, count] of Object.entries(letterCounts)) {
            frequencies[letter] = (count / totalLetters * 100).toFixed(2);
        }

        // Find most common letter
        const mostCommon = Object.keys(frequencies).reduce((a, b) => 
            frequencies[a] > frequencies[b] ? a : b
        );

        // Calculate suggested shift (assuming most common letter is 'E')
        const suggestedShift = (mostCommon.charCodeAt(0) - 'E'.charCodeAt(0) + 26) % 26;
        const suggestedDecryption = this.caesarDecrypt(text, suggestedShift);

        // Display analysis
        this.displayFrequencyAnalysis(frequencies, mostCommon, suggestedShift, suggestedDecryption);
    }

    displayFrequencyAnalysis(frequencies, mostCommon, suggestedShift, suggestedDecryption) {
        const analysisDiv = document.getElementById('frequencyAnalysis');
        const suggestionDiv = document.getElementById('frequencySuggestion');

        if (!analysisDiv || !suggestionDiv) return;

        // Create frequency lists
        const cipherFreqList = Object.entries(frequencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const englishFreqList = Object.entries(this.englishFrequencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        analysisDiv.innerHTML = `
            <div class="frequency-list">
                <h4>Cipher Text Frequencies</h4>
                ${cipherFreqList.map(([letter, freq]) => 
                    `<div class="frequency-item">
                        <span>${letter}</span>
                        <span>${freq}%</span>
                    </div>`
                ).join('')}
            </div>
            <div class="frequency-list">
                <h4>Expected English Frequencies</h4>
                ${englishFreqList.map(([letter, freq]) => 
                    `<div class="frequency-item">
                        <span>${letter}</span>
                        <span>${freq}%</span>
                    </div>`
                ).join('')}
            </div>
        `;

        const escapedText = suggestedDecryption.replace(/'/g, "\\'");
        suggestionDiv.innerHTML = `
            <h4>Frequency Analysis Suggestion</h4>
            <p>Most frequent letter in cipher: <strong>${mostCommon}</strong></p>
            <p>Assuming this represents 'E', suggested shift: <strong>${suggestedShift}</strong></p>
            <div class="suggestion-text">${suggestedDecryption}</div>
            <button class="btn btn--sm btn--outline" onclick="window.caesarTool.copyToClipboard('${escapedText}')">Copy Suggestion</button>
        `;

        // Show frequency chart
        const chartImg = document.getElementById('frequencyChart');
        if (chartImg) {
            chartImg.src = 'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/c1590aeca5e43126ec825403f51e857f/3e6e8963.png';
            chartImg.classList.remove('hidden');
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showCopySuccess();
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopySuccess();
        });
    }

    showCopySuccess() {
        // Create a temporary success message
        const message = document.createElement('div');
        message.textContent = 'Copied to clipboard!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 300);
        }, 2000);
    }

    clearAll() {
        const encryptedText = document.getElementById('encryptedText');
        const shiftSlider = document.getElementById('shiftSlider');
        const shiftValue = document.getElementById('shiftValue');
        const manualResult = document.getElementById('manualResult');
        const copyManual = document.getElementById('copyManual');
        const bruteForceResults = document.getElementById('bruteForceResults');
        const frequencyAnalysis = document.getElementById('frequencyAnalysis');
        const frequencySuggestion = document.getElementById('frequencySuggestion');
        const frequencyChart = document.getElementById('frequencyChart');

        if (encryptedText) encryptedText.value = '';
        if (shiftSlider) shiftSlider.value = 0;
        if (shiftValue) shiftValue.textContent = '0';
        if (manualResult) manualResult.textContent = 'Enter text above and adjust the shift to see the result';
        if (copyManual) copyManual.classList.add('hidden');
        if (bruteForceResults) bruteForceResults.innerHTML = '';
        if (frequencyAnalysis) frequencyAnalysis.innerHTML = '';
        if (frequencySuggestion) frequencySuggestion.innerHTML = '';
        if (frequencyChart) frequencyChart.classList.add('hidden');
        
        // Switch back to manual tab
        this.switchTab('manual');
    }
}

// Initialize the tool when DOM is loaded
let caesarTool;
document.addEventListener('DOMContentLoaded', () => {
    caesarTool = new CaesarCipherTool();
    // Make it globally accessible
    window.caesarTool = caesarTool;
});