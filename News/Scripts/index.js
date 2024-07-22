/// <reference path ="../../../node_modules/@types/jquery/jquery.d.ts"/>
import { capitalize } from "./helpers.js";
import { driverObj } from "./tutorial.js";
import {
  STORAGE_KEY,
  DEFAULT_SETTING,
  CATEGORIES_OPTIONS,
  LOCALE_OPTIONS,
} from "./static.js";

/**
 * Query TheNewsAPI and render news
 * @param {*} url - URL to query
 * @param {*} page - Page of news to be rendered (note: each page contains up to 9 news, or 3 pages of TheNewsAPI results)
 */
async function queryAndRenderNews(url, page) {
  if (page < 1) throw new Error("Page number must be positive.");

  $(".loader").toggle(true);

  const queryResults = await retrieveNews(url, page * 3 - 2, page * 3);

  // save the news in setting so that they can be displayed when the user reloads the page
  setting.news = queryResults.data;
  updateLocalStorage(setting);

  // pagination kicks in if more than 1 page - which contains up to 3 news - is found by TheNewsAPI
  $("#page-nav").empty();
  if (queryResults.meta.found > 3) {
    $("#page-nav").show();
    const $pagination = $("<ul>").addClass("pagination").appendTo("#page-nav");
    const lastPage = Math.ceil(queryResults.meta.found / 9);
    if (page === 1) {
      // disable Previous when the user is on page 1
      $pagination.append(
        $("<li>")
          .addClass("page-item disabled")
          .append($("<span>").addClass("page-link").text("Previous")),
        $("<li>")
          .addClass("page-item active")
          .append($("<span>").addClass("page-link").text(page)),
        $("<li>")
          .addClass("page-item")
          .append(
            $("<span>")
              .addClass("page-link")
              .text(page + 1)
          )
          .on("click", async () => queryAndRenderNews(url, page + 1))
      );

      // page + 2 is added only when needed
      if (lastPage - page > 1) {
        $pagination.append(
          $("<li>")
            .addClass("page-item")
            .append(
              $("<span>")
                .addClass("page-link")
                .text(page + 2)
            )
            .on("click", async () => queryAndRenderNews(url, page + 2))
        );
      }

      // Next always directs to page + 1
      $pagination.append(
        $("<li>")
          .addClass("page-item")
          .append($("<span>").addClass("page-link").text("Next"))
          .on("click", async () => queryAndRenderNews(url, page + 1))
      );
    } else if (page === lastPage) {
      // Previous always directs to page - 1
      $pagination.append(
        $("<li>")
          .addClass("page-item")
          .append($("<span>").addClass("page-link").text("Previous"))
          .on("click", async () => queryAndRenderNews(url, page - 1))
      );

      // page - 2 is added only when there are at least 3 pages
      if (lastPage > 2) {
        $pagination.append(
          $("<li>")
            .addClass("page-item")
            .append(
              $("<span>")
                .addClass("page-link")
                .text(page - 2)
            )
            .on("click", async () => queryAndRenderNews(url, page - 2))
        );
      }

      // disable Next when the user is on the last page
      $pagination.append(
        $("<li>")
          .addClass("page-item")
          .append(
            $("<span>")
              .addClass("page-link")
              .text(page - 1)
          )
          .on("click", async () => queryAndRenderNews(url, page - 1)),
        $("<li>")
          .addClass("page-item active")
          .append($("<span>").addClass("page-link").text(page)),
        $("<li>")
          .addClass("page-item disabled")
          .append($("<span>").addClass("page-link").text("Next"))
      );
    } else {
      $pagination.append(
        $("<li>")
          .addClass("page-item")
          .append($("<span>").addClass("page-link").text("Previous"))
          .on("click", async () => queryAndRenderNews(url, page - 1)),
        $("<li>")
          .addClass("page-item")
          .append(
            $("<span>")
              .addClass("page-link")
              .text(page - 1)
          )
          .on("click", async () => queryAndRenderNews(url, page - 1)),
        $("<li>")
          .addClass("page-item active")
          .append($("<span>").addClass("page-link").text(page)),
        $("<li>")
          .addClass("page-item")
          .append(
            $("<span>")
              .addClass("page-link")
              .text(page + 1)
          )
          .on("click", async () => queryAndRenderNews(url, page + 1)),
        $("<li>")
          .addClass("page-item")
          .append($("<span>").addClass("page-link").text("Next"))
          .on("click", async () => queryAndRenderNews(url, page + 1))
      );
    }
  } else {
    $("#page-nav").hide();
  }

  $(".loader").toggle(false);
  renderNews(queryResults.data);
}

