
"use strict";

/* =========================================================
   APEX MOTORSPORT — PROJECT 05
   PART 3: APPLICATION LOGIC
   Vanilla JavaScript · No frameworks · No backend
   ========================================================= */

/* 01. CONFIGURATION AND SAMPLE DATA
   --------------------------------------------------------- */

const APEX = {
  storageKey: "apex-motorsport-favourites-v1",
  maxComparisons: 3,
  currency: "ZAR",
  locale: "en-ZA"
};

/*
 * These records are illustrative demonstration data.
 * They are NOT verified vehicles for sale.
 * Prices, availability, and specifications must be verified
 * before any real-world commercial use.
 *
 * Images are remote Unsplash URLs used for demonstration.
 */

const VEHICLES = [
  {
    id: "apex-001",
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    category: "Track-focused",
    bodyStyle: "Coupe",
    price: 4900000,
    power: 386,
    torque: 465,
    acceleration: 3.2,
    topSpeed: 296,
    transmission: "7-speed PDK",
    drivetrain: "RWD",
    fuel: "Petrol",
    seats: 2,
    description:
      "A track-focused sports car concept featuring naturally aspirated performance, aerodynamic bodywork, and a driver-first philosophy.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Silver Porsche-style sports car on a road",
    featured: true,
    badge: "TRACK FOCUSED"
  },
  {
    id: "apex-002",
    make: "Ferrari",
    model: "296 GTB",
    year: 2024,
    category: "Supercar",
    bodyStyle: "Coupe",
    price: 7200000,
    power: 610,
    torque: 740,
    acceleration: 2.9,
    topSpeed: 330,
    transmission: "8-speed DCT",
    drivetrain: "RWD",
    fuel: "Hybrid",
    seats: 2,
    description:
      "An Italian supercar concept combining a compact performance-focused design with hybrid powertrain technology.",
    image:
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Red exotic sports car photographed outdoors",
    featured: true,
    badge: "ITALIAN EXOTIC"
  },
  {
    id: "apex-003",
    make: "Mercedes-AMG",
    model: "GT",
    year: 2024,
    category: "Grand tourer",
    bodyStyle: "Coupe",
    price: 3500000,
    power: 430,
    torque: 560,
    acceleration: 3.9,
    topSpeed: 295,
    transmission: "9-speed automatic",
    drivetrain: "RWD",
    fuel: "Petrol",
    seats: 2,
    description:
      "A grand touring concept balancing long-distance comfort with the character and response of a high-performance coupe.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Mercedes-inspired luxury performance vehicle",
    featured: true,
    badge: "GRAND TOURING"
  },
  {
    id: "apex-004",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2023,
    category: "Supercar",
    bodyStyle: "Coupe",
    price: 6500000,
    power: 470,
    torque: 600,
    acceleration: 2.9,
    topSpeed: 325,
    transmission: "7-speed DCT",
    drivetrain: "AWD",
    fuel: "Petrol",
    seats: 2,
    description:
      "An angular supercar concept inspired by dramatic styling, responsive handling, and naturally aspirated engine character.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Yellow exotic sports car in an outdoor setting",
    featured: false,
    badge: "EXOTIC PERFORMANCE"
  },
  {
    id: "apex-005",
    make: "BMW",
    model: "M4 Competition",
    year: 2024,
    category: "Performance coupe",
    bodyStyle: "Coupe",
    price: 1950000,
    power: 390,
    torque: 650,
    acceleration: 3.9,
    topSpeed: 290,
    transmission: "8-speed automatic",
    drivetrain: "RWD",
    fuel: "Petrol",
    seats: 4,
    description:
      "A performance coupe concept with a practical cabin, strong turbocharged output, and everyday usability.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "BMW performance vehicle in a city setting",
    featured: false,
    badge: "DAILY PERFORMANCE"
  },
  {
    id: "apex-006",
    make: "Audi",
    model: "R8 V10",
    year: 2023,
    category: "Supercar",
    bodyStyle: "Coupe",
    price: 3200000,
    power: 456,
    torque: 560,
    acceleration: 3.4,
    topSpeed: 324,
    transmission: "7-speed S tronic",
    drivetrain: "AWD",
    fuel: "Petrol",
    seats: 2,
    description:
      "A mid-engined supercar concept focused on balanced proportions, distinctive styling, and all-weather capability.",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Audi-style performance car with sculpted bodywork",
    featured: false,
    badge: "MID-ENGINE ICON"
  },
  {
    id: "apex-007",
    make: "McLaren",
    model: "Artura",
    year: 2024,
    category: "Supercar",
    bodyStyle: "Coupe",
    price: 5400000,
    power: 500,
    torque: 720,
    acceleration: 3.0,
    topSpeed: 330,
    transmission: "8-speed DCT",
    drivetrain: "RWD",
    fuel: "Hybrid",
    seats: 2,
    description:
      "A contemporary supercar concept exploring lightweight construction, electrified performance, and modern design.",
    image:
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern exotic supercar in a dramatic setting",
    featured: false,
    badge: "NEXT GENERATION"
  },
  {
    id: "apex-008",
    make: "Aston Martin",
    model: "Vantage",
    year: 2024,
    category: "Grand tourer",
    bodyStyle: "Coupe",
    price: 3800000,
    power: 489,
    torque: 685,
    acceleration: 3.5,
    topSpeed: 325,
    transmission: "8-speed automatic",
    drivetrain: "RWD",
    fuel: "Petrol",
    seats: 2,
    description:
      "A refined sports coupe concept combining muscular proportions, a premium interior, and a grand touring character.",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Luxury sports coupe photographed on a road",
    featured: false,
    badge: "BRITISH CRAFT"
  },
  {
    id: "apex-009",
    make: "Nissan",
    model: "GT-R",
    year: 2023,
    category: "Performance coupe",
    bodyStyle: "Coupe",
    price: 2600000,
    power: 419,
    torque: 632,
    acceleration: 3.0,
    topSpeed: 315,
    transmission: "6-speed DCT",
    drivetrain: "AWD",
    fuel: "Petrol",
    seats: 4,
    description:
      "An all-wheel-drive performance coupe concept built around traction, turbocharged power, and purposeful engineering.",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Performance coupe in a modern urban setting",
    featured: false,
    badge: "ALL-WHEEL DRIVE"
  }
];

