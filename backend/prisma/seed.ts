// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@ikonex.academy' },
    update: {},
    create: {
      email: 'admin@ikonex.academy',
      password: 'password123',
      name: 'Admin Ikonex',
      role: 'admin'
    }
  });

  // Create Class Streams
  const form1A = await prisma.classStream.upsert({
    where: { name: 'Form 1A' },
    update: {},
    create: { name: 'Form 1A', level: 'Form 1', capacity: 45 }
  });

  const form1B = await prisma.classStream.upsert({
    where: { name: 'Form 1B' },
    update: {},
    create: { name: 'Form 1B', level: 'Form 1', capacity: 45 }
  });

  const form2A = await prisma.classStream.upsert({
    where: { name: 'Form 2A' },
    update: {},
    create: { name: 'Form 2A', level: 'Form 2', capacity: 40 }
  });

  // Create Subjects
  const math = await prisma.subject.upsert({
    where: { code: 'MATH' },
    update: {},
    create: { name: 'Mathematics', code: 'MATH' }
  });

  const eng = await prisma.subject.upsert({
    where: { code: 'ENG' },
    update: {},
    create: { name: 'English', code: 'ENG' }
  });

  const chem = await prisma.subject.upsert({
    where: { code: 'CHEM' },
    update: {},
    create: { name: 'Chemistry', code: 'CHEM' }
  });

  const bio = await prisma.subject.upsert({
    where: { code: 'BIO' },
    update: {},
    create: { name: 'Biology', code: 'BIO' }
  });

  // Assign subjects to streams
  await prisma.streamSubject.createMany({
    data: [
      { classStreamId: form1A.id, subjectId: math.id },
      { classStreamId: form1A.id, subjectId: eng.id },
      { classStreamId: form1A.id, subjectId: chem.id },
      { classStreamId: form1B.id, subjectId: math.id },
      { classStreamId: form1B.id, subjectId: bio.id },
      { classStreamId: form2A.id, subjectId: chem.id },
    ]
  });

  // Create Sample Students
  await prisma.student.createMany({
    data: [
      {
        studentId: "IKN001",
        name: "John Kamau",
        email: "john.kamau@ikonex.academy",
        gender: "Male",
        dateOfBirth: new Date("2008-05-12"),
        classStreamId: form1A.id
      },
      {
        studentId: "IKN002",
        name: "Aisha Mwangi",
        email: "aisha.mwangi@ikonex.academy",
        gender: "Female",
        dateOfBirth: new Date("2009-01-20"),
        classStreamId: form1A.id
      },
      {
        studentId: "IKN003",
        name: "Michael Otieno",
        email: "michael.otieno@ikonex.academy",
        gender: "Male",
        dateOfBirth: new Date("2008-11-05"),
        classStreamId: form1B.id
      },
    ]
  });

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
