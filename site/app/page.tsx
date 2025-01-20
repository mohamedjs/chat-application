'use client'
import Profile from "@/components/auth/profile";
import Register from "@/components/auth/register";
import Verify from "@/components/auth/verify";
import Chat from "@/components/home";
import { RootState } from "@/store/mainReducer";
import Cookie from 'js-cookie'
import { useSelector } from "react-redux";

export default function Home() {
  const {next: selectorNext} = useSelector((state: RootState) => state.auth)
  let next = Cookie.get('next') ? parseInt(Cookie.get('next')) : selectorNext

  return (
    <div>
      {/* <Profile /> */}
      {next == 1 ? <Register /> : <Verify />}
      {/* <Verify /> */}
      {/* <Chat /> */}
    </div>
  );
}
