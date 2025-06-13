const characters = [
    {name: "JoelMiller", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/JoelMiller.jpg"},
    {name: "NathanDrake", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/NathanDrake.jpg"},
    {name: "CloudStrife", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/CloudStrife.jpg"},
    {name: "DeaconJohn", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/DeaconJohn.jpg"},
    {name: "Atreus", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/Atreus.jpg"},
    {name: "EthanWinters", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/EthanWinters.jpg"},
    {name: "Dante", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/Dante.jpg"},
    {name: "Virgil", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/Virgil.jpg"},
    {name: "ArthurMorgan", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/ArthurMorgan.jpg"},
    {name: "AlexMason", image: "https://raw.githubusercontent.com/Kovidhraj/webimages/main/AlexMason.jpg"},
];

let votes = {};
let currentPair = [];

characters.forEach(char => votes[char.name] = 0);

function getRandomCharacters(){
    let firstIndex, secondIndex;
    do{
        firstIndex = Math.floor(Math.random() * characters.length);
        secondIndex = Math.floor(Math.random() *characters.length);
    }while(firstIndex === secondIndex);
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

    async function submitVote(charId){
        const characterName = charId === 'char1' ? currentPair[0].name : currentPair[1].name;
        console.log('Voting for: ',characterName);
        const response = await fetch('http://localhost:3000/api/vote',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ characterName })

        });
        console.log('Vote response: ',response.status);

        if(response.ok){
            displayCharacters();
        }
        else{
            alert('Vote Failed!');
        }
    }

    // logic for the male winner
    async function checkFemaleWinner(){
  try{
    const response = await fetch('http://localhost:3000/api/male-characters');
    const characters = await response.json();

    const winner = characters.find(char => char.votes === 5);

    if(winner){
      const imageMap = {
         name: "JoelMiller", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/JoelMiller.jpg",
       name: "NathanDrake", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/NathanDrake.jpg",
       name: "CloudStrife", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/CloudStrife.jpg",
       name: "DeaconJohn", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/DeaconJohn.jpg",
       name: "Atreus", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Atreus.jpg",
       name: "EthanWinters", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/EthanWinters.jpg",
       name: "Dante", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Dante.jpg",
       name: "Virgil", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/Virgil.jpg",
       name: "ArthurMorgan", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/ArthurMorgan.jpg",
       name: "AlexMason", image: "https://raw.githubusercontent.com/KovidhRaj/webimages/main/AlexMason.jpg" 
      };
      const winnerName = encodeURIComponent(winner.name);
      const image = encodeURIComponent(imageMap[winner.name] || "https://via.placeholder.com/300");

      window.location.href = `/Mwinner.html?characterName=${winnerName}&image=${image}`;

    }
  }catch(error){
    console.error('Error checking for male winner:',error);
  }

}
setInterval(checkFemaleWinner, 2000); 


    window.onload = displayCharacters;