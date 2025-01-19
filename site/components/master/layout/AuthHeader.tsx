import React from 'react'
import BasicHeader from './BasicHeader'
import Image from 'next/image'

const AuthHeader = ({ logo, subtitle }: { logo: any, subtitle: string }) => {
  return (
   <>
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-48 h-44 mx-auto">
              <Image src={logo.src} width={192} height={192} className="w-full" alt="Logo" />
          </div>
        </div>

        {/* Header */}
        <BasicHeader
            title="Ratatouille"
            subtitle={subtitle}
            titleClassName="text-2xl mb-4 text-foreground"
            subtitleClassName="mb-8 text-muted-foreground"
        />
   </>
  )
}

export default AuthHeader