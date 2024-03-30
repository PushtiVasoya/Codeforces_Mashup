
async function fetchDataAndSaveToCSV(apiUrl, filename) {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const total = await response.json();

        // Process the data
        const problems = total.result.problems || []; // Ensure problems array exists
        const csvData = problems.map(problem => [
            problem.rating || '', // If rating doesn't exist, use empty string
            problem.name || '',   // If name doesn't exist, use empty string
            (problem.tags || []).join(';') || '', // If tags don't exist, use empty string; join tags with semicolon
            problem.contestId || '',
            problem.index || ''
        ]);

        // Add CSV header
        csvData.unshift(['Rating', 'Problem Name', 'Tags', 'ContestID', 'Index']);

        // Convert CSV data to a string
        const csvString = csvData.map(row => row.join(',')).join('\n');

        // Create a Blob object
        const blob = new Blob([csvString], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Trigger the download
        link.click();

        console.log(`Data saved to ${filename}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Example usage:
//const tag = "greedy;tree";
const apiUrl = 'https://codeforces.com/api/problemset.problems?tags=';
const filename = 'data.csv';
fetchDataAndSaveToCSV(apiUrl, filename);


