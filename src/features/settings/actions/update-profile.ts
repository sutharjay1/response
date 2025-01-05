"use server";

import { db } from "@/db";

export const updateProfile = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (user?.email !== email) {
    throw new Error("Email cannot be changed");
  }

  try {
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        name,
      },
      include: {
        subscription: {
          select: {
            id: true,
            status: true,
            type: true,
          },
        },
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);

    throw new Error("Failed to update user");
  }
};
