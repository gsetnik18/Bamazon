-- create database for bamazon
create database if not exists bamazon;

use bamazon;

-- create table for products

create table if not exists products (
    item_id integer not null auto_increment,
    product_name varchar(30) not null,
    department_name varchar(30) not null,
    price decimal(10 , 2) not null,
    stock_quantity integer not null,
    primary key (item_id)
);

select * from products;