import { Toaster as DefaultToaster, resolveValue } from 'react-hot-toast'
import {
  CheckIcon,
  XIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'
import { cloneElement } from 'react'
import type { ReactElement } from 'react'
import type { ToastType } from 'react-hot-toast/dist/core/types'

interface ToastTypeData {
  className: string
  icon?: ReactElement
}

const toastTypeDataMap: Record<ToastType, ToastTypeData> = {
  error: {
    className: 'bg-red-700',
    icon: <XIcon />,
  },
  success: {
    className: 'bg-green-700',
    icon: <CheckIcon />,
  },
  blank: {
    className: 'bg-blue-700',
    icon: <InformationCircleIcon />,
  },
  custom: {
    className: 'bg-carbon-700',
  },
  loading: {
    className: 'bg-carbon-700',
  },
}

const Toaster = () => (
  <DefaultToaster position="bottom-right">
    {(t) => {
      const { icon, className } = toastTypeDataMap[t.type]

      const sizedIcon = icon ? cloneElement(icon, { width: 35 }) : undefined

      return (
        <div
          className={`flex items-center text-lg rounded-md p-2 ${className}`}
        >
          {sizedIcon}
          <p>{resolveValue(t.message, t)}</p>
        </div>
      )
    }}
  </DefaultToaster>
)

export default Toaster
