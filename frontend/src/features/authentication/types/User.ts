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

interface UserSignupForm extends BaseUser {
  email: string;
  bio: string | null;
  avatar: FileList | File | string | null;
  password: string;
  repeatPassword: string;
}
interface UserUpdateForm extends BaseUser {
  email: string;
  bio: string | null;
  avatar: FileList | File | string | null;
  avatar_delete: boolean;
}

interface LoginForm {
  email: string;
  password: string;
}

export type { UserProfile, LoginForm, UserSignupForm, UserUpdateForm };
