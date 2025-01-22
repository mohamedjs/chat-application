'use client'
import Profile from "@/components/auth/profile";
import Register from "@/components/auth/register";
import Verify from "@/components/auth/verify";
import Chat from "@/components/home";
import Echojs from "@/providers/Echo";
import { RootState } from "@/store/mainReducer";
import Cookie from 'js-cookie'
import { useSelector } from "react-redux";

export default function Home() {
  const {next: selectorNext} = useSelector((state: RootState) => state.auth)
  const next: number = Cookie.get('next') ? parseInt(Cookie.get('next') ?? '') : selectorNext

  Echojs.private("sms-channel")
    .listen('SmsEvent', (data: {message: string, socket: any, status: boolean}) => {
        console.log(data)        
  })

  return (
    <div>
      {next === 1 ? (
        <Register />
      ) : next === 2 ? (
        <Verify />
      ) : next === 3 ? (
        <Profile />
      ) : (
        <Chat />
      )}
    </div>
  );
}
