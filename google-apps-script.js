// This code should be deployed as a Google Apps Script Web App
// Follow the setup instructions in the README.md file

// Global variables
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your Google Sheet ID
const SHEET_NAME = 'LoveTreeData';

// Handle HTTP requests to the web app
function doGet(e) {
  // Get parameters
  const name = e.parameter.name;
  
  if (!name) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Name parameter is required'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Get data for this name
  const data = getDataForName(name);
  
  // Return data as JSON
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.count || !data.date) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Missing required fields: name, count, date'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Save the data
    saveData(data);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to save data to the Google Sheet
function saveData(data) {
  // Get the spreadsheet and sheet
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Create the sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    // Add headers
    sheet.appendRow(['Name', 'Count', 'Date', 'Timestamp']);
  }
  
  // Check if we already have data for this name
  const existingData = getDataForName(data.name);
  
  if (existingData && existingData.count) {
    // Update existing row
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) { // Skip header row
      if (rows[i][0] === data.name) {
        // Only update if the new count is higher
        if (parseInt(data.count) > parseInt(existingData.count)) {
          sheet.getRange(i + 1, 2).setValue(data.count); // Count
          sheet.getRange(i + 1, 3).setValue(data.date);  // Date
          sheet.getRange(i + 1, 4).setValue(new Date()); // Timestamp
        }
        return;
      }
    }
  } else {
    // Add new row
    sheet.appendRow([
      data.name,
      data.count,
      data.date,
      new Date() // Current timestamp
    ]);
  }
}

// Function to get data for a specific name
function getDataForName(name) {
  try {
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, return empty data
    if (!sheet) {
      return { count: 0, date: '' };
    }
    
    // Get all data
    const rows = sheet.getDataRange().getValues();
    
    // Skip header row and find the row for this name
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][0] === name) {
        return {
          count: rows[i][1],
          date: rows[i][2]
        };
      }
    }
    
    // If no data found, return empty data
    return { count: 0, date: '' };
    
  } catch (error) {
    console.error('Error getting data:', error);
    return { count: 0, date: '', error: error.toString() };
  }
} 