import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu cũ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Tạo users với password đã được hash
  const password = await bcrypt.hash('123123123Tt@', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'test1@example.com',
      firstName: 'Test',
      lastName: 'User 1',
      password: password,
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'This is my first post',
            published: true,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'test2@example.com',
      firstName: 'Test',
      lastName: 'User 2',
      password: password,
      posts: {
        create: [
          {
            title: 'Hello World',
            content: 'This is a test post',
            published: true,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      password: password,
      posts: {
        create: [
          {
            title: 'Admin Post',
            content: 'This is an admin post',
            published: true,
          },
        ],
      },
    },
  });

  console.log('Created users:', { user1, user2, user3 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
