// Debug route to check admin user
app.get('/debug-admin', async (req: Request, res: Response) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const admin = await prisma.user.findUnique({ where: { email: 'admin@ikonex.com' } });
    
    res.json({
      found: !!admin,
      email: admin?.email,
      hasPassword: !!admin?.password,
      passwordLength: admin?.password?.length,
      role: admin?.role
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});
