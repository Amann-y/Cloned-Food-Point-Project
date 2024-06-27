import React from 'react'

const CurrentDateFormat = (date) => {
       // UTC date string
       const utcDateTimeString = date;

       // Parse UTC date string into Date object
       const utcDate = new Date(utcDateTimeString);

       // Adjust for Indian Standard Time (IST) offset (+5:30)
       const istOffset = 5.5 * 60 * 60 * 1000; // Convert 5 hours and 30 minutes to milliseconds
       const istDate = new Date(utcDate.getTime() + istOffset);

       // Function to pad numbers with leading zeros (for formatting)
       const pad = (num) => {
         return num.toString().padStart(2, "0");
       };

       // Get IST date components
       const istYear = istDate.getUTCFullYear();
       const istMonth = pad(istDate.getUTCMonth() + 1); // Months are zero-indexed
       const istDay = pad(istDate.getUTCDate());
       const istHours = pad(istDate.getUTCHours());
       const istMinutes = pad(istDate.getUTCMinutes());

       // Format the date in DD-MM-YYYY format (Indian format)
       const indianDateFormat = `${istDay}-${istMonth}-${istYear}`;
     
  return indianDateFormat
}

export default CurrentDateFormat