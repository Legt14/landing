const API = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks';
const content = document.querySelector('#content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a62edc482fmsh14b329b73b1f5e2p1dfab7jsn70311c90cd3c',
		'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
	}
};

fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/info', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

async function fetchData(api_url){
    const response = await fetch(api_url, options);
    const data = await response.json();
    return data;
}

(async ()=>{
    try{
        const backCard = await fetchData(API);
        let template = `
            ${backCard.map(record => 
                `
                <div class="group relative">
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700 text-center">
                        </h3>
                    </div>
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${record.imgAnimated}" alt="" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <strong>${record.name}:</strong>
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${record.description}
                        </h3>
                    </div>
                </div>
                `).slice(0, 8).join('')}
            `;
        
        content.innerHTML = template;
    } catch (error){
        throw new Error('Something was wrong');
    }
})();