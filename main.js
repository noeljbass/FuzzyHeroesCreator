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

nameInput.addEventListener('input', () => {
    const nameValue = nameInput.value || '???';
    idCardName.textContent = nameValue; 
    document.getElementById('logo-name').textContent = nameValue; 
});


function downloadIDCard() {
    const idCard = document.getElementById('id-card');

    html2canvas(idCard).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); 
        link.download = 'id-card.png'; 

        link.click();
    }).catch(error => {
        console.error('Error capturing the ID card:', error);
    });
}

document.getElementById('download-button').addEventListener('click', downloadIDCard);
document.getElementById('download-button').addEventListener('click', downloadIDCard);


function updateMugshot() {
    const file = document.getElementById('mugshot').files[0]; 
    const reader = new FileReader();

    reader.onload = function(event) {
        const mugshotImage = document.getElementById('id-card-mugshot');
        mugshotImage.src = event.target.result; 
    };

    if (file) {
        reader.readAsDataURL(file); 
    }
}

document.getElementById('mugshot').addEventListener('change', updateMugshot);

    function updateStats() {
        const size = parseInt(sizeInput.value, 10);
        let baseDefense = 0;
        let avoidanceValue = 0;

        if (!isNaN(size)) {
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

            const colorValue = parseInt(colorSelect.value, 10);
            const finalDefense = baseDefense + (isNaN(colorValue) ? 0 : colorValue);
            idCardDefense.textContent = finalDefense;

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
                    avoidanceValue = 0; 
            }

            idCardAvoidance.textContent = avoidanceValue;
        }
    }

    function updateAttacks() {
        const limbs = parseInt(limbsInput.value, 10);
        const mouth = parseInt(mouthInput.value, 10);

        let attackValue = 0;

        if (!isNaN(limbs)) {
            attackValue = limbs - 1; 
        }

        if (!isNaN(mouth)) {
            if (mouth === 1) {
                attackValue -= 1; 
            } else if (mouth >= 2) {
                attackValue += (mouth - 1); 
            }
        }

        idCardAttacks.textContent = attackValue; 
    }

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

    idCardDamage.textContent = damageValue; 
}

    sizeInput.addEventListener('input', updateStats);
    colorSelect.addEventListener('change', updateStats);
    limbsInput.addEventListener('input', updateAttacks);
    mouthInput.addEventListener('input', updateAttacks);
    bitsInput.addEventListener('input', updateDamage);

});