// ==================== ADMIN RESET ====================
app.get('/create-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const bcrypt = await import('bcryptjs');

    const prisma = new PrismaClient();

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const user = await prisma.user.upsert({
      where: {
        email: 'admin@ikonex.com'
      },
      update: {
        password: hashedPassword
      },
      create: {
        email: 'admin@ikonex.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

// DEBUG USERS
app.get('/debug-users', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');

    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    res.json(users);

  } catch (error: any) {
    res.status(500).json({
      error: error.message
    });
  }
});
// =====================================================
