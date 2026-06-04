const cars = [
    {
        id: 1,
        name: "Toyota Camry",
        type: "Sedan",
        price: 45,
        rating: 4.8,
        image: "https://picsum.photos/id/1071/600/400",
        location: "New York",
        seats: 5,
        fuel: "Hybrid"
    },
    {
        id: 2,
        name: "Jeep Wrangler",
        type: "SUV",
        price: 85,
        rating: 4.7,
        image: "https://picsum.photos/id/201/600/400",
        location: "Los Angeles",
        seats: 5,
        fuel: "Petrol"
    },
    {
        id: 3,
        name: "BMW 3 Series",
        type: "Luxury",
        price: 95,
        rating: 4.9,
        image: "https://picsum.photos/id/870/600/400",
        location: "Chicago",
        seats: 5,
        fuel: "Petrol"
    },
    {
        id: 4,
        name: "Tesla Model 3",
        type: "Electric",
        price: 110,
        rating: 4.6,
        image: "https://picsum.photos/id/1015/600/400",
        location: "San Francisco",
        seats: 5,
        fuel: "Electric"
    }
];

function renderCars() {
    const grid = document.getElementById('car-grid');
    grid.innerHTML = '';

    cars.forEach(car => {
        const card = `
            <div class="car-card bg-white rounded-3xl overflow-hidden border border-gray-100 cursor-pointer" onclick="bookCar(${car.id})">
                <img src="${car.image}" class="w-full h-56 object-cover">
                <div class="p-6">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="font-semibold text-xl">${car.name}</h3>
                            <p class="text-gray-500">${car.type} • ${car.seats} seats</p>
                        </div>
                        <div class="text-right">
                            <span class="text-3xl font-bold text-red-600">$${car.price}</span>
                            <span class="text-xs block text-gray-500">per day</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2 mt-4">
                        <span class="text-yellow-500">★</span>
                        <span class="font-medium">${car.rating}</span>
                    </div>
                    
                    <button onclick="event.stopImmediatePropagation(); bookCar(${car.id})" 
                            class="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-medium">
                        Book Now
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

let selectedCar = null;

function bookCar(id) {
    selectedCar = cars.find(c => c.id === id);
    if (!selectedCar) return;

    document.getElementById('modal-car-name').textContent = selectedCar.name;
    document.getElementById('modal-car-image').innerHTML = `
        <img src="${selectedCar.image}" class="w-full h-64 object-cover">
    `;
    document.getElementById('modal-price').textContent = `$${selectedCar.price}/day`;

    const pickup = document.getElementById('pickup').value || "2026-06-10";
    const returnDate = document.getElementById('return').value || "2026-06-15";
    
    document.getElementById('modal-pickup').textContent = pickup;
    document.getElementById('modal-return').textContent = returnDate;

    const days = 5; // Demo
    document.getElementById('modal-total').textContent = `$${(selectedCar.price * days)}`;

    document.getElementById('booking-modal').classList.remove('hidden');
    document.getElementById('booking-modal').classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function confirmBooking() {
    alert(`🎉 Booking Confirmed!\n\n${selectedCar.name} has been reserved.\nThank you for choosing RentACar.com`);
    closeModal();
}

function searchCars() {
    const location = document.getElementById('location').value.trim();
    if (location) {
        alert(`🔍 Searching cars in: ${location}\n\nShowing available vehicles...`);
    }
    renderCars();
}

function toggleLogin() {
    alert("Sign in feature coming soon! (Demo Mode)");
}

// Initialize App
window.onload = () => {
    renderCars();
    
    // Set default dates
    const today = new Date();
    const pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + 2);
    
    const returnDate = new Date(pickupDate);
    returnDate.setDate(pickupDate.getDate() + 5);
    
    document.getElementById('pickup').value = pickupDate.toISOString().split('T')[0];
    document.getElementById('return').value = returnDate.toISOString().split('T')[0];
};