/* 02. APPLICATION STATE
   --------------------------------------------------------- */

const state = {
  search: "",
  brand: "all",
  category: "all",
  sort: "featured",
  favourites: new Set(),
  comparison: [],
  activeVehicleId: null
};

const elements = {};

function getElement(id) {
  return document.getElementById(id);
}

function cacheElements() {
  const ids = [
    "menu-toggle",
    "primary-navigation",
    "favourite-count",
    "inventory-form",
    "vehicle-search",
    "brand-filter",
    "category-filter",
    "sort-filter",
    "reset-filters",
    "inventory-count",
    "inventory-status",
    "vehicle-grid",
    "empty-state",
    "empty-reset",
    "comparison-count",
    "comparison-workspace",
    "comparison-status",
    "clear-comparison",
    "enquiry-form",
    "enquiry-name",
    "enquiry-email",
    "enquiry-interest",
    "enquiry-message",
    "name-error",
    "email-error",
    "message-error",
    "enquiry-budget",
    "form-feedback",
    "vehicle-dialog",
    "vehicle-details",
    "dialog-close",
    "toast-region",
    "current-year"
  ];

  ids.forEach((id) => {
    elements[id] = getElement(id);
  });
}

/* 03. FORMATTING HELPERS
   --------------------------------------------------------- */

const moneyFormatter = new Intl.NumberFormat(APEX.locale, {
  style: "currency",
  currency: APEX.currency,
  maximumFractionDigits: 0
});

const integerFormatter = new Intl.NumberFormat(APEX.locale, {
  maximumFractionDigits: 0
});

function formatPrice(price) {
  return moneyFormatter.format(price);
}

function formatPower(power) {
  return `${integerFormatter.format(power)} kW`;
}

function formatTorque(torque) {
  return `${integerFormatter.format(torque)} Nm`;
}

function formatAcceleration(seconds) {
  return `${Number(seconds).toFixed(1)} s`;
}

function formatSpeed(speed) {
  return `${integerFormatter.format(speed)} km/h`;
}

function formatNumber(value) {
  return integerFormatter.format(value);
}

