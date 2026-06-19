/*
  AA Technology Solutions Website
  Booking form email setup:
  1. Go to https://web3forms.com/
  2. Create an access key using the email where you want to receive bookings.
  3. Replace YOUR_WEB3FORMS_ACCESS_KEY below with your real access key.
*/

const WEB3FORMS_ACCESS_KEY = "c8ac9679-32c2-4fae-9468-a361c893c6c0Y";
const BUSINESS_EMAIL = "codesofaa@gmail.com";
const BUSINESS_NAME = "AA Technology Solutions";

const services = [
  {
    name: "Windows Installation",
    category: "repair",
    price: "₱500",
    description: "Clean Windows installation. Backup and license concerns are discussed before service."
  },
  {
    name: "Windows + Office Setup",
    category: "repair",
    price: "₱800",
    description: "Windows setup plus common productivity apps and basic configuration."
  },
  {
    name: "Driver Installation",
    category: "support",
    price: "₱300",
    description: "Install missing drivers for audio, Wi-Fi, Bluetooth, graphics, printer, and peripherals."
  },
  {
    name: "Software Installation",
    category: "support",
    price: "₱200–₱500",
    description: "Install requested apps, utilities, browser, office tools, or school/work software."
  },
  {
    name: "Virus Removal / PC Tune-up",
    category: "repair",
    price: "₱500–₱800",
    description: "Remove unwanted programs, clean startup apps, scan for malware, and improve performance."
  },
  {
    name: "Laptop Cleaning + Repaste",
    category: "repair",
    price: "₱1,000–₱1,500",
    description: "Internal cleaning and thermal paste replacement to help reduce heat and fan noise."
  },
  {
    name: "Desktop Cleaning + Repaste",
    category: "repair",
    price: "₱800–₱1,200",
    description: "Desktop dust cleaning, thermal repaste, cable check, and basic testing."
  },
  {
    name: "SSD Installation Labor",
    category: "repair",
    price: "₱300–₱500",
    description: "SSD installation labor only. SSD cost and cloning are quoted separately."
  },
  {
    name: "RAM Upgrade Labor",
    category: "repair",
    price: "₱200–₱300",
    description: "RAM installation labor only. RAM compatibility should be checked first."
  },
  {
    name: "Printer Setup",
    category: "support",
    price: "₱300–₱500",
    description: "Printer driver setup, basic testing, and connection to laptop or desktop."
  },
  {
    name: "Basic Network Setup",
    category: "support",
    price: "₱500–₱1,500",
    description: "Basic Wi-Fi, router, LAN, and small office/home network assistance."
  },
  {
    name: "Home Service Fee",
    category: "support",
    price: "+₱100–₱300",
    description: "Added depending on distance, travel time, schedule, and service location."
  },
  {
    name: "Facebook Post Design",
    category: "design",
    price: "₱100–₱300",
    description: "Clean Canva design for announcements, promos, or small business posts."
  },
  {
    name: "Tarpaulin Design",
    category: "design",
    price: "₱300–₱800",
    description: "Birthday, business, event, or barangay tarp layout. Printing not included."
  },
  {
    name: "Invitation / Poster Design",
    category: "design",
    price: "₱200–₱800",
    description: "Simple digital invitation, business poster, certificate, or resume layout."
  },
  {
    name: "Landing Page Website",
    category: "web",
    price: "₱3,000–₱8,000",
    description: "One-page website for a small business, portfolio, service page, or personal brand."
  },
  {
    name: "Portfolio / Small Business Website",
    category: "web",
    price: "₱5,000–₱25,000",
    description: "Multi-section website with pages, contact links, service list, and basic SEO setup."
  }
];

const ratesGrid = document.querySelector("#ratesGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");
const year = document.querySelector("#year");
const quoteForm = document.querySelector("#quoteForm");
const submitButton = document.querySelector("#submitButton");
const modal = document.querySelector("#messageModal");
const modalClose = document.querySelector("#modalClose");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const generatedMessage = document.querySelector("#generatedMessage");
const copyMessage = document.querySelector("#copyMessage");
const emailMessage = document.querySelector("#emailMessage");
const formNote = document.querySelector("#formNote");

function renderServices(filter = "all") {
  const filteredServices = filter === "all" ? services : services.filter(service => service.category === filter);

  ratesGrid.innerHTML = filteredServices.map(service => `
    <article class="rate-card">
      <span class="rate-tag">${formatCategory(service.category)}</span>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <strong class="rate-price">${service.price}</strong>
    </article>
  `).join("");
}

function formatCategory(category) {
  const labels = {
    repair: "PC/Laptop",
    support: "IT Support",
    design: "Design",
    web: "Web"
  };
  return labels[category] || "Service";
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderServices(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const expanded = item.getAttribute("aria-expanded") === "true";
    item.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
});

quoteForm.addEventListener("submit", async event => {
  event.preventDefault();

  const name = document.querySelector("#clientName").value.trim();
  const contact = document.querySelector("#clientContact").value.trim();
  const service = document.querySelector("#clientService").value;
  const details = document.querySelector("#clientDetails").value.trim();
  const schedule = document.querySelector("#clientSchedule").value.trim() || "To be discussed";

  const message = `Hello ${BUSINESS_NAME}! I would like to request a service quote.\n\nName: ${name}\nContact: ${contact}\nService Needed: ${service}\nPreferred Schedule: ${schedule}\n\nDevice / Request Details:\n${details}\n\nThank you.`;

  generatedMessage.value = message;
  emailMessage.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(`${BUSINESS_NAME} Service Inquiry`)}&body=${encodeURIComponent(message)}`;

  if (!isWeb3FormsConfigured()) {
    showModal(
      "Email setup needed",
      "The website is ready, but you still need to paste your Web3Forms access key in script.js before automatic email sending works.",
      message
    );
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  formNote.textContent = "Sending your booking request...";

  const formData = new FormData(quoteForm);
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("business", BUSINESS_NAME);
  formData.append("formatted_message", message);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      quoteForm.reset();
      formNote.textContent = "Booking request sent successfully.";
      showModal(
        "Booking request sent",
        "Thank you. Your booking request was sent to AA Technology Solutions. Please wait for confirmation.",
        message
      );
    } else {
      throw new Error(result.message || "Unable to send booking request.");
    }
  } catch (error) {
    formNote.textContent = "Sending failed. You can still copy the message or send it via email.";
    showModal(
      "Sending failed",
      "The form could not send automatically. Copy this message or use the email button as backup.",
      message
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Booking Request";
  }
});

function isWeb3FormsConfigured() {
  return WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY";
}

function showModal(title, description, message) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  generatedMessage.value = message;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

copyMessage.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(generatedMessage.value);
    copyMessage.textContent = "Copied!";
    setTimeout(() => copyMessage.textContent = "Copy Message", 1600);
  } catch (error) {
    generatedMessage.select();
    document.execCommand("copy");
    copyMessage.textContent = "Copied!";
    setTimeout(() => copyMessage.textContent = "Copy Message", 1600);
  }
});

year.textContent = new Date().getFullYear();
renderServices();
