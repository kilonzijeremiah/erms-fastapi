export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    const user = await prisma.user.findUnique({
      where: { email }
    });

    console.log("User found:", !!user);

    if (!user) {
      return res.status(401).json({
        error: "User not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Wrong password"
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
};
