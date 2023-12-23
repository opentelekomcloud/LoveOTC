import { Toaster } from "@fluentui/react-components";
import { useMount } from "ahooks";
import { WebStorageStateStore } from "oidc-client-ts";
import { ReactNode, useEffect } from "react";
import { AuthProvider, hasAuthParams, useAuth } from "react-oidc-context";
import { Logger } from "~/Helpers/Logger";
import { useErrorToast } from "~/Helpers/useToast";
import { Common } from "~/ShopNet/Database";
import { useRouter } from "../Router";

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.2.1
 */
export function OIDCProvider({ children }: { children: ReactNode }): ReactNode {
  const { Rep } = useRouter();

  return (
    <AuthProvider
      client_id="loveotc"
      scope="openid profile email address phone"
      userStore={new WebStorageStateStore({ store: window.localStorage })}
      onSigninCallback={() => {
        Rep("/");
        location.reload();
      }}

      authority="https://keycloak.eco.tsi-dev.otc-service.com/realms/eco"
      post_logout_redirect_uri="https://shop.eco.tsi-dev.otc-service.com/Logout"
      redirect_uri={
        import.meta.env.DEV
          ? "http://localhost:5173/Login"
          : "https://shop.eco.tsi-dev.otc-service.com/Login"
      }
    >
      <AuthHandler />
      {children}
    </AuthProvider>
  );
}

const log = new Logger("Auth");

/**
 * @author Aloento
 * @since 1.0.0
 * @version 0.1.3
 */
function AuthHandler() {
  const auth = Common.AuthSlot = useAuth();
  const { Paths, Rep } = useRouter();
  const { dispatch } = useErrorToast(log);

  useMount(() => {
    if (Paths.at(0) === "Logout") {
      auth.removeUser();
      return Rep("/");
    }

    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      auth.signinRedirect();
    }
  });

  useEffect(() => {
    if (auth.error) {
      return dispatch({
        Message: "Failed Authenticate",
        Request: auth,
        Error: auth.error
      });
    }
  }, [auth.error]);

  return <Toaster pauseOnHover />;
}
