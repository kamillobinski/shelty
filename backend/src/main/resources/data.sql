-- Create admin account
INSERT INTO USER (avatar, username, first_name, last_name, email, password) VALUES ('user-avatar-default.jpg', 'admin', 'Admin', '', 'empty', '$2y$10$LrPlYkiJcKh./4rv3UNIbeXbEvXAB5hjyf.Du7Rh1MR8PIAa0.YGi')
INSERT INTO ROLE (role_id, role) VALUES (0, 'ADMIN')
INSERT INTO user_role (user_id, role_id) VALUES (1, 0)