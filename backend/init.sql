DROP TABLE Posts_Create;
DROP TABLE Connections;
DROP TABLE Joins;
DROP TABLE Applies;
DROP TABLE Jobs;
DROP TABLE User_Groups;
DROP TABLE Reviews;
DROP TABLE Recommendations;
DROP TABLE Employees_Hire;
DROP TABLE Companies;
DROP TABLE Users;
DROP TABLE Post_Type_Constraints;
DROP TABLE Industry_Professions;
DROP TABLE AreaCodes;

CREATE TABLE User_Groups (
	groupID int NOT NULL AUTO_INCREMENT,
	memberNum int,
	groupName varchar(40),
	UNIQUE(groupName),
	PRIMARY KEY(groupID)
);

CREATE TABLE AreaCodes (
	acode varchar(20),
	city varchar(100),
	PRIMARY KEY(acode)
);

CREATE TABLE Post_Type_Constraints (
	post_type varchar(100),
	word_limit int,
	PRIMARY KEY(post_type)
);

CREATE TABLE Users (
	username varchar(40) NOT NULL,
	pw varchar(20) NOT NULL,
	phone char(12) NULL,
	acode varchar(20) NULL,
	fullname varchar(40) NULL,
	UNIQUE(phone, acode),
	PRIMARY KEY(username),
	FOREIGN KEY(acode) REFERENCES AreaCodes(acode) ON DELETE SET NULL ON UPDATE CASCADE
);
-- grant select on users to public;

