-- Create animal options
INSERT INTO SPECIES (species_name) VALUES ('dog'), ('cat')
INSERT INTO BREED (breed_name, species_id) VALUES ('Shih Tzu', 1), ('PitBull Terrier', 1)
INSERT INTO GENDER (type) VALUES ('male'), ('female'), ('unknown')
INSERT INTO COAT_LENGTH (type) VALUES ('short'), ('long')
INSERT INTO HOUSE_TRAINED (type) VALUES ('yes'), ('no'), ('unknown')
INSERT INTO SIZE (type) VALUES ('small'), ('medium'), ('large')
-- Create account roles
INSERT INTO ROLES (role_id, role) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER')
-- Create admin account
INSERT INTO USER (avatar, username, first_name, last_name, email, password) VALUES ('user-avatar-default.jpg', 'admin', 'Admin', '', 'empty', '$2y$10$LrPlYkiJcKh./4rv3UNIbeXbEvXAB5hjyf.Du7Rh1MR8PIAa0.YGi')
INSERT INTO USER_ROLE (user_id, role_id) VALUES (1, 1)
-- Create default animal profile
INSERT INTO ANIMAL (name, avatar, age, size_id, breed_id, gender_id, coat_length_id, house_trained_id, is_ready, comments) VALUES ('defaultAnimal', 'animal-avatar-default.jpg', 2, 1, 1, 1, 1, 1, 1, 'defaultText')
INSERT INTO MEDICAL_DATA (description, animal_id) VALUES ('defaultText', 1)
INSERT INTO MEDICAL_HISTORY (date, medicine, type, vet, animal_id, is_completed) VALUES ('2021-06-24', 'defaultMedicine', 'defaultType', 'defaultVet', 1, true), ('2021-06-10', 'defaultMedicine', 'defaultType', 'defaultVet', 1, false)
INSERT INTO IMAGES (animal_id, url) VALUES (1, 'default_image.jpg')
-- Create post
INSERT INTO POST_CATEGORY (category) VALUE ('defaultCategory')
INSERT INTO POST (date, text, title, author, category) VALUES ('2020-04-21', 'defaultText', 'defaultTitle', 1, 1)