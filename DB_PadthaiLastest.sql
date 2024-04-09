create database PadthaiV3;

use PadthaiV3;

CREATE TABLE `Customer` (
  `customer_id` integer PRIMARY KEY AUTO_INCREMENT,
  `customer_tel` varchar(10)
);

CREATE TABLE `Order_income` (
  `order_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_date` date NOT NULL,
  `order_time` time NOT NULL,
  `customer_id` integer
);

CREATE TABLE `Order_Detail` (
  `Detail_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `noodles_nameEN` varchar(30),
  `noodles_nameTH` varchar(30),
  `meat_nameEN` varchar(30),
  `meat_nameTH` varchar(30),
  `topping_nameEN` varchar(50),
  `topping_nameTH` varchar(50),
  `veg_nameEN` varchar(50),
  `veg_nameTH` varchar(50)
);

CREATE TABLE `Noodles_Type` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `noodles_nameEN` varchar(30) NOT NULL,
  `noodles_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `status` TINYINT(1)
);

CREATE TABLE `Meat_type` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `meat_nameEN` varchar(30) NOT NULL,
  `meat_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `status` TINYINT(1)
);

CREATE TABLE `Veg_List` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `veg_nameEN` varchar(30) NOT NULL,
  `veg_nameTH` varchar(30) NOT NULL,
  `price` integer NOT NULL,
  `status` TINYINT(1)
);

CREATE TABLE `Topping_List` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `topping_nameEN` varchar(30) NOT NULL,
  `topping_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL,
  `status` TINYINT(1)
);

CREATE TABLE `Payment` (
  `payment_id` integer PRIMARY KEY AUTO_INCREMENT,
  `total_price` integer NOT NULL,
  `order_id` integer NOT NULL,
  `status` TINYINT(1)
);

CREATE TABLE `Submit_Order` (
  `order_id` integer NOT NULL,
  `Detail_id` integer NOT NULL,
  `customer_id` integer,
  `serve` TINYINT(1)
);

ALTER TABLE `Order_income` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

ALTER TABLE `Payment` ADD FOREIGN KEY (`order_id`) REFERENCES `Order_income` (`order_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`order_id`) REFERENCES `Order_income` (`order_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`Detail_id`) REFERENCES `Order_Detail` (`Detail_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`customer_id`) REFERENCES `Order_income` (`customer_id`);


insert into Noodles_Type(noodles_nameEN, noodles_nameTH, price, status) values ('Glass Noodles', 'วุ้นเส้น', 0, 1) ,('Rice Stick Noodles', 'เส้นเล็ก', 0, 1), ('Wide Rice Noodles', 'เส้นใหญ่', 0, 1), ('Narrow rice Noodles', 'เส้นจันท์', 0, 1), ('Instant Noodles', 'บะหมี่กึ่งสำเร็จรูป', 0, 1);

insert into Meat_type(meat_nameEN, meat_nameTH, price, status) values ('Pork', 'หมู', 40, 1), ('Prawn', 'กุ้ง', 50, 1);

insert into Topping_List(topping_nameEN, topping_nameTH, price, status) values ('Roasted nuts', 'ถั่วคั่ว', 0, 1), ('Dried Salted Prawn', 'กุ้งแห้ง', 0, 1) ,('Crackling', 'กากหมู', 5, 1), ('Bean curd', 'เต้าหู้แข็ง', 0, 1);

insert into Veg_List(veg_nameEN, veg_nameTH, price, status) values ('Bean sprout', 'ถั่วงอก', 0, 1), ('Chinese Chive', 'กุยช่าย', 0, 1);