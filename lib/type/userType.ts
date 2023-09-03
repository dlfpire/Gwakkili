type UserCategory = {
  categoryId: number;
  categoryName: string;
  majorId: number;
  majorName: string;
};
type UserData = {
  id: number;
  email: string;
  password: string;
  name: string;
  nickname: string;
  role: string;
  state: number;
  studentNo: number;
  category: UserCategory[];
  profileImg: string;
};

export type { UserCategory, UserData };
