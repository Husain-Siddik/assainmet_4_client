import Link from 'next/link'

import Image from 'next/image'

export default function NotFound() {
    return (
        <div className=' container px-4 mx-auto  rounded-3xl '>
            <Image className=' mx-auto' src="/notFound.gif"

                alt="Not Found"
                width={800}
                height={800}

            />
            <div className=' flex   gap-3 justify-center items-center'>

                <p>Could not find requested resource</p>

                <Link className=' border  p-2  rounded-r-lg hover:bg-green-300'

                    href="/">
                    Back To Home
                </Link>
            </div>
        </div>
    )
}