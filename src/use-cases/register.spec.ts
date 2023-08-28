import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      user.password_hash,
      "123456",
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});