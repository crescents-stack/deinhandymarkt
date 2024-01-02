import CirclesTriangle from "@/components/assets/auth/circles-triangle";
import Toggler from "@/components/atoms/toggler";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="py-[90px]">
      <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-center gap-[32px]">
          <CirclesTriangle className="max-w-[150px] h-auto" />
          <div className="max-w-[250px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-primary font-bold">
              Login
            </h1>
            <p className="text-[14px] md:text-[20px] font-medium">
              Don&apos;t have account? please&nbsp;
              <span className="text-[14px] md:text-[20px] font-bold text-secondary">
                register here
              </span>
            </p>
          </div>
        </div>
        <div className="p-[40px] rounded-[10px] border border-dark_gray backdrop-blur shadow-md max-w-[550px]">
          <form className="flex flex-col gap-[32px]">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input name="email" placeholder="e.g. johndeo@example.com" />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" />
            </div>
            <div className="grid grid-cols-1 gap-[16px]">
              <div className="flex items-center justify-between gap-[10px]">
                <Toggler text="Remember me" textSize="" />
                <Link href="/auth/forgot-password" className="mt-[-15px]">
                  Forgot password?
                </Link>
              </div>
              <Button>Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
