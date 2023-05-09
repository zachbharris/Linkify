import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="h-screen w-screen flex flex-col items-center justify-center">
    <SignIn path="/login" routing="path" signUpUrl="/signup" />
  </div>
);

export default SignInPage;
