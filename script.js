const apiURL = "http://localhost:3000/items";

// Function to Fetch and Display Items
async function fetchItems() {
    const itemsList = document.getElementById("itemsList");
    if (!itemsList) return; // Prevent errors if element is not found

    try {
        const response = await fetch(apiURL);
        const items = await response.json();

        itemsList.innerHTML = "";

        items.forEach(item => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                ${item.name}
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button>
            `;
            itemsList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}

// Function to Add a New Item
async function addItem() {
    const itemNameInput = document.getElementById("itemName");
    if (!itemNameInput) return; // Prevent errors if element is not found

    const itemName = itemNameInput.value.trim();
    if (itemName === "") return alert("Please enter an item name");

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: itemName })
        });

        if (response.ok) {
            itemNameInput.value = ""; // Clear input field
            fetchItems(); // Refresh list
        }
    } catch (error) {
        console.error("Error adding item:", error);
    }
}

// Function to Delete an Item
async function deleteItem(id) {
    try {
        await fetch(`${apiURL}/${id}`, { method: "DELETE" });
        fetchItems(); // Refresh list
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}

// Check if elements exist before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const addItemButton = document.getElementById("addItem");
    if (addItemButton) {
        addItemButton.addEventListener("click", addItem);
    }

    // Initial Fetch to Load Items if Items List Exists
    if (document.getElementById("itemsList")) {
        fetchItems();
    }

    // Review Form Submission
    const reviewForm = document.getElementById("reviewForm");
    if (reviewForm) {
        reviewForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const rating = document.getElementById("rating").value;
            const service = document.getElementById("service").value;
            const comment = document.getElementById("comment").value;
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;

            const formData = {
                rating,
                service,
                comment,
                name,
                email,
                phone
            };

            try {
                await fetch("https://formspree.io/f/YOUR_FORM_ID", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
                alert("Your review has been submitted! Thank you for your feedback.");
                reviewForm.reset();
            } catch (error) {
                alert("Error submitting review. Please try again later.");
            }
        });
    }
});