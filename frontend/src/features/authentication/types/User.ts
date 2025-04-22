interface BaseUser {
  username: string;
  first_name: string | null;
  last_name: string | null;
}

interface UserProfile extends BaseUser {
  id: number;
  email: string;
  bio: string | null;
  avatar: string | null;
}

interface UserForm extends BaseUser {
  email: string;
  bio: string | null;
  avatar: FileList | File | null;
  password: string;
  repeatPassword: string;
}

interface Login {
  email: string;
  password: string;
}

export type { UserProfile, Login, UserForm };
