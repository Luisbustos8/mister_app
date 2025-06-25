/** @format */

import type { Session, User } from "@supabase/supabase-js";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
