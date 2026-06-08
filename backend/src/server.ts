app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("=================================");
    console.log("LOGIN ATTEMPT");
    console.log("EMAIL RECEIVED:", email);
    console.log("PASSWORD RECEIVED:", password);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    console.log("USER FOUND:", user);

    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password.trim(),
      user.password
    );

    console.log("PASSWORD HASH:", user.password);
    console.log("PASSWORD MATCH:", passwordMatch);

    if (!passwordMatch) {
      console.log("PASSWORD INCORRECT");

      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    console.log("LOGIN SUCCESS");

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});
