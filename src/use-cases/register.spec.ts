import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should be able to register", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);
    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able register with same email twice", async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
