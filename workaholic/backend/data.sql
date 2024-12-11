drop database workaholic;
create database workaholic;
use  workaholic;
-- NOTE CREATE USER WITH FRONTEND WITH ID = 1 BEFORE RUNNING THIS BELOW

INSERT INTO users(id,user_name, email,role,avatar,cv_url,password) VALUES
(1, 'user', 'user@gmail.com', 'User', 'https://example.com/avatar1.jpg', 'https://example.com/cv1.pdf', 'Admin123'),
(2, 'admin', 'admin@gmail.com', 'Employer', 'https://example.com/avatar2.jpg', 'https://example.com/cv2.pdf', 'Admin123');


INSERT INTO jobtypes (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Service'),
(4, 'Human Resource'),
(5, 'Bank'),
(6, 'Technology'),
(7, 'Estate'),
(8, 'Accountant');


-- Insert fake companies
INSERT INTO companies (id,img, name, feild, description, longitude, lattidue, createdAt, updatedAt,user_id) VALUES
(1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpKR-St3jrJVdI1BXS19aFiBwjEowCwf5SA&s', 'TechCorp', 'Technology', 'Leading tech solutions provider.', 37.7749, -122.4194, NOW(), NOW(),2);
-- Insert fake jobs
INSERT INTO jobs (id,title,description, position, experience, schedule, salary_from, salary_to, valid_date, expired_date, company_id, jobType_id, createdAt, updatedAt) VALUES
(3,'Software Engineer','temp','Mid-Level', 3, 'Day', 60000, 90000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW()),
(4,'Data Analyst','temp', 'Junior', 1, 'Day', 45000, 70000, '2024-01-01', '2024-12-31', 1, 2, NOW(), NOW()),
(5,'Project Manager','temp', 'Senior', 5, 'Day', 80000, 120000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW());