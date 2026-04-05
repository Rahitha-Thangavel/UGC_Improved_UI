const dateTarget = document.getElementById("current-date");
const academicFilter = document.getElementById("academic-filter");
const announcements = Array.from(document.querySelectorAll(".announcement"));
const aboutSection = document.getElementById("about-section");
const aboutTitleLink = document.getElementById("about-title-link");
const aboutViewTitle = document.getElementById("about-view-title");
const aboutPanes = Array.from(document.querySelectorAll(".about-pane"));
const submenuLinks = Array.from(document.querySelectorAll(".submenu-link"));
const aboutDropdown = document.getElementById("about-menu");
const homeContent = document.getElementById("home-content");
const homeMenuLink = document.querySelector('.main-nav a[href="#"]');
const universitiesSection = document.getElementById("universities-section");
const universitiesViewTitle = document.getElementById("universities-view-title");
const universityPanes = Array.from(document.querySelectorAll(".university-pane"));
const universityLinks = Array.from(document.querySelectorAll("[data-university-view]"));
const universitiesBackButton = document.getElementById("universities-back");
const universitiesMenu = document.getElementById("universities-menu");
const announcementToggles = Array.from(document.querySelectorAll(".announcement-toggle"));
let currentUniversityView = "universities";
const placeholderFacultyTitle = document.getElementById("placeholder-faculty-title");
const placeholderFacultyAddress = document.getElementById("placeholder-faculty-address");
const placeholderFacultyWebsite = document.getElementById("placeholder-faculty-website");
const placeholderFacultyLogo = document.getElementById("placeholder-faculty-logo");
const breadcrumb = document.getElementById("breadcrumb");

const setBreadcrumb = (path) => {
  if (breadcrumb) {
    breadcrumb.textContent = `You are here: ${path}`;
  }
};

if (dateTarget) {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(now);

  dateTarget.textContent = formatted;
}

if (academicFilter && announcements.length > 0) {
  const applyAcademicFilter = () => {
    const selectedYear = academicFilter.value;

    announcements.forEach((card) => {
      const cardYear = card.dataset.year || "all";
      let shouldShow = false;

      if (selectedYear === "all") {
        shouldShow = true;
      } else if (selectedYear === "other") {
        shouldShow = cardYear === "other";
      } else {
        shouldShow = cardYear === selectedYear;
      }

      card.hidden = !shouldShow;
    });
  };

  academicFilter.addEventListener("change", applyAcademicFilter);
  applyAcademicFilter();
}

if (aboutSection && submenuLinks.length > 0 && aboutViewTitle && aboutTitleLink) {
  const viewLabels = {
    vision: "Vision, Mission & Goals",
    members: "Commission Members",
    chairman: "Chairman",
    "vice-chairman": "Vice Chairman",
    secretary: "Secretary",
    committees: "Standing Committees",
    appeals: "University Services Appeals Board",
    boards: "Other Boards / Committees",
    contact: "Contact Us",
  };

  const showAboutPane = (viewName) => {
    aboutSection.hidden = false;
    if (homeContent) {
      homeContent.hidden = true;
    }
    if (universitiesSection) {
      universitiesSection.hidden = true;
    }
    aboutPanes.forEach((pane) => {
      pane.hidden = pane.dataset.pane !== viewName;
    });

    const label = viewLabels[viewName] || "About Us";
    aboutTitleLink.textContent = label;
    aboutViewTitle.textContent = label;
    setBreadcrumb(`Home > About us > ${label}`);
    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  submenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const viewName = link.dataset.aboutView;
      showAboutPane(viewName);
      aboutDropdown?.classList.remove("is-open");
    });
  });

  aboutDropdown?.addEventListener("click", (event) => {
    if (event.target === aboutDropdown || event.target.closest(".menu-tooltip")) {
      aboutDropdown.classList.toggle("is-open");
    }
  });
}

if (homeMenuLink) {
  homeMenuLink.addEventListener("click", (event) => {
    event.preventDefault();
    if (aboutSection) {
      aboutSection.hidden = true;
    }
    if (universitiesSection) {
      universitiesSection.hidden = true;
    }
    if (homeContent) {
      homeContent.hidden = false;
      setBreadcrumb("Home");
      homeContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (universitiesSection && universitiesViewTitle && universityPanes.length > 0) {
  const universityViewLabels = {
    universities: "Universities",
    campuses: "Campuses",
    institutes: "Institutes",
    "other-degrees": "Other Recognized Degrees",
    external: "External Degrees & Ext. Courses",
    government: "Other Government Universities",
    foreign: "Recognized Foreign Universities",
    "south-asian": "South Asian University",
    "colombo-faculties": "University of Colombo Faculties",
    "faculty-placeholder": "University Faculties",
  };

  const showUniversityPane = (viewName) => {
    universitiesSection.hidden = false;
    if (homeContent) {
      homeContent.hidden = true;
    }
    if (aboutSection) {
      aboutSection.hidden = true;
    }

    universityPanes.forEach((pane) => {
      pane.hidden = pane.dataset.universityPane !== viewName;
    });

    currentUniversityView = viewName;
    const label = universityViewLabels[viewName] || "Universities";
    universitiesViewTitle.textContent = label;
    if (viewName === "universities") {
      setBreadcrumb("Home > Universities & Institutes > Universities");
    } else {
      setBreadcrumb(`Home > Universities & Institutes > ${label}`);
    }
    universitiesSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  universityLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const viewName = link.dataset.universityView;
      if (
        viewName === "faculty-placeholder" &&
        placeholderFacultyTitle &&
        placeholderFacultyAddress &&
        placeholderFacultyWebsite &&
        placeholderFacultyLogo
      ) {
        const universityName = link.dataset.facultyUniversity || "University";
        const universityAddress = link.dataset.facultyAddress || "";
        const universityWebsite = link.dataset.facultyWebsite || "#";
        const initials = universityName
          .split(" ")
          .filter(Boolean)
          .map((word) => word[0])
          .join("")
          .slice(0, 4)
          .toUpperCase();

        placeholderFacultyTitle.textContent = `${universityName} Faculties`;
        placeholderFacultyAddress.textContent = universityAddress;
        placeholderFacultyWebsite.textContent = universityWebsite;
        placeholderFacultyWebsite.href = universityWebsite;
        placeholderFacultyLogo.textContent = initials || "UNI";
      }
      showUniversityPane(viewName);
      universitiesMenu?.classList.remove("is-open");
    });
  });

  universitiesBackButton?.addEventListener("click", () => {
    if (currentUniversityView !== "universities") {
      showUniversityPane("universities");
      return;
    }

    universitiesSection.hidden = true;
    if (homeContent) {
      homeContent.hidden = false;
      setBreadcrumb("Home");
      homeContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  universitiesMenu?.addEventListener("click", (event) => {
    if (event.target === universitiesMenu || event.target.closest(".menu-tooltip")) {
      universitiesMenu.classList.toggle("is-open");
    }
  });
}

if (announcementToggles.length > 0) {
  announcementToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panel = toggle.nextElementSibling;
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));

      if (panel) {
        panel.hidden = isExpanded;
      }
    });
  });
}
