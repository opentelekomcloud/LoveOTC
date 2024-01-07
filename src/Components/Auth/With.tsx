import { ReactNode } from "react";
import { useAuth } from "react-oidc-context";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function AuthenticatedTemplate({ children }: { children: ReactNode }): ReactNode {
  const auth = useAuth();

  if (auth.isLoading) {
    return "Authenticating...";
  }

  if (auth.isAuthenticated) {
    return children;
  }

  return null;
}

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.0
 */
export function UnauthenticatedTemplate({ children }: { children: ReactNode }): ReactNode {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return null;
  }

  return children;
}
