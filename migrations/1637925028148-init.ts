import {MigrationInterface, QueryRunner} from "typeorm";

export class init1637925028148 implements MigrationInterface {
    name = 'init1637925028148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("Id" int NOT NULL IDENTITY(1,1), "Name" varchar(255) NOT NULL, "LastName" varchar(255) NOT NULL, "Password" varchar(255) NOT NULL, "Email" varchar(255) NOT NULL, "Phone" varchar(255) NOT NULL, CONSTRAINT "PK_1e4be10b13490bd87f4cc30c142" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("Id" int NOT NULL IDENTITY(1,1), "Dni" varchar(255) NOT NULL, "Rating" decimal NOT NULL, "userId" int, CONSTRAINT "PK_4b1c357db549c97c8394ba21a1f" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_da1c78142007c621b5498c818c" ON "provider" ("userId") WHERE "userId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "product" ("Id" int NOT NULL IDENTITY(1,1), "name" varchar(255) NOT NULL, "MeasurementUnits" nvarchar(255) NOT NULL, "Quantity" int NOT NULL, "providerId" int, CONSTRAINT "PK_a22f8718d47066cb0a07aa5db66" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f70b268affe05f6e9df0dab57b" ON "product" ("providerId") WHERE "providerId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "category_product_entity" ("Id" int NOT NULL IDENTITY(1,1), "productId" int, CONSTRAINT "PK_27111f3e80317bd7ff388f48602" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("Id" int NOT NULL IDENTITY(1,1), "Name" varchar(255) NOT NULL, "providerId" int, CONSTRAINT "PK_2586ca3a9036d46879e9e354de9" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_f7c488f67a4c5f5a184d4a1207" ON "category" ("providerId") WHERE "providerId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "company" ("Id" int NOT NULL IDENTITY(1,1), "userId" int, CONSTRAINT "PK_cc53fa4fba4b0bfcf1826ad74ad" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_c41a1d36702f2cd0403ce58d33" ON "company" ("userId") WHERE "userId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "comment" ("Id" int NOT NULL IDENTITY(1,1), "Comment" varchar(255) NOT NULL, "companyId" int, "providerId" int, CONSTRAINT "PK_8c280c39a30d22fee5fc69afc54" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_providers" ("Id" int NOT NULL IDENTITY(1,1), "companyId" int, "providerId" int, CONSTRAINT "PK_ae4b472ab79a5dbec6c92bad9be" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "order_product_entity" ("Id" int NOT NULL IDENTITY(1,1), "Quantity" int NOT NULL, "orderId" int, "productId" int, CONSTRAINT "PK_da141488fba6d989a5db17cd8d2" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("Id" int NOT NULL IDENTITY(1,1), "Status" nvarchar(255) NOT NULL, "companyId" int, "productId" int, CONSTRAINT "PK_afc28933d17e1c6eddef3a138a0" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "promotion_product" ("Id" int NOT NULL IDENTITY(1,1), "Price" decimal NOT NULL, "providerId" int, "productId" int, "promotionId" int, CONSTRAINT "PK_0b190917fd5941ca6c89b74b932" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "promotion" ("Id" int NOT NULL IDENTITY(1,1), "Date" datetime NOT NULL, "Available" bit NOT NULL, "providerId" int, CONSTRAINT "PK_42c8f3e15eb754b132f6279dc2a" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "provider" ADD CONSTRAINT "FK_da1c78142007c621b5498c818c1" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_product_entity" ADD CONSTRAINT "FK_59ba19a576eaa2f10bcc1fa2385" FOREIGN KEY ("productId") REFERENCES "category"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_f7c488f67a4c5f5a184d4a12072" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9c4c535789ea39072cd9abc78ed" FOREIGN KEY ("companyId") REFERENCES "company"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_7eac536acc977123ba937de2797" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_providers" ADD CONSTRAINT "FK_5cfba912d72a80f4b9fc879100e" FOREIGN KEY ("companyId") REFERENCES "company"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_providers" ADD CONSTRAINT "FK_d45bdb4aa0361243b70763dd246" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product_entity" ADD CONSTRAINT "FK_e4ea9cb4a1793e40aaaf89a8629" FOREIGN KEY ("orderId") REFERENCES "order"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product_entity" ADD CONSTRAINT "FK_f08de4d844b5cf5159d35557fcc" FOREIGN KEY ("productId") REFERENCES "product"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_75c9ce255f89db219917013e0fc" FOREIGN KEY ("companyId") REFERENCES "company"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_963777aa2e277b9d30fa9abe0fe" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_48df77ce600eae1e8966281bb35" FOREIGN KEY ("productId") REFERENCES "product"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_24753211af0f80fdb5abc45552f" FOREIGN KEY ("promotionId") REFERENCES "promotion"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promotion" ADD CONSTRAINT "FK_7f0d60cbe6c7a2d40225859f4c4" FOREIGN KEY ("providerId") REFERENCES "provider"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" DROP CONSTRAINT "FK_7f0d60cbe6c7a2d40225859f4c4"`);
        await queryRunner.query(`ALTER TABLE "promotion_product" DROP CONSTRAINT "FK_24753211af0f80fdb5abc45552f"`);
        await queryRunner.query(`ALTER TABLE "promotion_product" DROP CONSTRAINT "FK_48df77ce600eae1e8966281bb35"`);
        await queryRunner.query(`ALTER TABLE "promotion_product" DROP CONSTRAINT "FK_963777aa2e277b9d30fa9abe0fe"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_75c9ce255f89db219917013e0fc"`);
        await queryRunner.query(`ALTER TABLE "order_product_entity" DROP CONSTRAINT "FK_f08de4d844b5cf5159d35557fcc"`);
        await queryRunner.query(`ALTER TABLE "order_product_entity" DROP CONSTRAINT "FK_e4ea9cb4a1793e40aaaf89a8629"`);
        await queryRunner.query(`ALTER TABLE "favorite_providers" DROP CONSTRAINT "FK_d45bdb4aa0361243b70763dd246"`);
        await queryRunner.query(`ALTER TABLE "favorite_providers" DROP CONSTRAINT "FK_5cfba912d72a80f4b9fc879100e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_7eac536acc977123ba937de2797"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9c4c535789ea39072cd9abc78ed"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_f7c488f67a4c5f5a184d4a12072"`);
        await queryRunner.query(`ALTER TABLE "category_product_entity" DROP CONSTRAINT "FK_59ba19a576eaa2f10bcc1fa2385"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP CONSTRAINT "FK_da1c78142007c621b5498c818c1"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TABLE "promotion_product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_product_entity"`);
        await queryRunner.query(`DROP TABLE "favorite_providers"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP INDEX "REL_c41a1d36702f2cd0403ce58d33" ON "company"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP INDEX "REL_f7c488f67a4c5f5a184d4a1207" ON "category"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "category_product_entity"`);
        await queryRunner.query(`DROP INDEX "REL_f70b268affe05f6e9df0dab57b" ON "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "REL_da1c78142007c621b5498c818c" ON "provider"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
