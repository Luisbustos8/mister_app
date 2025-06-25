/** @format */

type UserIdentityData = {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string;
};

type UserIdentity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: UserIdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

type AppMetadata = {
  provider: string;
  providers?: string[];
};

type UserMetadata = {
  email_verified: boolean;
};

export type SupabaseUser = {
  id: string;
  aud?: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string | null;
  phone?: string;
  confirmed_at?: string | null;
  last_sign_in_at?: string | null;
  app_metadata?: AppMetadata;
  user_metadata?: UserMetadata;
  identities?: UserIdentity[];
  created_at?: string;
  updated_at?: string;
  is_anonymous?: boolean;
};

export type SupabaseSessionData = {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
  refresh_token: string;
  user: SupabaseUser;
};
