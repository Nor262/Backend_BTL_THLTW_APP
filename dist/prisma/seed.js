"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const bcrypt = __importStar(require("bcrypt"));
const dbUrl = new URL(process.env.DATABASE_URL || 'mysql://root:rootpassword@localhost:3306/btl_db');
const adapter = new adapter_mariadb_1.PrismaMariaDb({
    host: dbUrl.hostname,
    port: Number(dbUrl.port) || 3306,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    connectionLimit: 10,
});
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const salt = await bcrypt.genSalt();
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            email: 'admin@ptit.edu.vn',
            password_hash: await bcrypt.hash('admin123', salt),
            full_name: 'Quản trị viên',
            role: 'admin',
        },
    });
    const storekeeper = await prisma.user.upsert({
        where: { username: 'storekeeper01' },
        update: {},
        create: {
            username: 'storekeeper01',
            email: 'storekeeper01@ptit.edu.vn',
            password_hash: await bcrypt.hash('store123', salt),
            full_name: 'Nguyễn Văn Kho',
            role: 'storekeeper',
        },
    });
    const borrower = await prisma.user.upsert({
        where: { username: 'sinhvien01' },
        update: {},
        create: {
            username: 'sinhvien01',
            email: 'sinhvien01@ptit.edu.vn',
            password_hash: await bcrypt.hash('sv123456', salt),
            full_name: 'Trần Thị Sinh Viên',
            role: 'borrower',
        },
    });
    console.log('✅ Seeded 3 accounts:');
    console.log(`  Admin:       admin / admin123       (id=${admin.id})`);
    console.log(`  Storekeeper: storekeeper01 / store123 (id=${storekeeper.id})`);
    console.log(`  Borrower:    sinhvien01 / sv123456   (id=${borrower.id})`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map