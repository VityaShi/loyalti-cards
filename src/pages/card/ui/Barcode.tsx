'use client'

import dynamic from 'next/dynamic'

const Barcode = dynamic(() => import('react-barcode'), { ssr: false })

export default Barcode
