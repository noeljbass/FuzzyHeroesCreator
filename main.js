document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const sizeInput = document.getElementById('size');
    const colorSelect = document.getElementById('color');
    const limbsInput = document.getElementById('limbs');
    const mouthInput = document.getElementById('mouth');
    const bitsInput = document.getElementById('bits');
    const idCardName = document.getElementById('id-card-name');
    const idCardEnergy = document.getElementById('id-card-energy');
    const idCardDefense = document.getElementById('id-card-defense');
    const idCardMoves = document.getElementById('id-card-moves');
    const idCardAttacks = document.getElementById('id-card-attacks');
    const idCardAvoidance = document.getElementById('id-card-avoidance');
    const idCardDamage = document.getElementById('id-card-damage');

    // Update the name on the ID card and logo when the input changes
nameInput.addEventListener('input', () => {
    const nameValue = nameInput.value || '???';
    idCardName.textContent = nameValue; // Update the ID card name
    document.getElementById('logo-name').textContent = nameValue; // Update the logo name
});


// Function to download the ID card as a PNG
function downloadIDCard() {
    const idCard = document.getElementById('id-card');

    html2canvas(idCard).then(canvas => {
        // Create a link element
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
        link.download = 'id-card.png'; // Set the file name

        // Programmatically click the link to trigger the download
        link.click();
    }).catch(error => {
        console.error('Error capturing the ID card:', error);
    });
}

// Add event listener to the download button
document.getElementById('download-button').addEventListener('click', downloadIDCard);
// Add event listener to the download button
document.getElementById('download-button').addEventListener('click', downloadIDCard);


    // Function to update the mugshot when a file is selected
function updateMugshot() {
    const file = document.getElementById('mugshot').files[0]; // Get the selected file
    const reader = new FileReader();

    // When the file is read, set the image source
    reader.onload = function(event) {
        const mugshotImage = document.getElementById('id-card-mugshot');
        mugshotImage.src = event.target.result; // Set the image source to the file's data URL
    };

    if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
    }
}

// Update mugshot when a file is selected
document.getElementById('mugshot').addEventListener('change', updateMugshot);

    // Function to update energy, defense, and moves based on size input
    function updateStats() {
        const size = parseInt(sizeInput.value, 10);
        let baseDefense = 0;
        let avoidanceValue = 0;

        if (!isNaN(size)) {
            // Determine energy and base defense based on size
            if (size >= 1 && size <= 3) {
                idCardEnergy.textContent = 3;
                baseDefense = 16;
            } else if (size >= 4 && size <= 5) {
                idCardEnergy.textContent = 4;
                baseDefense = 15;
            } else if (size >= 6 && size <= 7) {
                idCardEnergy.textContent = 5;
                baseDefense = 14;
            } else if (size >= 8 && size <= 9) {
                idCardEnergy.textContent = 6;
                baseDefense = 13;
            } else if (size >= 10 && size <= 12) {
                idCardEnergy.textContent = 7;
                baseDefense = 12;
            } else if (size >= 13 && size <= 15) {
                idCardEnergy.textContent = 8;
                baseDefense = 11;
            } else if (size >= 16 && size <= 18) {
                idCardEnergy.textContent = 9;
                baseDefense = 10;
            } else if (size >= 19 && size <= 23) {
                idCardEnergy.textContent = 10;
                baseDefense = 9;
            } else if (size >= 24 && size <= 29) {
                idCardEnergy.textContent = 11;
                baseDefense = 8;
            } else if (size >= 30) {
                idCardEnergy.textContent = 12;
                baseDefense = 7;
            }

            // Determine moves based on size
            if (size < 6) {
                idCardMoves.textContent = '6 inches';
            } else if (size >= 7 && size <= 11) {
                idCardMoves.textContent = '12 inches';
            } else if (size >= 12 && size <= 17) {
                idCardMoves.textContent = '18 inches';
            } else if (size >= 18 && size <= 23) {
                idCardMoves.textContent = '24 inches';
            } else if (size >= 24 && size <= 29) {
                idCardMoves.textContent = '30 inches';
            } else if (size >= 30) {
                idCardMoves.textContent = '36 inches';
            }

            // Update defense based on color selection
            const colorValue = parseInt(colorSelect.value, 10);
            const finalDefense = baseDefense + (isNaN(colorValue) ? 0 : colorValue);
            idCardDefense.textContent = finalDefense;

            // Update avoidance based on color selection
            switch (colorSelect.value) {
                case '-5': // Pink/Yellow
                    avoidanceValue = 8;
                    break;
                case '-4': // White
                    avoidanceValue = 9;
                    break;
                case '-3': // Purple/Green
                    avoidanceValue = 10;
                    break;
                case '-2': // Blue/Gray
                    avoidanceValue = 11;
                    break;
                case '-1': // Orange/Red/Gold/Metallic
                    avoidanceValue = 12;
                    break;
                case '0': // Black/Brown
                    avoidanceValue = 13;
                    break;
                case '1': // Camo/Stripes/Spots
                    avoidanceValue = 14;
                    break;
                default:
                    avoidanceValue = 0; // Default value if no color is selected
            }

            // Update the avoidance value in the ID card
            idCardAvoidance.textContent = avoidanceValue;
        }
    }

    // Function to update the number of attacks based on limbs and mouth inputs
    function updateAttacks() {
        const limbs = parseInt(limbsInput.value, 10);
        const mouth = parseInt(mouthInput.value, 10);

        let attackValue = 0;

        if (!isNaN(limbs)) {
            attackValue = limbs - 1; // Set attacks to limbs - 1
        }

        if (!isNaN(mouth)) {
            if (mouth === 1) {
                attackValue -= 1; // If 1 mouth, reduce attacks by 1
            } else if (mouth >= 2) {
                attackValue += (mouth - 1); // Increase attacks by (mouth - 1)
            }
        }

        idCardAttacks.textContent = attackValue; // Update the attacks display
    }

    // Function to update damage based on bits input
function updateDamage() {
    const bits = parseInt(bitsInput.value, 10);
    let damageValue = 0;

    if (!isNaN(bits)) {
        if (bits >= 1 && bits <= 3) {
            damageValue = 1;
        } else if (bits >= 4 && bits <= 9) {
            damageValue = 2;
        } else if (bits >= 10 && bits <= 20) {
            damageValue = 3;
        } else if (bits > 20) {
            damageValue = 4;
        }
    }

    idCardDamage.textContent = damageValue; // Update the damage display
}

    // Update stats when size input changes
    sizeInput.addEventListener('input', updateStats);

    // Update defense when color selection changes
    colorSelect.addEventListener('change', updateStats);

    // Update attacks when limbs or mouth input changes
    limbsInput.addEventListener('input', updateAttacks);
    mouthInput.addEventListener('input', updateAttacks);
    // Update damage when bits input changes
    bitsInput.addEventListener('input', updateDamage);

});
