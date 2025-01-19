"use client"

import * as React from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { FormStatus } from "./FormStatus"

interface BaseInputOtpProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "error" | "success"
    fullWidth?: boolean
    error?: string
    success?: string
}

export const BaseInputOtp = ({ size, variant, fullWidth, error, success , ...props}: BaseInputOtpProps) => {
  return (
    <>
        <InputOTP {...props } maxLength={6}>
        <InputOTPGroup fullWidth={fullWidth}>
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={0} />
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={1} />
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup fullWidth={fullWidth}>
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={3} />
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={4} />
            <InputOTPSlot size={size} variant={variant} fullWidth={fullWidth} index={5} />
        </InputOTPGroup>
        </InputOTP>
        <FormStatus
            message={error || success} 
            type={variant as 'error' | 'success'}
        />
    </>
   
  )
}

export default BaseInputOtp