function getVehicle(id) {
  return VEHICLES.find((vehicle) => vehicle.id === id) || null;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function getFallbackImageMarkup(vehicle) {
  const label = `${vehicle.make} ${vehicle.model}`;

  return `
    <div class="vehicle-image-placeholder"
         role="img"
         aria-label="${escapeHTML(label)} image unavailable">
      <span>APEX / ${escapeHTML(vehicle.make.slice(0, 3).toUpperCase())}</span>
    </div>
  `;
}

/* 04. SAFE LOCAL STORAGE
   --------------------------------------------------------- */

function loadFavourites() {
  try {
    const saved = localStorage.getItem(APEX.storageKey);

    if (!saved) {
      return new Set();
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(
      parsed.filter((id) =>
        typeof id === "string" &&
        VEHICLES.some((vehicle) => vehicle.id === id)
      )
    );
  } catch (error) {
    console.warn(
      "APEX: Favourites could not be loaded from local storage.",
      error
    );

    return new Set();
  }
}

function saveFavourites() {
  try {
    localStorage.setItem(
      APEX.storageKey,
      JSON.stringify([...state.favourites])
    );

    return true;
  } catch (error) {
    console.warn(
      "APEX: Favourites could not be saved in this browser.",
      error
    );

    showToast(
      "Your change is active for this session, but browser storage is unavailable."
    );

    return false;
  }
}

/* 05. INVENTORY FILTERS
   --------------------------------------------------------- */

function populateSelect(select, values, defaultLabel) {
  if (!select) return;

  const previousValue = select.value;

  select.replaceChildren();

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = defaultLabel;
  select.append(defaultOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });

  if (values.includes(previousValue)) {
    select.value = previousValue;
  }
}

function populateFilters() {
  const brands = [...new Set(VEHICLES.map((vehicle) => vehicle.make))]
    .sort((a, b) => a.localeCompare(b));

  const categories = [
    ...new Set(VEHICLES.map((vehicle) => vehicle.category))
  ].sort((a, b) => a.localeCompare(b));

  populateSelect(
    elements["brand-filter"],
    brands,
    "All marques"
  );

  populateSelect(
    elements["category-filter"],
    categories,
    "All categories"
  );

  const interestSelect = elements["enquiry-interest"];

  if (interestSelect) {
    VEHICLES.forEach((vehicle) => {
      const option = document.createElement("option");

      option.value = vehicle.id;
      option.textContent = `${vehicle.make} ${vehicle.model}`;

      interestSelect.append(option);
    });
  }
}

function getFilteredVehicles() {
  const query = state.search.trim().toLowerCase();

  const results = VEHICLES.filter((vehicle) => {
    const searchableText = [
      vehicle.make,
      vehicle.model,
      vehicle.category,
      vehicle.bodyStyle,
      vehicle.year,
      vehicle.fuel,
      vehicle.drivetrain
    ].join(" ").toLowerCase();

    const matchesSearch =
      !query || searchableText.includes(query);

    const matchesBrand =
      state.brand === "all" || vehicle.make === state.brand;

    const matchesCategory =
      state.category === "all" ||
      vehicle.category === state.category;

    return matchesSearch && matchesBrand && matchesCategory;
  });

  switch (state.sort) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;

    case "power-desc":
      results.sort((a, b) => b.power - a.power);
      break;

    case "year-desc":
      results.sort((a, b) => b.year - a.year);
      break;

    case "featured":
    default:
      results.sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        return a.id.localeCompare(b.id);
      });
      break;
  }

  return results;
}

/* 06. VEHICLE CARD RENDERING
   --------------------------------------------------------- */

