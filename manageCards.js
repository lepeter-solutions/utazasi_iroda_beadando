
export async function manageCards(){
    
    const cardTemplate = document.getElementById('card-template').content.cloneNode(true);
    const spinner = document.getElementById('spinner');
   
    spinner.style.display = 'flex'; 
    
    let response = await fetch('https://petrik-utazas-default-rtdb.europe-west1.firebasedatabase.app/travelDestinations.json');
    let data = await response.json();
    
    createCards(data, cardTemplate);
    
    let counter = 0;
    const images = document.querySelectorAll('img');
    images.forEach((image) => {
        image.addEventListener('load', () => {
            counter++;
            if(counter === images.length){
                spinner.style.display = 'none';
            }
        });
    });
}

function createCards(data, template){
    for (const key in data) {
        const card = template.cloneNode(true);
        console.log(key, data[key])
        card.querySelector('.template-country-name').textContent = data[key].content;
        card.querySelector('.template-image').src = data[key].img;
        card.querySelector('.template-sight-name').textContent = data[key].title;
        document.getElementById('card-container').appendChild(card);
    }
}

