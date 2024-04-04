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
  `noodles_nameEN` varchar(30) PRIMARY KEY NOT NULL,
  `noodles_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL
);

CREATE TABLE `Meat_type` (
  `meat_nameEN` varchar(30) PRIMARY KEY NOT NULL,
  `meat_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL
);

CREATE TABLE `Veg_List` (
  `veg_nameEN` varchar(30) PRIMARY KEY NOT NULL,
  `veg_nameTH` varchar(30) NOT NULL,
  `price` integer NOT NULL
);

CREATE TABLE `Topping_List` (
  `topping_nameEN` varchar(30) PRIMARY KEY NOT NULL,
  `topping_nameTH` varchar(30) NOT NULL,
  `price` int NOT NULL
);

CREATE TABLE `Payment` (
  `payment_id` integer PRIMARY KEY AUTO_INCREMENT,
  `payment_method` varchar(20) NOT NULL,
  `total_price` integer NOT NULL,
  `order_id` integer NOT NULL
);

CREATE TABLE `Submit_Order` (
  `order_id` integer NOT NULL,
  `Detail_id` integer NOT NULL,
  `customer_id` integer
);

ALTER TABLE `Order_income` ADD FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`);

ALTER TABLE `Payment` ADD FOREIGN KEY (`order_id`) REFERENCES `Order_income` (`order_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`order_id`) REFERENCES `Order_income` (`order_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`Detail_id`) REFERENCES `Order_Detail` (`Detail_id`);

ALTER TABLE `Submit_Order` ADD FOREIGN KEY (`customer_id`) REFERENCES `Order_income` (`customer_id`);


insert into Noodles_Type(noodles_nameEN, noodles_nameTH, price) values ('Glass Noodles', 'วุ้นเส้น', 0) ,('Rice Stick Noodles', 'เส้นเล็ก', 0), ('Wide Rice Noodles', 'เส้นใหญ่', 0), ('Narrow rice Noodles', 'เส้นจันท์', 0), ('Instant Noodles', 'บะหมี่กึ่งสำเร็จรูป', 0);

insert into Meat_type(meat_nameEN, meat_nameTH, price) values ('Pork', 'หมู', 40), ('Prawn', 'กุ้ง', 50);

insert into Topping_List(topping_nameEN, topping_nameTH, price) values ('Roasted nuts', 'ถั่วคั่ว', 0), ('Dried Salted Prawn', 'กุ้งแห้ง', 0) ,('Crackling', 'กากหมู', 5), ('Bean curd', 'เต้าหู้แข็ง', 0);

insert into Veg_List(veg_nameEN, veg_nameTH, price) values ('Bean sprout', 'ถั่วงอก', 0), ('Chinese Chive', 'กุยช่าย', 0);