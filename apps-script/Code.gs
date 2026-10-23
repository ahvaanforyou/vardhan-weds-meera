const RSVP_SPREADSHEET_NAME = "vardhan-weds-meera-RSVPs";
const RSVP_SHEET_NAME = "RSVP Responses";
const RSVP_SPREADSHEET_ID_PROPERTY = "RSVP_SPREADSHEET_ID";
const RSVP_PROXY_TOKEN_PROPERTY = "RSVP_PROXY_TOKEN";
const RSVP_HEADERS = [
  "Timestamp",
  "Guest Name(s)",
  "RSVP Status",
  "Number of Attending Guests",
  "Ceremonies Attending",
  "Blessings / Message",
];

/** Creates or reuses the private RSVP spreadsheet and prepares its response tab. */
function setupWeddingRSVP() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty(RSVP_SPREADSHEET_ID_PROPERTY);
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(RSVP_SPREADSHEET_NAME);
    spreadsheetId = spreadsheet.getId();
    properties.setProperty(RSVP_SPREADSHEET_ID_PROPERTY, spreadsheetId);
  }

  let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
  if (!sheet) {
    const sheets = spreadsheet.getSheets();
    const blankDefaultSheet = sheets.length === 1 &&
      sheets[0].getLastRow() === 0 &&
      sheets[0].getName() === "Sheet1";

    sheet = blankDefaultSheet
      ? sheets[0].setName(RSVP_SHEET_NAME)
      : spreadsheet.insertSheet(RSVP_SHEET_NAME);
  }

  const headerRange = sheet.getRange(1, 1, 1, RSVP_HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  if (currentHeaders.every((value) => value === "")) {
    headerRange.setValues([RSVP_HEADERS]);
  } else if (!RSVP_HEADERS.every((header, index) => currentHeaders[index] === header)) {
    throw new Error(
      "The RSVP Responses header row differs from the expected columns. It was left unchanged to protect existing responses.",
    );
  }

  headerRange
    .setBackground("#6D1429")
    .setFontColor("#FFF8E9")
    .setFontWeight("bold")
    .setVerticalAlignment("middle")
    .setWrap(true);
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);
  [170, 260, 150, 220, 300, 420].forEach((width, index) => {
    sheet.setColumnWidth(index + 1, width);
  });
  if (!properties.getProperty(RSVP_PROXY_TOKEN_PROPERTY)) {
    properties.setProperty(RSVP_PROXY_TOKEN_PROPERTY, createRSVPProxyToken_());
  }

  Logger.log("Wedding RSVP spreadsheet: " + spreadsheet.getUrl());
  Logger.log("Copy RSVP_PROXY_TOKEN from Project Settings → Script Properties into the server-only GOOGLE_APPS_SCRIPT_TOKEN environment variable.");
  return spreadsheet.getUrl();
}

/**
 * Receives submissions from the Next.js server proxy. The token is never sent
 * to the browser. This endpoint is deployed as a web app executing as its owner.
 */
function doPost(e) {
  const properties = PropertiesService.getScriptProperties();
  const expectedToken = properties.getProperty(RSVP_PROXY_TOKEN_PROPERTY);
  if (!expectedToken) return jsonResponse_({ ok: false, error: "RSVP service is not configured." });

  let submission;
  try {
    submission = JSON.parse(e && e.postData && e.postData.contents ? e.postData.contents : "");
  } catch (_error) {
    return jsonResponse_({ ok: false, error: "Invalid request." });
  }

  if (!submission || typeof submission !== "object" || Array.isArray(submission)) {
    return jsonResponse_({ ok: false, error: "Invalid request." });
  }
  if (typeof submission.token !== "string" || submission.token !== expectedToken) {
    return jsonResponse_({ ok: false, error: "Unauthorized." });
  }
  if (typeof submission.website === "string" && submission.website.trim()) {
    return jsonResponse_({ ok: false, error: "Invalid submission." });
  }

  const name = typeof submission.name === "string" ? submission.name.trim() : "";
  const attendance = submission.attendance;
  const guestCount = submission.guestCount;
  const ceremonies = submission.ceremonies;
  const message = typeof submission.message === "string" ? submission.message.trim() : "";

  if (!name || name.length > 200 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(name)) {
    return jsonResponse_({ ok: false, error: "Enter a valid guest name (up to 200 characters)." });
  }
  if (attendance !== "attending" && attendance !== "declining") {
    return jsonResponse_({ ok: false, error: "Choose an RSVP status." });
  }
  if (!Number.isInteger(guestCount) || guestCount < 0 || guestCount > 6) {
    return jsonResponse_({ ok: false, error: "The guest count is invalid." });
  }
  if (attendance === "attending" && guestCount < 1) {
    return jsonResponse_({ ok: false, error: "Attending responses need at least one guest." });
  }
  if (attendance === "declining" && guestCount !== 0) {
    return jsonResponse_({ ok: false, error: "Declined responses must have zero attending guests." });
  }
  if (!Array.isArray(ceremonies) || ceremonies.length > 10 ||
      ceremonies.some((item) => typeof item !== "string" || item.length > 160) ||
      new Set(ceremonies).size !== ceremonies.length) {
    return jsonResponse_({ ok: false, error: "The selected ceremonies are invalid." });
  }
  if (attendance === "declining" && ceremonies.length !== 0) {
    return jsonResponse_({ ok: false, error: "Declined responses cannot include ceremonies." });
  }
  if (message.length > 1000 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(message)) {
    return jsonResponse_({ ok: false, error: "The message must be 1,000 characters or fewer." });
  }

  const spreadsheetId = properties.getProperty(RSVP_SPREADSHEET_ID_PROPERTY);
  if (!spreadsheetId) return jsonResponse_({ ok: false, error: "RSVP spreadsheet is not configured." });

  try {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);
    if (!sheet) return jsonResponse_({ ok: false, error: "RSVP response sheet is missing. Run setupWeddingRSVP()." });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        safeCellText_(name),
        attendance === "attending" ? "Attending" : "Declined",
        guestCount,
        ceremonies.map(safeCellText_).join(", "),
        safeCellText_(message),
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (_error) {
    return jsonResponse_({ ok: false, error: "The response could not be saved. Please try again." });
  }
}

function createRSVPProxyToken_() {
  return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, "");
}

function safeCellText_(value) {
  const text = String(value);
  return /^[=+@-]/.test(text) ? "'" + text : text;
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
