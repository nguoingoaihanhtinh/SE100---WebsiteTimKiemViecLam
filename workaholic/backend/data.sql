drop database workaholic;
create database workaholic;
USE workaholic;


INSERT INTO jobtypes (id, name) VALUES
(1, 'Sales'),
(2, 'Marketing'),
(3, 'Service'),
(4, 'Human Resource'),
(5, 'Bank'),
(6, 'Technology'),
(7, 'Estate'),
(8, 'Accountant');


INSERT INTO users (user_name, email, role, avatar, cv_url, password, createdAt, updatedAt) VALUES
('Employer1', 'Employer@gmail.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer2', 'employer2@healthcare.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer3', 'employer3@edulearn.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer4', 'employer4@vinatech.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer5', 'employer5@greenviet.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer6', 'employer6@vietfood.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer7', 'employer7@techxpert.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer8', 'employer8@vietfinance.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer9', 'employer9@ecogreen.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer10', 'employer10@vinalogistics.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer11', 'employer11@smartcity.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer12', 'employer12@vietmedia.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer13', 'employer13@solartech.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer14', 'employer14@viethealth.com', 'Employer', null, null, '123123', NOW(), NOW()),
('Employer15', 'employer15@futuris.com', 'Employer', null, null, '123123', NOW(), NOW());
INSERT INTO users (user_name,email,role,avatar,cv_url,password,createdAt,updatedAt) values 
('User','User@gmail.com','User',null,null,"123123",'2024-12-08 12:20:24','2024-12-08 12:20:24');
INSERT INTO users (user_name,email,role,avatar,cv_url,password,createdAt,updatedAt) values 
('Admin','Admin@gmail.com','Admin',null,null,"123123",'2024-12-08 12:20:24','2024-12-08 12:20:24');