function createVehicleCard(vehicle, index) {
  const card = document.createElement("article");

  card.className = "vehicle-card";
  card.dataset.vehicleId = vehicle.id;
  card.style.animationDelay = `${Math.min(index * 45, 225)}ms`;

  const isFavourite = state.favourites.has(vehicle.id);
  const isCompared = state.comparison.includes(vehicle.id);

  card.innerHTML = `
    <div class="vehicle-card-image">
      <img
        src="${escapeHTML(vehicle.image)}"
        alt="${escapeHTML(vehicle.imageAlt)}"
        loading="lazy"
        decoding="async"
      >

      <span class="vehicle-label">
        ${escapeHTML(vehicle.badge)}
      </span>

      <button
        class="favourite-button"
        type="button"
        data-action="favourite"
        data-id="${escapeHTML(vehicle.id)}"
        aria-label="${isFavourite ? "Remove" : "Add"} ${escapeHTML(vehicle.make)} ${escapeHTML(vehicle.model)} ${isFavourite ? "from" : "to"} favourites"
        aria-pressed="${isFavourite}"
        title="${isFavourite ? "Remove favourite" : "Save favourite"}"
      >
        ${isFavourite ? "♥" : "♡"}
      </button>
    </div>

    <div class="vehicle-card-body">
      <p class="vehicle-card-kicker">
        ${escapeHTML(vehicle.make)} / ${vehicle.year}
      </p>

      <h3 class="vehicle-card-title">
        ${escapeHTML(vehicle.model)}
      </h3>

      <p class="vehicle-card-subtitle">
        ${escapeHTML(vehicle.category)} · ${escapeHTML(vehicle.bodyStyle)}
      </p>

      <div class="vehicle-price-row">
        <span class="vehicle-price">${formatPrice(vehicle.price)}</span>
        <span class="vehicle-price-note">Illustrative price</span>
      </div>

      <div class="vehicle-specs" aria-label="Vehicle highlights">
        <div class="vehicle-spec">
          <strong>${formatPower(vehicle.power)}</strong>
          <span>Power</span>
        </div>

        <div class="vehicle-spec">
          <strong>${formatAcceleration(vehicle.acceleration)}</strong>
          <span>0–100 km/h*</span>
        </div>

        <div class="vehicle-spec">
          <strong>${formatSpeed(vehicle.topSpeed)}</strong>
          <span>Top speed*</span>
        </div>
      </div>

      <div class="vehicle-card-actions">
        <button
          class="button button-light"
          type="button"
          data-action="details"
          data-id="${escapeHTML(vehicle.id)}"
        >
          View details <span aria-hidden="true">↗</span>
        </button>

        <button
          class="button button-outline compare-button"
          type="button"
          data-action="compare"
          data-id="${escapeHTML(vehicle.id)}"
          aria-pressed="${isCompared}"
          ${!isCompared && state.comparison.length >= APEX.maxComparisons ? "disabled" : ""}
        >
          ${isCompared ? "Selected ✓" : "Compare +"}
        </button>
      </div>
    </div>
  `;

  const img = card.querySelector("img");

  img.addEventListener("error", () => {
    img.replaceWith(
      createFallbackElement(vehicle)
    );
  }, { once: true });

  return card;
}

function createFallbackElement(vehicle) {
  const wrapper = document.createElement("div");

  wrapper.className = "vehicle-image-placeholder";
  wrapper.setAttribute("role", "img");
  wrapper.setAttribute(
    "aria-label",
    `${vehicle.make} ${vehicle.model}; image unavailable`
  );

  const text = document.createElement("span");
  text.textContent = `APEX / ${vehicle.make.slice(0, 3).toUpperCase()}`;

  wrapper.append(text);

  return wrapper;
}

function renderInventory() {
  if (!elements["vehicle-grid"]) return;

  const vehicles = getFilteredVehicles();
  const fragment = document.createDocumentFragment();

  vehicles.forEach((vehicle, index) => {
    fragment.append(createVehicleCard(vehicle, index));
  });

  elements["vehicle-grid"].replaceChildren(fragment);

  const count = vehicles.length;

  if (elements["inventory-count"]) {
    elements["inventory-count"].textContent = formatNumber(count);
  }

  if (elements["inventory-status"]) {
    elements["inventory-status"].textContent =
      `${count} illustrative ${count === 1 ? "vehicle" : "vehicles"} found`;
  }

  if (elements["empty-state"]) {
    elements["empty-state"].hidden = count !== 0;
  }

  if (elements["vehicle-grid"]) {
    elements["vehicle-grid"].hidden = count === 0;
  }
}

function updateInventoryControls() {
  if (elements["brand-filter"]) {
    elements["brand-filter"].value = state.brand;
  }

  if (elements["category-filter"]) {
    elements["category-filter"].value = state.category;
  }

  if (elements["sort-filter"]) {
    elements["sort-filter"].value = state.sort;
  }

  if (elements["vehicle-search"]) {
    elements["vehicle-search"].value = state.search;
  }
}

function resetFilters() {
  state.search = "";
  state.brand = "all";
  state.category = "all";
  state.sort = "featured";

  updateInventoryControls();
  renderInventory();
}

/* 07. FAVOURITES
   --------------------------------------------------------- */

