import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
    newUser: "/registro",
  },
});

export const config = {
  matcher: ["/inicio"],
};
