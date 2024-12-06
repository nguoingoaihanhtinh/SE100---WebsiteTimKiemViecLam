drop database workaholic;
create database workaholic;
use  workaholic;
-- NOTE CREATE USER WITH FRONTEND WITH ID = 1 BEFORE RUNNING THIS BELOW
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
(1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpKR-St3jrJVdI1BXS19aFiBwjEowCwf5SA&s', 'TechCorp', 'Technology', 'Leading tech solutions provider.', 37.7749, -122.4194, NOW(), NOW(),1),
(2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVg-MpwR4MidIjbNh56cBtGAjgQxQbWXk7Rw&s', 'HealthCare Inc.', 'Healthcare', 'Quality healthcare services.', 40.7128, -74.0060, NOW(), NOW(),1),
(3,'https://play-lh.googleusercontent.com/gsIyPP1pr6Phvc9VdJqA9v5EdyOfL0KTj-hk_gzO0yLUZgfT_KDYjpsJ2PQMBJuZdX0h', 'EduLearn', 'Education', 'Innovative e-learning platform.', 34.0522, -118.2437, NOW(), NOW(),1);

-- Insert fake jobs
INSERT INTO jobs (id,title, position, experience, schedule, salary_from, salary_to, valid_date, expired_date, company_id, jobType_id, createdAt, updatedAt) VALUES
(1,'Software Engineer','Mid-Level', '3+ years', 'Day', 60000, 90000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW()),
(2,'Data Analyst', 'Junior', '1+ years', 'Day', 45000, 70000, '2024-01-01', '2024-12-31', 2, 2, NOW(), NOW()),
(3,'Project Manager', 'Senior', '5+ years', 'Day', 80000, 120000, '2024-01-01', '2024-12-31', 3, 1, NOW(), NOW());