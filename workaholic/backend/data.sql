drop database workaholic;
create database workaholic;
use  workaholic;

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
INSERT INTO companies (img, name, feild, description, longitude, lattidue, createdAt, updatedAt) VALUES
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpKR-St3jrJVdI1BXS19aFiBwjEowCwf5SA&s', 'TechCorp', 'Technology', 'Leading tech solutions provider.', 37.7749, -122.4194, NOW(), NOW()),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVg-MpwR4MidIjbNh56cBtGAjgQxQbWXk7Rw&s', 'HealthCare Inc.', 'Healthcare', 'Quality healthcare services.', 40.7128, -74.0060, NOW(), NOW()),
('https://play-lh.googleusercontent.com/gsIyPP1pr6Phvc9VdJqA9v5EdyOfL0KTj-hk_gzO0yLUZgfT_KDYjpsJ2PQMBJuZdX0h', 'EduLearn', 'Education', 'Innovative e-learning platform.', 34.0522, -118.2437, NOW(), NOW());

-- Insert fake jobs
INSERT INTO jobs (title, rating, number_rating, position, experience, schedule, salary_from, salary_to, valid_date, expired_date, company_id, jobType_id, createdAt, updatedAt) VALUES
('Software Engineer', 4.5, 200, 'Mid-Level', '3+ years', 'Day', 60000, 90000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW()),
('Data Analyst', 4.2, 150, 'Junior', '1+ years', 'Day', 45000, 70000, '2024-01-01', '2024-12-31', 2, 2, NOW(), NOW()),
('Project Manager', 4.8, 300, 'Senior', '5+ years', 'Day', 80000, 120000, '2024-01-01', '2024-12-31', 3, 1, NOW(), NOW());