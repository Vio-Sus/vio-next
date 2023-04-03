words = ["cardboard", "card board", "fuck you", "fuckyou"];

for (let word1 of words) {
  for (let word2 of words) {
    if (word1 === word2) {
      continue;
    }
    if (word1 === word2.replace(/\s/g, "")) {
      // word 1 is word 2 without spaces
      // word 1 is cardboard and word2 is card board
      // word 2 is probably correct and word 1 probably needs to be replaced by 2
    }
  }
}
