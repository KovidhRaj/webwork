 const characters = [
      { name: "LaraCroft", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/LaraCroft2.jpg" },
      { name: "Aloy", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Aloy.jpg" },
      { name: "Bayonetta", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Bayonetta.jpg" },
      { name: "ChloeFrazer", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/ChloeFrazer.jpg" },
      { name: "Cortana", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Cortana.jpg" },
      { name: "Ellie", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Ellie.jpg" },
      { name: "FaithConnors", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/FaithConnors.jpg" },
      { name: "JillValentine", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/JillValentine.jpg" },
      { name: "Kassandra", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Kassandra.jpg" },
      { name: "AmiciaDeRune", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/AmiciaDeRune.jpg" }
    ];

    let votes = {};
    let currentPair = [];

    characters.forEach(char => votes[char.name] = 0);

    function getRandomCharacters() {
      let firstIndex, secondIndex;
      do {
        firstIndex = Math.floor(Math.random() * characters.length);
        secondIndex = Math.floor(Math.random() * characters.length);
      } while (firstIndex === secondIndex);
      return [characters[firstIndex], characters[secondIndex]];
    }

    function displayCharacters() {
      currentPair = getRandomCharacters();

      // Character 1
      document.getElementById("char1-name").innerText = currentPair[0].name;
      document.querySelector("#char1 img").src = currentPair[0].image;
      document.querySelector("#char1 img").alt = currentPair[0].name;

      // Character 2
      document.getElementById("char2-name").innerText = currentPair[1].name;
      document.querySelector("#char2 img").src = currentPair[1].image;
      document.querySelector("#char2 img").alt = currentPair[1].name;
    }

  async function submitVote(charId) {
  const characterName = charId === 'char1' ? currentPair[0].name : currentPair[1].name;
  
  const response = await fetch('/api/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ characterName })
  });

  if (response.ok) {
    displayCharacters(); // Load next pair
  } else {
    alert('Vote failed!');
  }
}

    window.onload = displayCharacters;
  