CREATE TABLE Posts_Create (
	postID int NOT NULL AUTO_INCREMENT,
	username varchar(40) NOT NULL,
	media varchar(300),
	title varchar(100),
	text_content varchar(500),
	post_type varchar(100),
	PRIMARY KEY(postID),
	FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE,
	FOREIGN KEY(post_type) REFERENCES Post_Type_Constraints(post_type) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Companies (
	username varchar(40),
	employeeNum int,
	companyID int NOT NULL AUTO_INCREMENT,
	UNIQUE(companyID),
	PRIMARY KEY(username),
	FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE
);

CREATE TABLE Industry_Professions (
	profession varchar(100),
	industry varchar(100),
	PRIMARY KEY(profession)
);

CREATE TABLE Employees_Hire (
	username varchar(40),
	age int,
	employeeID int NOT NULL AUTO_INCREMENT,
	cv_media varchar(400),
	profession varchar(100),
	username_comp varchar(100),
	position varchar(100),
	UNIQUE(employeeID),
	PRIMARY KEY(username),
	FOREIGN KEY(username) REFERENCES Users(username) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(username_comp) REFERENCES Companies(username) ON DELETE SET NULL,
	FOREIGN KEY(profession) REFERENCES Industry_Professions(profession) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Connections (
	username_1 varchar(40),
	username_2 varchar(40),
	status varchar(100),
	PRIMARY KEY(username_1, username_2),
	FOREIGN KEY(username_1) REFERENCES Employees_Hire(username) ON DELETE CASCADE,
	FOREIGN KEY(username_2) REFERENCES Employees_Hire(username) ON DELETE CASCADE
);

CREATE TABLE Joins (
	groupID int,
	username varchar(40),
	PRIMARY KEY(groupID, username),
	FOREIGN KEY(username) REFERENCES Users(username),
	FOREIGN KEY(groupID) REFERENCES User_Groups(groupID)
);

CREATE TABLE Jobs (
	username varchar(100) NOT NULL,
	title varchar(100),
	salary int,
	location varchar(100),
	PRIMARY KEY(username, title, location),
	FOREIGN KEY(username) REFERENCES Companies(username)
);

CREATE TABLE Applies (
	username_comp varchar(40),
	username_emp varchar(40),
	title char(100),
	status varchar(100),
	PRIMARY KEY(username_comp, username_emp, title),
	FOREIGN KEY(username_emp) REFERENCES Employees_Hire(username) ON DELETE CASCADE,
	FOREIGN KEY(username_comp, title) REFERENCES Jobs(username, title) ON DELETE CASCADE
);

CREATE TABLE Recommendations (
	recommendationID int NOT NULL AUTO_INCREMENT,
	username_comp varchar(40) NOT NULL,
	username_emp varchar(40) NOT NULL,
	content varchar(500),
	PRIMARY KEY(recommendationID),
	FOREIGN KEY(username_comp) REFERENCES Companies(username) ON DELETE CASCADE,
	FOREIGN KEY(username_emp) REFERENCES Employees_Hire(username) ON DELETE CASCADE
);

CREATE TABLE Reviews (
	reviewID int NOT NULL AUTO_INCREMENT,
	username_comp varchar(40) NOT NULL,
	username_emp varchar(40) NOT NULL,
	content varchar(500),
	PRIMARY KEY(reviewID),
	FOREIGN KEY(username_comp) REFERENCES Companies(username) ON DELETE CASCADE,
	FOREIGN KEY(username_emp) REFERENCES Employees_Hire(username) ON DELETE CASCADE
);

INSERT INTO User_Groups VALUES(NULL, 40, "About Graphic Design");
INSERT INTO User_Groups VALUES(NULL, 50, "HR World");
INSERT INTO User_Groups VALUES(NULL, 20, "The Economists");
INSERT INTO User_Groups VALUES(NULL, 40, "Pride and Prejudice");
INSERT INTO User_Groups VALUES(NULL, 60, "Game Developers");

INSERT INTO Post_Type_Constraints VALUES("hiring", 1000);
INSERT INTO Post_Type_Constraints VALUES("article", 2000);
INSERT INTO Post_Type_Constraints VALUES("post", 500);
INSERT INTO Post_Type_Constraints VALUES("announcement", 500);
INSERT INTO Post_Type_Constraints VALUES("news", 500);

INSERT INTO Industry_Professions VALUES("Graphic Designer", "Media");
INSERT INTO Industry_Professions VALUES("Financial Analyst", "Finance");
INSERT INTO Industry_Professions VALUES("Corporate Counsel", "Legal");
INSERT INTO Industry_Professions VALUES("Recruiter", "HR");
INSERT INTO Industry_Professions VALUES("Software Engineer", "Technology");

INSERT INTO AreaCodes VALUES("604", "Vancouver");
INSERT INTO AreaCodes VALUES("209", "California");
INSERT INTO AreaCodes VALUES("650", "Palo Alto");
INSERT INTO AreaCodes VALUES("416", "Toronto");
INSERT INTO AreaCodes VALUES("514", "Montreal");

INSERT INTO Users VALUES('johndoe', 'johndoe5', '6047551234', '604', 'John Doe');
INSERT INTO Users VALUES('janedoe', 'janedoe3', '6042883912', '604', 'Jane Doe');
INSERT INTO Users VALUES('jack123', 'jack4', '5143181234', '514', 'Jack Hunt');
INSERT INTO Users VALUES('will_iam', 'wil-99', '4166048912', '416', 'William');
INSERT INTO Users VALUES('geek42', 'nerdy.19', '2093831123', '209', 'Timothee');

INSERT INTO Users VALUES('zoom_official', 'zoom123', '4166048976', '416', 'Zoom');
INSERT INTO Users VALUES('apple_official', 'apple123', '6509987632', '650', 'Apple');
INSERT INTO Users VALUES('slack_official', 'slack123', '6047780987', '604', 'Slack');
INSERT INTO Users VALUES('google_official', 'google123', '6509871234', '650', 'Google');
INSERT INTO Users VALUES('amazon_official', 'amazon123', '2090987654', '209', 'Amazon');

INSERT INTO Companies VALUES("zoom_official", 1000000, NULL);
INSERT INTO Companies VALUES("apple_official", 4000000, NULL);
INSERT INTO Companies VALUES("slack_official", 500000, NULL);
INSERT INTO Companies VALUES("google_official", 30000000, NULL);
INSERT INTO Companies VALUES("amazon_official", 50000000, NULL);

INSERT INTO Employees_Hire VALUES("johndoe", 30, NULL, ":/databaseCV/1", "Graphic Designer", "zoom_official", "Senior");
INSERT INTO Employees_Hire VALUES("janedoe", 23, NULL, NULL, "Financial Analyst", "apple_official", "Junior");
INSERT INTO Employees_Hire VALUES("jack123", 25, NULL, ":/databaseCV/3", "Corporate Counsel", "slack_official", "Manager"); 
INSERT INTO Employees_Hire VALUES("will_iam", 28, NULL, ":/databaseCV/4", "Recruiter", "google_official", "Senior");
INSERT INTO Employees_Hire VALUES("geek42", 40, NULL, ":/databaseCV/5", "Software Engineer", "amazon_official", "Junior");

INSERT INTO Connections VALUES("geek42", "janedoe", "approved");
INSERT INTO Connections VALUES("will_iam", "jack123", "pending");
INSERT INTO Connections VALUES("johndoe", "geek42", "declined");
INSERT INTO Connections VALUES("janedoe", "will_iam", "approved");
INSERT INTO Connections VALUES("jack123", "geek42", "pending");

INSERT INTO Joins VALUES(1, "johndoe");
INSERT INTO Joins VALUES(2, "janedoe");
INSERT INTO Joins VALUES(3, "jack123");
INSERT INTO Joins VALUES(4, "will_iam");
INSERT INTO Joins VALUES(5, "geek42");

INSERT INTO Jobs VALUES("zoom_official", "Software Engineer", 4700, "Vancouver");
INSERT INTO Jobs VALUES("apple_official", "Graphic Designer", 3500, "California");
INSERT INTO Jobs VALUES("slack_official", "Recruiter", 5000, "Palo Alto");
INSERT INTO Jobs VALUES("google_official", "Software Engineer", 7300, "Toronto");
INSERT INTO Jobs VALUES("amazon_official", "Software Engineer", 5300, "Montreal");

INSERT INTO Applies VALUES("zoom_official", "johndoe", "Software Engineer", "pending");
INSERT INTO Applies VALUES("apple_official", "janedoe", "Graphic Designer", "rejected");
INSERT INTO Applies VALUES("slack_official", "jack123", "Recruiter", "accepted");
INSERT INTO Applies VALUES("google_official", "will_iam", "Software Engineer", "pending");
INSERT INTO Applies VALUES("amazon_official", "geek42", "Software Engineer", "interview");

INSERT INTO Recommendations VALUES(NULL, "zoom_official", "johndoe", "Great employee");
INSERT INTO Recommendations VALUES(NULL, "apple_official", "janedoe", "Greak work ethic");
INSERT INTO Recommendations VALUES(NULL, "slack_official", "jack123", "Team player");
INSERT INTO Recommendations VALUES(NULL, "google_official", "will_iam", "Always on time");
INSERT INTO Recommendations VALUES(NULL, "amazon_official", "geek42", "A pleasure to have");

INSERT INTO Reviews VALUES(NULL, "zoom_official", "johndoe", "Good company");
INSERT INTO Reviews VALUES(NULL, "apple_official", "janedoe", "Amazing work environment!");
INSERT INTO Reviews VALUES(NULL, "slack_official", "jack123", "High pay, balanced workload");
INSERT INTO Reviews VALUES(NULL, "google_official", "will_iam", "A place where you can grow");
INSERT INTO Reviews VALUES(NULL, "amazon_official", "geek42", "Proud to be in this amazing company. Offers very good pay");

INSERT INTO Posts_Create VALUES(NULL, "zoom_official", ":/database/Media/1", "Looking for a Software Engineer", "We are looking for a Software Engineer. Click the link below to apply if you have the required qualifications", "hiring");
INSERT INTO Posts_Create VALUES(NULL, "geek42", NULL, "My Daily Share", "Very glad to announce that I have jouned Amazon today", "post");
INSERT INTO Posts_Create VALUES(NULL, "apple_official", NULL, "New Product", "Take a peek at the all new iPhone 42", "announcement");
INSERT INTO Posts_Create VALUES(NULL, "google_official", NULL, "We are Hiring", "Looking for creative minds to join the company. Apply today by clicking the link below", "hiring");
INSERT INTO Posts_Create VALUES(NULL, "johndoe", NULL, "Random Thought", "Hi everyone, good morning!", "post");

-- insert into users
-- values ('213-46-8915', 'Green', 'Marjorie',
-- '415 986-7020', '309 63rd St. #411', 'Oakland', 'CA', '94618');
 