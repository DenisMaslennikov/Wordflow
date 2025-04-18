interface BaseUser {
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: string;
}

interface User extends BaseUser {
  id: number;
}

export type { User };
