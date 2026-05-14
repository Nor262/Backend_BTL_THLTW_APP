import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const dbUrl = new URL(process.env.DATABASE_URL || 'mysql://root:rootpassword@localhost:3306/btl_db');
    const adapter = new PrismaMariaDb({
      host: dbUrl.hostname,
      port: Number(dbUrl.port) || 3306,
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.replace('/', ''),
      connectionLimit: 10,
      allowPublicKeyRetrieval: true,
    });
    super({ adapter });
  }

}