function updateFavouriteCount() {
  if (elements["favourite-count"]) {
    elements["favourite-count"].textContent =
      formatNumber(state.favourites.size);
  }
}

function toggleFavourite(id) {
  const vehicle = getVehicle(id);

  if (!vehicle) return;

  if (state.favourites.has(id)) {
    state.favourites.delete(id);
    showToast(`${vehicle.make} ${vehicle.model} removed from favourites.`);
  } else {
    state.favourites.add(id);
    showToast(`${vehicle.make} ${vehicle.model} added to favourites.`);
  }

  saveFavourites();
  updateFavouriteCount();
  renderInventory();
}

/* 08. VEHICLE DETAILS DIALOG
   --------------------------------------------------------- */

function openVehicleDetails(id) {
  const vehicle = getVehicle(id);
  const dialog = elements["vehicle-dialog"];
  const content = elements["vehicle-details"];

  if (!vehicle || !dialog || !content) return;

  state.activeVehicleId = id;

  content.innerHTML = `
    <div class="vehicle-detail-hero">
      <div class="vehicle-detail-image">
        <img
          src="${escapeHTML(vehicle.image)}"
          alt="${escapeHTML(vehicle.imageAlt)}"
          decoding="async"
        >
      </div>

      <div class="vehicle-detail-copy">
        <p class="eyebrow">
          ${escapeHTML(vehicle.make)} / ${vehicle.year}
        </p>

        <h2 id="dialog-title">
          ${escapeHTML(vehicle.model)}
        </h2>

        <p>${escapeHTML(vehicle.description)}</p>

        <p class="vehicle-detail-price">
          ${formatPrice(vehicle.price)}
        </p>

        <span class="vehicle-label">
          Illustrative concept data
        </span>
      </div>
    </div>

    <div class="vehicle-detail-specs" aria-label="Detailed specifications">
      <div class="detail-spec-box">
        <span>Power</span>
        <strong>${formatPower(vehicle.power)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Torque</span>
        <strong>${formatTorque(vehicle.torque)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>0–100 km/h*</span>
        <strong>${formatAcceleration(vehicle.acceleration)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Top speed*</span>
        <strong>${formatSpeed(vehicle.topSpeed)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Transmission</span>
        <strong>${escapeHTML(vehicle.transmission)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Drivetrain</span>
        <strong>${escapeHTML(vehicle.drivetrain)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Body style</span>
        <strong>${escapeHTML(vehicle.bodyStyle)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Fuel type</span>
        <strong>${escapeHTML(vehicle.fuel)}</strong>
      </div>

      <div class="detail-spec-box">
        <span>Seats</span>
        <strong>${formatNumber(vehicle.seats)}</strong>
      </div>
    </div>

    <p class="vehicle-detail-disclaimer">
      *All prices and specifications are illustrative sample data,
      not verified manufacturer specifications or live offers.
      Actual performance and pricing depend on the exact vehicle,
      specification, market, and conditions.
    </p>

    <div class="vehicle-detail-actions">
      <button
        class="button button-red"
        type="button"
        data-action="detail-compare"
        data-id="${escapeHTML(vehicle.id)}"
      >
        Add to comparison <span aria-hidden="true">↗</span>
      </button>

      <button
        class="button button-outline"
        type="button"
        data-action="detail-enquire"
        data-id="${escapeHTML(vehicle.id)}"
      >
        Explore enquiry form
      </button>
    </div>
  `;

  const image = content.querySelector(".vehicle-detail-image img");

  image.addEventListener("error", () => {
    image.replaceWith(createFallbackElement(vehicle));
  }, { once: true });

  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeVehicleDetails() {
  const dialog = elements["vehicle-dialog"];

  if (dialog && dialog.open) {
    dialog.close();
  }
}

function handleDialogClose() {
  state.activeVehicleId = null;
}

function handleDialogBackdropClick(event) {
  const dialog = elements["vehicle-dialog"];

  if (!dialog || !dialog.open) return;

  /*
   * Close only when the click is outside the dialog's content box.
   */
  const rect = dialog.getBoundingClientRect();

  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    closeVehicleDetails();
  }
}

/* 09. VEHICLE COMPARISON
   --------------------------------------------------------- */

