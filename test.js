let csvData = [];

function readCSV(fileUrl) {
    fetch(fileUrl)
        .then(response => response.text())
        .then(data => {
            // Split the file content by newlines to get each row
            const rows = data.split('\r\n').filter(row => row.trim().length > 0);
            
            // Map through each row and split by comma to get individual columns
            csvData = rows.map(row => row.split(';').filter(cell => cell.trim().length > 0));
            // Extract unique values from subarray[1], skipping the header
            const uniqueValues = [...new Set(csvData.slice(1).map(subarray => subarray[1]))];
            // Populate the dropdown with unique values
            const dropdown = document.getElementById('dropdown');
            uniqueValues.forEach(value => {
                if (value) { // Make sure value is not empty
                    if (value != "map")
                    {
                        const option = document.createElement('option');
                    option.value = value;
                    option.textContent = value;
                    dropdown.appendChild(option);
                    }
                    
                }
            });
            // Add event listener to handle dropdown selection
            dropdown.addEventListener('change', function() {
                populateTable(this.value);
            });
            // Optionally, populate table with the first unique value on load
            if (uniqueValues.length > 0) {
                populateTable(uniqueValues[0]);
                dropdown.value = uniqueValues[0];
            }
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
}

function populateTable(selectedValue) {
    // Filter csvData to find rows where subarray[1] matches the selected value
    const filteredData = csvData.filter(subarray => subarray[1] === selectedValue);
    // Clear the table
    const tableBody = document.getElementById('tableBody');
    const tableHeader = document.getElementById('tableHeader');
    tableBody.innerHTML = '';
    tableHeader.innerHTML = '';
    // Add the headers (csvData[0]), excluding subarray[1]
    const headers = csvData[0].filter((_, index) => index !== 1);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHeader.appendChild(th);
    });
    // Populate the table with filtered data, excluding subarray[1]
    filteredData.forEach(subarray => {
        const tr = document.createElement('tr');
        subarray.forEach((cell, index) => {
            if (index !== 1) { // Exclude subarray[1]
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            }
        });
        tableBody.appendChild(tr);
    });
}
// Automatically read the file without user input
const fileUrl = 'data/WRDb.csv'; // Replace with the URL or path to your CSV file
readCSV(fileUrl);