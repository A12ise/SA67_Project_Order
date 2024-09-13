BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "ranks" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"discount"	real,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "positions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "employees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"email"	text,
	"password"	text,
	"profile"	longtext,
	"gender_id"	integer,
	"position_id"	integer,
	CONSTRAINT "fk_positions_employees" FOREIGN KEY("position_id") REFERENCES "positions"("id"),
	CONSTRAINT "fk_genders_employees" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "members" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"phone_number"	text,
	"rank_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_ranks_members" FOREIGN KEY("rank_id") REFERENCES "ranks"("id"),
	CONSTRAINT "fk_employees_members" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "status_orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"status_order_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"price"	integer,
	"point"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "tables" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_type"	text,
	"price"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bookings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"number_of_customer"	integer,
	"package_id"	integer,
	"table_id"	integer,
	"member_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_bookings_package" FOREIGN KEY("package_id") REFERENCES "packages"("id"),
	CONSTRAINT "fk_bookings_member" FOREIGN KEY("member_id") REFERENCES "members"("id"),
	CONSTRAINT "fk_bookings_table" FOREIGN KEY("table_id") REFERENCES "tables"("id"),
	CONSTRAINT "fk_employees_booking" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"booking_id"	integer,
	"employee_id"	integer,
	"status_order_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_bookings_order" FOREIGN KEY("booking_id") REFERENCES "bookings"("id"),
	CONSTRAINT "fk_status_orders_orders" FOREIGN KEY("status_order_id") REFERENCES "status_orders"("id"),
	CONSTRAINT "fk_employees_orders" FOREIGN KEY("employee_id") REFERENCES "employees"("id")
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"product_code_id"	text,
	"product_name"	text,
	"category_id"	text,
	"employee_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_employees_product" FOREIGN KEY("employee_id") REFERENCES "employees"("id")
);
CREATE TABLE IF NOT EXISTS "order_products" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"quantity"	integer,
	"order_id"	integer,
	"product_id"	integer,
	CONSTRAINT "fk_orders_order_product" FOREIGN KEY("order_id") REFERENCES "orders"("id"),
	CONSTRAINT "fk_products_order_product" FOREIGN KEY("product_id") REFERENCES "products"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_ranks_deleted_at" ON "ranks" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_positions_deleted_at" ON "positions" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_employees_deleted_at" ON "employees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_members_deleted_at" ON "members" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_status_orders_deleted_at" ON "status_orders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_packages_deleted_at" ON "packages" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_tables_deleted_at" ON "tables" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_bookings_deleted_at" ON "bookings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_orders_deleted_at" ON "orders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_deleted_at" ON "products" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_order_products_deleted_at" ON "order_products" (
	"deleted_at"
);
COMMIT;
