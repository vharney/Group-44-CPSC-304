# Group-44-CPSC-304
### Group Member:
1. Tylo Roberts (15171762)
2. Mellisa Hadipranata (52560067)
3. Vieri Harney (62613005)

### Description: 
We are modelling a job application website. Users can either be a company or employee. Employees can apply through the jobs page, connect with other employees and see postings. Companies can let user apply and see information about the jobs. There are interesting facts in the job page which use aggregation and division query to show facts about jobs posted in the website. Like any other job application websites, basic features such as updating user details, joining group and seeing recommendation and review can be done in our website.

### Tech stack used:
1. MySQL database, run on AWS, details below 
    $host = 'database-304.cusgozwqwnxy.us-east-1.rds.amazonaws.com:1522'; 
    $user = 'admin'; 
    $pass = 'admin1234'; 
    $db_name = 'project'; 
2. React.js Application for the frontend  (UI)
3. PHP server that make the website dynamic by performing SQL queries on the DB and sending back the result to the frontend

### How to run the website: 
1. First run the backend to start the server
    How to run backend, type the following command in the terminal:
    1. `cd backend`
    2. `php -S localhost:9000`
2. Then run the UI
    How to run frontend, create a new terminal and type the following command:
    1. `cd frontend`
    2. `npm install`
    3. `npm start`