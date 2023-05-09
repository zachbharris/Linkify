import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center">
    <SignUp
      path="/signup"
      routing="path"
      signInUrl="/login"
      afterSignUpUrl="/api/auth/clerk/callback"
    />
  </div>
);

export default SignUpPage;
