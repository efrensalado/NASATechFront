CREATE DATABASE NasaTechTest

USE NasaTechTest

CREATE TABLE Users (
    Id INTEGER IDENTITY, 
    RoleId INTEGER,
    FullName varchar(100), 
    Email varchar(50),
    CreateDate DATETIME, 
    Password varchar(100)
);

CREATE TABLE UserRoles (
    Id INTEGER IDENTITY, 
    RoleType varchar(15)
);

ALTER TABLE Users ADD PRIMARY KEY (Id);