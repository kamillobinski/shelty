-- Create animal options
INSERT INTO SPECIES (species_name) VALUES ('dog'), ('cat')
    INSERT INTO BREED (breed_name, species_id) VALUES ('Shih Tzu', 1), ('PitBull Terrier', 1)
INSERT INTO GENDER (type) VALUES ('male'), ('female'), ('unknown')
INSERT INTO COAT_LENGTH (type) VALUES ('short'), ('long')
INSERT INTO HOUSE_TRAINED (type) VALUES ('yes'), ('no'), ('unknown')
INSERT INTO SIZE (type) VALUES ('small'), ('medium'), ('large')
-- Create admin account
INSERT INTO USER (avatar, username, first_name, last_name, email, password) VALUES ('user-avatar-default.jpg', 'admin', 'Admin', '', 'empty', '$2y$10$LrPlYkiJcKh./4rv3UNIbeXbEvXAB5hjyf.Du7Rh1MR8PIAa0.YGi')
INSERT INTO ROLES (role_id, role) VALUES ('ROLE_ADMIN')
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1)
