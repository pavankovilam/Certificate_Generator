function afterFormSubmit() {
  createPDF(); //we can run directly with direct function call but i created this to call other functions also 
}

function createPDF()
{
 
  const pdfFolder=DriveApp.getFolderById('1LWrCGrm4agfQj6YWiml6T72MWQdGOGLY'); //The id of folder where pdf should be stored
  const tempFolder=DriveApp.getFolderById('16bokZT64MxBtdSVd_R2i7NrPvMOIltNU'); //The id of folder where temporary word document is stored
  const templateDoc=DriveApp.getFileById("1Dlg4xcHFriqRxQ7sEmg6AJlkuw_QDyC2mLI2Y09hWlQ"); //Template id

 const ss = SpreadsheetApp.getActiveSpreadsheet(); //to get active spreadshhet
  const sheet = ss.getSheets()[0];
  var lastRow = sheet.getLastRow(); //get the values of row


  const newTempfile = templateDoc.makeCopy(tempFolder); // Make a copy of the template to perform the actions on it.
 
 const openDoc=DocumentApp.openById(newTempfile.getId()); //get id of new doc
 const body =openDoc.getBody();  //get body elements of the template  
  body.replaceText('{ f u l l n a m e }',sheet.getRange(lastRow,2).getValue()); //this work like find and replace text
  body.replaceText("{y e a r}",sheet.getRange(lastRow,3).getValue());
  body.replaceText("{s e m e s t e r}",sheet.getRange(lastRow,4).getValue());
  body.replaceText("{{HTNO}}",sheet.getRange(lastRow,5).getValue());
  body.replaceText("{ s u b j e c t}",sheet.getRange(lastRow,6).getValue());
  body.replaceText("{a y e a r}",sheet.getRange(lastRow,7).getValue());
  body.replaceText("{no}",sheet.getRange(lastRow,8).getValue());
  
  openDoc.saveAndClose(); //save the doc


  const blobPDF= newTempfile.getAs(MimeType.PDF); //convert into pdf
  pdfFolder.createFile(blobPDF).setName(sheet.getRange(lastRow,5).getValue()+".pdf"); //save pdf in pdf folder
  tempFolder.removeFile(newTempfile); //delete the temporary folder
    
    }