-- Insert companies with user_id directly linked to their employer
INSERT INTO companies (id, img, name, feild, description, longitude, lattidue, createdAt, updatedAt, user_id, address) VALUES
(1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHpKR-St3jrJVdI1BXS19aFiBwjEowCwf5SA&s', 'TechCorp', 'Technology', 'Leading tech solutions provider.', -122.4194, 37.7749, NOW(), NOW(), 1, 'Tan Phu'),
(2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVg-MpwR4MidIjbNh56cBtGAjgQxQbWXk7Rw&s', 'HealthCare Inc.', 'Healthcare', 'Quality healthcare services.', -74.0060, 40.7128, NOW(), NOW(), 2, 'Thu Duc'),
(3, 'https://play-lh.googleusercontent.com/gsIyPP1pr6Phvc9VdJqA9v5EdyOfL0KTj-hk_gzO0yLUZgfT_KDYjpsJ2PQMBJuZdX0h', 'EduLearn', 'Education', 'Innovative e-learning platform.', -118.2437, 34.0522, NOW(), NOW(), 3, 'Binh Thanh'),
(4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGyYDIZxQC2mM5_Po0owjE2bQzMLugBS3UemVZJ0k&usqp=CAE&s', 'VinaTech', 'Technology', 'Leading tech solutions in Vietnam.', 21.0285, 105.8542, NOW(), NOW(), 4, 'Hanoi'),
(5, 'https://greenviet.org/wp-content/uploads/2020/08/logo-ko%C2%B4-slogan-800x800.png', 'GreenViet', 'Agriculture', 'Organic farming solutions.', 10.8231, 106.6297, NOW(), NOW(), 5, 'Ho Chi Minh City'),
(6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTCYFoZE-I4FpVtgYhJxQ9cEpEW8hxQiAuWA&s', 'VietFood', 'Food & Beverage', 'Traditional Vietnamese food for modern tastes.', 10.0236, 105.6755, NOW(), NOW(), 6, 'Can Tho'),
(7, 'https://play-lh.googleusercontent.com/uJHltZpCJPb8PgTwvPpUGuq-QQjs2ZrS_5PG4ZyFDXCjPEUxCzO7L1ioW4A1mx54aII', 'TechXpert', 'Technology', 'Innovating the future with software solutions.', 16.0766, 108.2191, NOW(), NOW(), 7, 'Da Nang'),
(8, 'https://sf.ex-cdn.com/vietnamfinance.vn/v0.1.61/templates/themes/images/logo.png?v=1', 'VietFinance', 'Finance', 'Financial consulting and investment services.', 10.7981, 106.6822, NOW(), NOW(), 8, 'Ho Chi Minh City'),
(9, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_CsGVlJ8iEdjRr7gp64_GAWIpV07J9vHlgCg&s', 'EcoGreen', 'Environmental Services', 'Sustainable environmental solutions.', 15.9761, 108.2658, NOW(), NOW(), 9, 'Hue'),
(10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UyNzd15HSW9OnPSPgT6u-lWwHhrjeoXqZg&s', 'VinaLogistics', 'Logistics', 'Efficient and timely delivery services.', 20.9941, 106.4700, NOW(), NOW(), 10, 'Hai Phong'),
(11, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8UqPMeDdWL74fmjo3MZbOW6PqZejP2Kx57Us&s', 'SmartCity Solutions', 'Smart Cities', 'Innovative solutions for urban development.', 21.0278, 105.7461, NOW(), NOW(), 11, 'Hanoi'),
(12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa8-4Oqt_5SnpijfDJXiH4kKeL5B8H_QZtcw&s', 'VietMedia', 'Media', 'Digital marketing and media solutions.', 10.9231, 106.8691, NOW(), NOW(), 12, 'Binh Duong'),
(13, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebuFZ8MheC3Cu4EAx8ITHgKmv4GvVZZoVmQ&s', 'SolarTech Vietnam', 'Renewable Energy', 'Leading solar energy solutions in Vietnam.', 16.4595, 107.5331, NOW(), NOW(), 13, 'Nha Trang'),
(14, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGO9Bss7H3Nf3T7guC9WfuxFU798Jm5m1HA&s', 'VietHealth', 'Healthcare', 'Affordable and accessible healthcare services.', 10.7792, 106.6869, NOW(), NOW(), 14, 'Ho Chi Minh City'),
(15, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQom9PsRW5UCQeeClhi45WPhgfScZtv3tXW4Q&s', 'FuturisTech', 'Technology', 'Shaping the future with AI and robotics.', 21.0192, 105.6842, NOW(), NOW(), 15, 'Hanoi');

-- Insert fake jobs
INSERT INTO jobs (id,title, position, experience, schedule, salary_from, salary_to, valid_date, expired_date, company_id, jobType_id, createdAt, updatedAt, description) VALUES
(1,'Software Engineer','Mid-Level', 3, 'Day', 60000, 90000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW(), 'Lap trinh game'),
(2,'Data Analyst', 'Junior', 1, 'Day', 45000, 70000, '2024-01-01', '2024-12-31', 1, 2, NOW(), NOW(), 'Ve dep'),
(5,'Project Manager', 'Senior', 5, 'Day', 80000, 120000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW(),'Giong to');
select * from jobs;
Insert into applications(user_id,job_id,status,date_applied,letter,createdAt,updatedAt) values
(2,5,'pending','2024-12-31',null, NOW(), NOW()),
(1,1,'Pending','2024-12-31',null, NOW(), NOW()),
(1,2,'Pending','2024-12-31',null, NOW(), NOW());
Insert into saveds(user_id,job_id,createdAt,updatedAt) values
(1,2, NOW(), NOW()),
(1,1, NOW(), NOW()),
(1,2,NOW(), NOW());


INSERT INTO jobs (id, title, position, experience, schedule, salary_from, salary_to, valid_date, expired_date, company_id, jobType_id, createdAt, updatedAt, description) VALUES
(6, 'Frontend Developer', 'Mid-Level', 2, 'Day', 50000, 80000, '2024-01-01', '2024-12-31', 1, 1, NOW(), NOW(), 'Develop user interfaces'),
(7, 'Backend Developer', 'Senior', 4, 'Day', 70000, 100000, '2024-01-01', '2024-12-31', 1, 2, NOW(), NOW(), 'Build and maintain APIs'),
(8, 'QA Tester', 'Junior', 1, 'Day', 40000, 60000, '2024-01-01', '2024-12-31', 3, 3, NOW(), NOW(), 'Test software for bugs'),
(9, 'DevOps Engineer', 'Mid-Level', 3, 'Day', 60000, 90000, '2024-01-01', '2024-12-31', 1, 4, NOW(), NOW(), 'Manage CI/CD pipelines'),
(10, 'UI/UX Designer', 'Mid-Level', 2, 'Day', 50000, 75000, '2024-01-01', '2024-12-31', 1, 5, NOW(), NOW(), 'Design user experiences');

-- select * from users;
-- select * from companies;
-- select * from notifications;
-- select * from ratings;

-- select * from cvs;