/**
 * Retrieve news
 * @param {string} url - Endpoint URL
 * @param {number} pageToQuery - Page to query
 * @param {number} lastPageToQuery - Last page to query
 * @returns
 */
async function retrieveNews(url, pageToQuery = 1, lastPageToQuery = 3) {
  return fetch(url + `&page=${pageToQuery}`)
    .then((response) => {
      if (!response.ok) {
        $(".loader").toggle(false);
        throw new Error(
          `Error in querying TheNewsAPI! Status: ${response.status}`
        );
      }
      return response.json();
    })
    .then(async (json) => {
      console.log(json);
      let queryResults = json ?? { meta: { found: 0 }, data: [] };
      if (
        pageToQuery < lastPageToQuery &&
        json?.meta?.found > pageToQuery * 3
      ) {
        pageToQuery++;
        const nextPageQueryResults = await retrieveNews(
          url,
          pageToQuery,
          lastPageToQuery
        );
        queryResults.data = [
          ...queryResults.data,
          ...(nextPageQueryResults?.data ?? []),
        ];
      }
      return queryResults;
    });
}

function deleteLocale() {
  const $deletedLocale = $(this).data("locale");
  setting.locale = Array.from(setting.locale).filter(
    (l) => l !== $deletedLocale
  );
  renderLocales();
}

function deleteCategory() {
  const $deletedCat = $(this).data("category");
  setting.categories = Array.from(setting.categories).filter(
    (c) => c !== $deletedCat
  );
  renderCategories();
}

function renderLocales() {
  const $selectedLocale = $("#selected-locale");
  $selectedLocale.empty();
  if (!setting.locale?.length) {
    $selectedLocale.removeClass("mb-2");
    $selectedLocale.removeClass("py-2");
    return;
  }
  $selectedLocale.addClass("mb-2");
  $selectedLocale.addClass("py-2");

  setting.locale.forEach((l) => {
    $selectedLocale.append(
      $(
        "<div class='d-inline border border-tea rounded p-2 mr-2 mb-2'>"
      ).append(
        $(`<i data-locale='${l}' class='fa-solid fa-x'>`).on(
          "click",
          deleteLocale
        ),
        $("<small class='ml-2'>").text(LOCALE_OPTIONS[l])
      )
    );
  });
}

function renderCategories() {
  const $selectedCat = $("#selected-categories");
  $selectedCat.empty();
  if (!setting.categories?.length) {
    $selectedCat.removeClass("mb-2");
    $selectedCat.removeClass("py-2");
    return;
  }
  $selectedCat.addClass("mb-2");
  $selectedCat.addClass("py-2");

  setting.categories.forEach((cat) => {
    $selectedCat.append(
      $(
        "<div class='d-inline border border-tea rounded p-2 mr-2 mb-2'>"
      ).append(
        $(`<i data-category='${cat}' class='fa-solid fa-x'>`).on(
          "click",
          deleteCategory
        ),
        $("<small class='ml-2'>").text(capitalize(cat))
      )
    );
  });
}

function renderNews(data) {
  const $news = $("#news");
  $news.empty();

  if (!data || data.length == 0) {
    $news.append($("<p>").text("No news is good news."));
    return;
  }

  data.forEach((d) => {
    const card = $("<div class='card m-1' style='width:18rem;'>");

    // apparently image URL is not always available
    if (d.image_url)
      card.append(`<img src=${d.image_url} class="card-img-top">`);

    card.append(
      $("<div class='card-body'>").append(
        $("<h5>").append(
          $(`<a href=${d.url} target="_blank">`).text(d.title),
          $("<p>").append($("<small>").text(d.description))
        )
      )
    );
    $news.append(card);
  });
}

