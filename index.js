const loadPhone = async (searchText, isShowALl) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowALl);
}



const displayPhones = (phones, isShowALl) => {
    const receivedCon = document.getElementById('all-phone-received');
    receivedCon.textContent = '';

    const showAll = document.getElementById('show-all-con')
    if (phones.length > 12 && !isShowALl) {
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden');
    }

    if (!isShowALl) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="p-5 text-center shadow-xl">
                <!-- image -->
                <div class="flex justify-center p-9 bg-[#0D6EFD0D]">
                    <img src="${phone.image}" alt="">
                </div>
                <h3 class="text-2xl font-semibold">${phone.brand}</h3>
                <h2 class="text-3xl my-4 font-bold">${phone.phone_name}</h2>
                <p class="mb-2">There are many variations of passages of available, but the majority have suffered</p>
                <p class="mb-6 text-3xl font-bold text-sky-900">$999</p>
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary mb-5">Show Details</button>
            </div>
        `;
        receivedCon.appendChild(div);
    });
    spinnerToggle(false);
}

const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailsCon = document.getElementById('show-details-con');
    showDetailsCon.innerHTML =`
    <div>
    <div class="flex justify-center">
        <img src="${phone.image}" alt="">
    </div>
    <h2 class="text-2xl font-semibold mt-1">${phone.name}</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h3 class="text-base font-semibold">Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information'}</h3>
    <h3 class="text-base font-semibold">Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Display Information'}</h3>
    <h3 class="text-base font-semibold">ChipSet: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No ChipSet Information'}</h3>
    <h3 class="text-base font-semibold">Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Memory Information'}</h3>
    <h3 class="text-base font-semibold">Slug: ${phone.slug ? phone.slug : 'No Id details'}</h3>
    <h3 class="text-base font-semibold">Release Date:${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</h3>
    <h3 class="text-base font-semibold">Brand: ${phone.brand ? phone.brand : 'No Brand Name'}</h3>
    <h3 class="text-base font-semibold">GPS: ${phone?.others?.GPS ? phone.others.GPS : 'No GPS Information'}</h3>
</div>
    `
    show_details_modal.showModal();
}

const searchBtn = (isShowALl) => {
    spinnerToggle(true)
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    loadPhone(searchText, isShowALl);
}


const spinnerToggle = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner-loading');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    searchBtn(true)
}


loadPhone();