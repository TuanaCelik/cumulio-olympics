const dashboardId = "2f8eae90-280c-4788-a005-20fe65f335d7";
const teamDashboardId = "2fa3fe7a-3f21-4ad5-8d6b-8bbfd09ca33a";

const dashboardOptions = {
  dashboardId: dashboardId,
  container: "#dashboard-container",
  loader: {
    background: "#EEF3F6",
    spinnerColor: "#004CB7",
    spinnerBackground: "#DCDCDC",
    fontColor: "#000000",
  },
};

// Function to add the dashboard to the page using Cumul.io embed
const loadDashboard = (key, token, dashboard) => {
  // use tokens if available
  if (key && token) {
    dashboardOptions.key = key;
    dashboardOptions.token = token;
  }
  if (dashboard) {
    dashboardOptions.dashboardId = dashboard;
  }
  // add the dashboard to the #dashboard-container element
  Cumulio.addDashboard(dashboardOptions);
};

const getDashboardAuthorizationToken = async () => {
  try {
    const response = await fetch("/authorization", {});

    // Fetch the JSON result with the Cumul.io Authorization key & token
    const responseData = await response.json();
    return responseData;
  } catch (e) {
    // Display errors in the console
    console.error(e);
    return { error: "Could not retrieve dashboard authorization token." };
  }
};

const loadSummerOlympicsPage = async (elem) => {
  loadDashboard(null, null, dashboardId);
  document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });
  elem.classList.add("active");
  toggleMenu(false);
};

const loadTeamCompare = async (elem) => {
  loadDashboard(
    null,
    null,
    teamDashboardId
  );
  document.querySelectorAll(".menu-item").forEach((el) => {
    el.classList.remove("active");
  });
  elem.classList.add("active");
  toggleMenu(false);
};

const toggleMenu = (boolean) => {
  if (boolean) {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("overlay").classList.add("open");
  } else {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("open");
  }
};

function changeLanguage(language, elem) {
  document.querySelectorAll(".language-btn").forEach((el) => {
    el.classList.remove("active");
  });
  elem.classList.add("active");
  toggleMenu(false);
  dashboardOptions.language = language;
  loadDashboard();
}

// on page load
window.onload = async () => {
  document
    .getElementById("gated-content")
    .style.setProperty("display", "flex", "important");
  loadSummerOlympicsPage(document.getElementById("history"));
};