function retrieveFormData(setting) {
  // update setting
  setting.token = $("#token").val()?.trim();
  setting.search = $("#search").val();
  setting.sort = $("#sort-published").is(":checked")
    ? "published_at"
    : "relevance_score";
  setting.date = $("#published-date").val();
  setting.dateFilter = $("#published-after").is(":checked")
    ? "published_after"
    : $("#published-before").is(":checked")
    ? "published_before"
    : "published_on";

  return setting;
}

function updateLocalStorage(setting) {
  let settingString;
  try {
    settingString = JSON.stringify(setting);
  } catch {
    settingString = JSON.stringify(DEFAULT_SETTING);
  }
  localStorage.setItem(STORAGE_KEY, settingString);
}

// retrieve setting from local storage
let settingString = localStorage.getItem(STORAGE_KEY);
let setting = {};
if (!settingString) {
  setting = DEFAULT_SETTING;
} else {
  try {
    setting = JSON.parse(settingString);
  } catch {
    setting = DEFAULT_SETTING;
  }
}

// update the form based on stored setting
$("#token").val(setting.token);
$("#search").val(setting.search);
if (setting.sort === "published_at") {
  $("#sort-published").attr("checked", true);
} else {
  $("#sort-relevance").attr("checked", true);
}
const $categorySelect = $("#category-select");
CATEGORIES_OPTIONS.forEach((c) =>
  $categorySelect.append($(`<option value="${c}">`).text(capitalize(c)))
);
renderCategories();
if (setting.dateFilter === "published_after") {
  $("#published-after").attr("checked", true);
} else if (setting.dateFilter === "published_before") {
  $("#published-before").attr("checked", true);
} else {
  $("#published-at").attr("checked", true);
}
$("#published-date").val(setting.date.toString());
const $localeSelect = $("#locale-select");
for (const [key, value] of Object.entries(LOCALE_OPTIONS)) {
  $localeSelect.append($(`<option value="${key}">`).text(value));
}
renderLocales();
renderNews(setting.news);

// event listeners
$categorySelect.on("change", () => {
  const cat = $categorySelect.val();
  const categories = Array.from(setting.categories);
  if (categories.some((c) => c === cat) === false) {
    categories.push(cat);
    setting.categories = categories;
    renderCategories();
  }
});

$localeSelect.on("change", () => {
  const localeValue = $localeSelect.val();
  const locales = Array.from(setting.locale);
  if (locales.some((l) => l == localeValue) === false) {
    locales.push(localeValue);
    setting.locale = locales;
    renderLocales();
  }
});

$(".tool-tip").on("click", () =>
  driverObj.highlight({
    element: "#token",
    popover: {
      side: "bottom",
      title: "API key from TheNewsAPI",
      description:
        "Sign up at <a href='https://www.thenewsapi.com'>TheNewsAPI</a> and get an API key for free.",
    },
  })
);

$("#btn-confirm").on("click", async (e) => {
  e.preventDefault();
  $("#page-nav").empty().hide();
  $("#news").empty();

  // update setting
  setting = retrieveFormData(setting);
  if (!setting.token) {
    $("#token").addClass("is-invalid");
    renderNews(setting.data);
    return;
  }
  $("#token").removeClass("is-invalid");
  updateLocalStorage(setting);

  // form the endpoint URL based on setting
  let url = `https://api.thenewsapi.com/v1/news/all?api_token=${setting.token}&sort=${setting.sort}`;
  if (setting.search) url += `&search=${encodeURIComponent(setting.search)}`;
  if (setting.locale?.length) url += `&locale=${setting.locale.toString()}`;
  if (setting.language?.length)
    url += `&language=${setting.language.toString()}`;
  if (setting.categories?.length)
    url += `&categories=${setting.categories.toString()}`;
  if (setting.date) url += `&${setting.dateFilter}=${setting.date}`;

  // always query render page one first
  await queryAndRenderNews(url, 1);
});

if (!setting.token) driverObj.drive();
