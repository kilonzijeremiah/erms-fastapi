// ==================== ADMIN CREATOR (New Credentials) ====================
app.get('/create-admin', async (req, res) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    const prisma = new PrismaClient();

    const email = 'admin@ikonex.academy';
    const plainPassword = 'password123';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    res.json({ 
      success: true, 
      message: 'Default admin created with new credentials!', 
      email: admin.email,
      password: plainPassword
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// =================================================================
