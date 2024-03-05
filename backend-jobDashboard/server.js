const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware to allow all origins

// Define the URL to scrape
const url = 'https://github.com/ReaVNaiL/New-Grad-2024';


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'JobDashBoard'
};


// MySQL Connection
// Define the function to create a database connection
const createConnection = async () => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established');
    return connection;
  } catch (error) {
    console.error('Error establishing database connection:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


// MySQL Connection


// Route to handle scraping
// app.get('/scrape', async (req, res) => {
//   try {
//     // Fetch HTML content from the URL
//     const response = await axios.get(url);
//     const html = response.data;

//     // Load HTML content into Cheerio
//     const $ = cheerio.load(html);

//     // Array to store scraped data
//     const scrapedData = [];

//     // Find the table containing job details
//     const tableRows = $('article').find('table tbody tr');

//     // Loop through each table row
//     tableRows.each((index, element) => {
//       // Extracting data from table cells
//       const cells = $(element).find('td');
  
    
  
//       // Extracting employer name, location, roles, citizenship, and date added

      
//       const title = $(cells[0]).text().trim(); // Assuming first cell contains job title
//       const Roles = $(cells[2]).text().trim(); // Assuming first cell contains job title
//       const description = ''; // You can leave this as empty string if not provided
//       const employer_id = null; // Replace with actual employer ID if available, otherwise set to null
//       const location = $(cells[1]).text().trim(); // Assuming second cell contains job location
//       const salary = ''; // You can leave this as empty string if not provided
//       const dateAdded = $(cells[4]).text().trim(); // Assuming fifth cell contains date added

//       const website = $(cells[0]).find('a').attr('href'); // Extract href attribute from <a> element


//       console.log(website);
  
//       // // Parse the date string and format it correctly
      
     
//       const category_id = null;
  
//       // // Push the scraped data into the array
//       scrapedData.push({ title, description, employer_id, location, salary, dateAdded, category_id,Roles,website });
//   });
//     // Insert scraped data into the database
//     const connection = await createConnection();
//     for (const job of scrapedData) {
//       const { title, description, employer_id, location, salary, date_posted, category_id,Roles,website } = job;
//       const query = 'INSERT INTO Jobs (title, description, employer_id, location, salary, date_posted, category_id,Roles,website) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)';
//       await connection.query(query, [title, description, employer_id, location, salary, date_posted, category_id,Roles,website]);
//     }

//     // Send success response
//     res.json({ message: 'Data scraped and inserted into database successfully' });
//   } catch (error) {
//     console.error('Error scraping data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });













// Define API endpoint to fetch jobs
app.get('/jobs', async (req, res) => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig);

    // Execute the query to fetch jobs
    const [rows, fields] = await connection.execute('SELECT * FROM Jobs');

    // Close the database connection
    await connection.end();

    // Send the fetched jobs as JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.get('/search', async (req, res) => {
  try {
    // Get the search query from the request parameters
    const query = req.query.query;
    console.log('Search query:', query);

    console.log(query);

    // Query the database to search for the query value
    const sql = "SELECT * FROM Jobs WHERE title LIKE ? OR Roles LIKE ? OR location LIKE ?";
    const params = [`%${query}%`, `%${query}%`, `%${query}%`];

    // Establish a database connection and execute the query
    const connection = await createConnection();
    console.log('Database connection established');

    const [results] = await connection.query(sql, params);
    console.log('Search results:', results);

    // Send back the search results as JSON response
    res.json(results);
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

