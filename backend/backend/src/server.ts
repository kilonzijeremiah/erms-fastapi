// ==================== TEMPORARY ADMIN RESET (Remove after use) ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');
    const prisma = new PrismaClient();

    const email = 'admin@ikonex.com';
    const plainPassword = 'admin123';

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
      message: 'Admin password reset successfully!', 
      email: admin.email,
      password: plainPassword 
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
// =================================================================