function toggleComparison(id) {
  const vehicle = getVehicle(id);

  if (!vehicle) return;

  const currentIndex = state.comparison.indexOf(id);

  if (currentIndex !== -1) {
    state.comparison.splice(currentIndex, 1);
    showToast(`${vehicle.make} ${vehicle.model} removed from comparison.`);
  } else {
    if (state.comparison.length >= APEX.maxComparisons) {
      showToast("You can compare a maximum of three vehicles at once.");
      return;
    }

    state.comparison.push(id);
    showToast(`${vehicle.make} ${vehicle.model} added to comparison.`);
  }

  renderInventory();
  renderComparison();
}

function removeFromComparison(id) {
  state.comparison = state.comparison.filter(
    (vehicleId) => vehicleId !== id
  );

  renderInventory();
  renderComparison();
}

function clearComparison() {
  state.comparison = [];

  renderInventory();
  renderComparison();

  showToast("Your comparison has been cleared.");
}

function comparisonRow(label, getValue) {
  const cells = state.comparison.map((id) => {
    const vehicle = getVehicle(id);
    return vehicle ? getValue(vehicle) : "—";
  });

  return `
    <tr>
      <th scope="row">${escapeHTML(label)}</th>
      ${cells.map((value) => `<td>${escapeHTML(value)}</td>`).join("")}
    </tr>
  `;
}

function renderComparison() {
  const workspace = elements["comparison-workspace"];

  if (!workspace) return;

  const vehicles = state.comparison
    .map((id) => getVehicle(id))
    .filter(Boolean);

  if (elements["comparison-count"]) {
    elements["comparison-count"].textContent =
      String(vehicles.length);
  }

  if (elements["comparison-status"]) {
    elements["comparison-status"].textContent =
      vehicles.length === 0
        ? "Select up to three vehicles."
        : `${vehicles.length} of ${APEX.maxComparisons} comparison slots used.`;
  }

  const clearButton = elements["clear-comparison"];

  if (clearButton) {
    clearButton.disabled = vehicles.length === 0;
  }

  if (vehicles.length === 0) {
    workspace.innerHTML = `
      <div class="comparison-empty">
        <span aria-hidden="true">＋</span>
        <h3>Your comparison starts here.</h3>
        <p>Add vehicles from the collection to compare their specifications.</p>
        <a href="#inventory" class="text-link">
          Browse vehicles <span aria-hidden="true">↗</span>
        </a>
      </div>
    `;

    return;
  }

  const vehicleHeaders = vehicles.map((vehicle) => `
    <th scope="col">
      <span class="comparison-vehicle-name">
        ${escapeHTML(vehicle.make)} ${escapeHTML(vehicle.model)}
      </span>

      <button
        class="comparison-remove"
        type="button"
        data-action="remove-compare"
        data-id="${escapeHTML(vehicle.id)}"
        aria-label="Remove ${escapeHTML(vehicle.make)} ${escapeHTML(vehicle.model)} from comparison"
      >
        Remove ×
      </button>
    </th>
  `).join("");

  const headers = `
    <thead>
      <tr>
        <th scope="col">SPECIFICATION</th>
        ${vehicleHeaders}
      </tr>
    </thead>
  `;

  const rows = [
    comparisonRow("Indicative price", (v) => formatPrice(v.price)),
    comparisonRow("Model year", (v) => String(v.year)),
    comparisonRow("Category", (v) => v.category),
    comparisonRow("Power", (v) => formatPower(v.power)),
    comparisonRow("Torque", (v) => formatTorque(v.torque)),
    comparisonRow("0–100 km/h*", (v) => formatAcceleration(v.acceleration)),
    comparisonRow("Top speed*", (v) => formatSpeed(v.topSpeed)),
    comparisonRow("Transmission", (v) => v.transmission),
    comparisonRow("Drivetrain", (v) => v.drivetrain),
    comparisonRow("Fuel type", (v) => v.fuel),
    comparisonRow("Body style", (v) => v.bodyStyle),
    comparisonRow("Seats", (v) => String(v.seats))
  ].join("");

  workspace.innerHTML = `
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        ${headers}
        <tbody>${rows}</tbody>
      </table>
    </div>

    <p class="vehicle-detail-disclaimer" style="padding: 0 17px 17px;">
      *Illustrative concept figures only. Verify all specifications and prices
      against authoritative manufacturer information.
    </p>
  `;
}

