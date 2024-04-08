// No resource or env vars required
export const resource = {
  type: Bun.env.TYPE!,
  project_id: Bun.env.PROJECT_ID!,
  private_key_id: Bun.env.PRIVATE_KEY_ID!,
  private_key: Bun.env.PRIVATE_KEY!,
  client_email: Bun.env.CLIENT_EMAIL!,
  client_id: Bun.env.CLIENT_ID!,
  auth_uri: Bun.env.AUTH_URI!,
  token_uri: Bun.env.TOKEN_URI!,
  auth_provider_x509_cert_url: Bun.env.AUTH_PROVIDER_X509_CERT_URL!,
  client_x509_cert_url: Bun.env.CLIENT_X509_CERT_URL!,
  universe_domain: Bun.env.UNIVERSE_DOMAIN!,
};
