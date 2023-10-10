document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generate-btn");
    const box1Input = document.getElementById("box1");
    const box2Input = document.getElementById("box2");
    const box3Input = document.getElementById("box3");
    const phraseOutput = document.getElementById("phrase-result");
    const matchOutput = document.getElementById("match-result");

    generateBtn.addEventListener("click", function() {
        const box1Keywords = box1Input.value.split("\n");
        const box2Keywords = box2Input.value.split("\n");
        const box3Keywords = box3Input.value.split("\n");

        const phraseKeywords = generatePhraseKeywords(box1Keywords, box2Keywords, box3Keywords);
        const matchKeywords = generateMatchKeywords(box1Keywords, box2Keywords);

        phraseOutput.value = phraseKeywords.join("\n");
        matchOutput.value = matchKeywords.join("\n");
    });

    function generatePhraseKeywords(box1, box2, box3) {
        const combinedKeywords = [];
        for (let i = 0; i < box1.length; i++) {
            for (let j = 0; j < box2.length; j++) {
                const combined = `"${box1[i]} ${box2[j]}"`;
                if (box3[i]) combined += ` "${box3[i]}"`;
                if (hasAtLeastTwoDelimiters(combined) && hasMoreThanTwoKeywords(combined)) {
                    combinedKeywords.push(combined);
                }
            }
        }
        return combinedKeywords;
    }

    function generateMatchKeywords(box1, box2) {
        const combinedKeywords = [];
        for (let i = 0; i < box1.length; i++) {
            for (let j = 0; j < box2.length; j++) {
                const combined = `[${box1[i]} ${box2[j]}]`;
                if (hasAtLeastTwoDelimiters(combined) && hasMoreThanTwoKeywords(combined)) {
                    combinedKeywords.push(combined);
                }
            }
        }
        return combinedKeywords;
    }

    function hasAtLeastTwoDelimiters(combinedString) {
        // Split the combined string by spaces and filter out empty strings
        const keywords = combinedString.split(" ").filter(keyword => keyword.trim() !== "");
        // Check if there are at least two space delimiters
        return keywords.length >= 3;
    }

    function hasMoreThanTwoKeywords(combinedString) {
        // Split the combined string by spaces and filter out empty strings
        const keywords = combinedString.split(" ").filter(keyword => keyword.trim() !== "");
        // Check if there are more than two keywords
        return keywords.length > 2;
    }
});