/* 10. MOBILE NAVIGATION
   --------------------------------------------------------- */

function closeMobileNavigation() {
  const button = elements["menu-toggle"];
  const navigation = elements["primary-navigation"];

  if (!button || !navigation) return;

  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

function toggleMobileNavigation() {
  const button = elements["menu-toggle"];
  const navigation = elements["primary-navigation"];

  if (!button || !navigation) return;

  const isOpen = button.getAttribute("aria-expanded") === "true";

  button.setAttribute("aria-expanded", String(!isOpen));
  button.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );

  navigation.classList.toggle("is-open", !isOpen);
}

/* 11. TOAST NOTIFICATIONS
   --------------------------------------------------------- */

function showToast(message) {
  const region = elements["toast-region"];

  if (!region) return;

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;

  region.append(toast);

  /*
   * Use CSS animation events rather than timers so the notification
   * lifecycle does not depend on arbitrary timeout values.
   */
  toast.addEventListener("animationend", function handleEntry() {
    toast.removeEventListener("animationend", handleEntry);

    toast.classList.add("toast-ready");

    toast.addEventListener("transitionend", function handleExit(event) {
      if (event.propertyName === "opacity" && toast.isConnected) {
        toast.remove();
      }
    });

    /*
     * Keep only a small number of visible notifications.
     * The oldest is removed if the region becomes crowded.
     */
    while (region.children.length > 4) {
      region.firstElementChild.remove();
    }
  }, { once: true });

  /*
   * Notifications are deliberately not auto-dismissed by JavaScript.
   * This keeps the message readable without relying on a timeout.
   */
}

/* 12. ENQUIRY VALIDATION
   --------------------------------------------------------- */

function setFieldError(input, errorElement, message) {
  if (input) {
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function validateName() {
  const input = elements["enquiry-name"];
  const error = elements["name-error"];

  if (!input) return true;

  const value = input.value.trim();

  let message = "";

  if (value.length < 2) {
    message = "Enter a name containing at least two characters.";
  } else if (value.length > 100) {
    message = "Your name must be no longer than 100 characters.";
  }

  setFieldError(input, error, message);

  return !message;
}

function validateEmail() {
  const input = elements["enquiry-email"];
  const error = elements["email-error"];

  if (!input) return true;

  const value = input.value.trim();

  let message = "";

  /*
   * A basic client-side check catches common mistakes.
   * Server-side validation would still be necessary in production.
   */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value) || value.length > 254) {
    message = "Enter a valid email address.";
  }

  setFieldError(input, error, message);

  return !message;
}

function validateMessage() {
  const input = elements["enquiry-message"];
  const error = elements["message-error"];

  if (!input) return true;

  const value = input.value.trim();

  let message = "";

  if (value.length < 10) {
    message = "Please provide at least 10 characters.";
  } else if (value.length > 2000) {
    message = "Your message must be no longer than 2,000 characters.";
  }

  setFieldError(input, error, message);

  return !message;
}

function setFormFeedback(message, type) {
  const feedback = elements["form-feedback"];

  if (!feedback) return;

  feedback.hidden = false;
  feedback.className = `form-feedback is-${type}`;
  feedback.textContent = message;
}

function handleEnquirySubmit(event) {
  event.preventDefault();

  const validName = validateName();
  const validEmail = validateEmail();
  const validMessage = validateMessage();

  if (!validName || !validEmail || !validMessage) {
    setFormFeedback(
      "Please correct the highlighted fields before continuing.",
      "error"
    );

    const firstInvalid = elements["enquiry-form"].querySelector(
      '[aria-invalid="true"]'
    );

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return;
  }

  const selectedVehicleId = elements["enquiry-interest"]?.value || "";
  const selectedVehicle = getVehicle(selectedVehicleId);

  /*
   * No network request is made.
   * No personal details are written to local storage.
   * This confirmation is local to the current browser session.
   */
  const interest = selectedVehicle
    ? `Vehicle of interest: ${selectedVehicle.make} ${selectedVehicle.model}. `
    : "Vehicle of interest: not specified. ";

  setFormFeedback(
    `Validation successful. ${interest}This is a local demonstration only: your enquiry has not been sent to a dealership or stored on a server.`,
    "success"
  );

  showToast("Enquiry validated locally. Nothing has been transmitted.");
}

