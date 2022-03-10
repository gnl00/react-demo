import tv from '@/assets/img/device/icon/4.svg'
import icon3 from '@/assets/img/device/icon/3.svg'
import icon2 from '@/assets/img/device/icon/2.svg'
import icon1 from '@/assets/img/device/icon/1.svg'
import sonyBrand from '@/assets/img/device/brand/sony.svg'
import appleBrand from '@/assets/img/device/brand/apple.svg'

export const getDeviceData = () => {
  const devices = [
    {
      id: 'sony_11111222',
      icon: tv,
      brandIcon: sonyBrand,
      info: {
        brand: 'Sony',
        memory: '8GB',
        cpu: 's120',
        storage: '64GB'
      },
      extra: {
        upload: '3.46Mb',
        download: '4.12Mb'
      }
    },
    {
      id: 'apple_33333',
      icon: icon3,
      brandIcon: appleBrand,
      info: {
        brand: 'Apple',
        memory: '6GB',
        cpu: 'A120',
        storage: '128GB'
      },
      extra: {
        upload: '2.36Mb',
        download: '3.12Mb'
      }
    },
    {
      id: 'sony_2222333',
      icon: icon2,
      brandIcon: sonyBrand,
      info: {
        brand: 'Sony',
        memory: '4GB',
        cpu: 's330',
        storage: '32GB'
      },
      extra: {
        upload: '2.36Mb',
        download: '3.12Mb'
      }
    },
    {
      id: 'apple_44444',
      icon: icon1,
      brandIcon: appleBrand,
      info: {
        brand: 'Apple',
        memory: '6GB',
        cpu: 'A120',
        storage: '128GB'
      },
      extra: {
        upload: '2.36Mb',
        download: '3.12Mb'
      }
    },
  ]

  return devices
}