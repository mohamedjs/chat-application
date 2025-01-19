'use client'
import React from 'react'
import { User } from 'lucide-react'
import BasicUploadFile from '@/components/master/inputes/BasicUploadFile'
import Image from 'next/image'

const UploadImage = () => {
    const [preview, setPreview] = React.useState<string | null>(null);

  return (
    <div className="relative group cursor-pointer w-full">
      <label htmlFor="upload-profile-image" className="w-full h-40 sm:h-48 md:h-56 flex items-center justify-center mb-2 mx-auto rounded-lg">
        {preview ? (
            <Image
                width={400}
                height={400}
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain cursor-pointer  text-muted-foreground rounded-lg"
            />
        ):(
            <User className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 cursor-pointer text-muted-foreground" />
        )
        }
      </label>
      <div className="hidden">
        <BasicUploadFile
          label=""
          name="profile_picture" 
          size="lg"
          fullWidth
          className="w-full cursor-pointer"
          id={'upload-profile-image'}
          setPreview={setPreview}
        />
      </div>
      <p className="text-sm text-center text-muted-foreground">
        Uplaod Your profile Image
      </p>
    </div>
  )
}

export default UploadImage
