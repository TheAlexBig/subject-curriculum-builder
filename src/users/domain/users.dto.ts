class UserDto {
  username: string;
  role: string;

  constructor(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
}

export { UserDto };