function clearFieldError(input, error) {
  if (!input || !error) return;

  input.removeAttribute("aria-invalid");
  error.textContent = "";
}

function bindEnquiryValidation() {
  const name = elements["enquiry-name"];
  const email = elements["enquiry-email"];
  const message = elements["enquiry-message"];

  name?.addEventListener("blur", validateName);
  email?.addEventListener("blur", validateEmail);
  message?.addEventListener("blur", validateMessage);

  name?.addEventListener("input", () => {
    clearFieldError(name, elements["name-error"]);
  });

  email?.addEventListener("input", () => {
    clearFieldError(email, elements["email-error"]);
  });

  message?.addEventListener("input", () => {
    clearFieldError(message, elements["message-error"]);
  });

  elements["enquiry-form"]?.addEventListener(
    "submit",
    handleEnquirySubmit
  );
}

/* 13. EVENT DELEGATION
   --------------------------------------------------------- */

function handleActionClick(event) {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const { action, id } = button.dataset;

  if (!id || !getVehicle(id)) return;

  switch (action) {
    case "favourite":
      toggleFavourite(id);
      break;

    case "details":
      openVehicleDetails(id);
      break;

    case "compare":
      toggleComparison(id);
      break;

    case "remove-compare":
      removeFromComparison(id);
      break;

    case "detail-compare":
      toggleComparison(id);
      openVehicleDetails(id);
      break;

    case "detail-enquire": {
      const select = elements["enquiry-interest"];

      if (select) {
        select.value = id;
      }

      closeVehicleDetails();

      getElement("contact")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      elements["enquiry-name"]?.focus({ preventScroll: true });

      showToast("Vehicle selected. Complete the enquiry form to continue.");
      break;
    }

    default:
      break;
  }
}

/* 14. EVENT BINDING
   --------------------------------------------------------- */

function bindInventoryControls() {
  elements["vehicle-search"]?.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderInventory();
  });

  elements["brand-filter"]?.addEventListener("change", (event) => {
    state.brand = event.target.value;
    renderInventory();
  });

  elements["category-filter"]?.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderInventory();
  });

  elements["sort-filter"]?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderInventory();
  });

  elements["inventory-form"]?.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  elements["reset-filters"]?.addEventListener("click", (event) => {
    event.preventDefault();
    resetFilters();
  });

  elements["empty-reset"]?.addEventListener("click", resetFilters);

  elements["vehicle-grid"]?.addEventListener("click", handleActionClick);

  elements["comparison-workspace"]?.addEventListener(
    "click",
    handleActionClick
  );

  elements["vehicle-details"]?.addEventListener(
    "click",
    handleActionClick
  );

  elements["clear-comparison"]?.addEventListener(
    "click",
    clearComparison
  );
}

function bindNavigation() {
  elements["menu-toggle"]?.addEventListener(
    "click",
    toggleMobileNavigation
  );

  elements["primary-navigation"]?.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMobileNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNavigation();
    }
  });

  /*
   * If the viewport grows past the mobile breakpoint, restore
   * the desktop navigation state.
   */
  window.matchMedia("(min-width: 801px)").addEventListener(
    "change",
    (event) => {
      if (event.matches) {
        closeMobileNavigation();
      }
    }
  );
}

function bindDialog() {
  elements["dialog-close"]?.addEventListener(
    "click",
    closeVehicleDetails
  );

  elements["vehicle-dialog"]?.addEventListener(
    "click",
    handleDialogBackdropClick
  );

  elements["vehicle-dialog"]?.addEventListener(
    "close",
    handleDialogClose
  );
}

/* 15. INITIALIZATION
   --------------------------------------------------------- */

function initializeAPEX() {
  cacheElements();

  state.favourites = loadFavourites();

  if (elements["current-year"]) {
    elements["current-year"].textContent = String(
      new Date().getFullYear()
    );
  }

  populateFilters();
  updateInventoryControls();
  updateFavouriteCount();

  bindInventoryControls();
  bindNavigation();
  bindDialog();
  bindEnquiryValidation();

  renderInventory();
  renderComparison();

  console.info(
    `APEX MOTORSPORT initialized: ${VEHICLES.length} illustrative vehicles.`
  );
}

/*
 * Defer in index.html ensures the DOM normally exists before
 * this script executes. This guard also supports direct reuse.
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAPEX, {
    once: true
  });
} else {
  initializeAPEX();
}
