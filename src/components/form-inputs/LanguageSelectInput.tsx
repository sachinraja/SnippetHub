import Select from 'react-select'
import Paragraph from '@components/Paragraph'
import languages from '@lib/language'
import type { Language } from '@prisma/client'
import type { NamedProps as ReactSelectProps } from 'react-select'

type LanguageSelectInputProps = Partial<Omit<ReactSelectProps, 'value'>> & {
  value: Language
  onChange: ReactSelectProps['onChange']
}

const LanguageSelectInput = ({
  value: selectedValue,
  ...props
}: LanguageSelectInputProps) => {
  const options = Object.entries(languages).map(([value, language]) => {
    return {
      label: (
        <>
          <svg
            className="ml-1 my-1 w-5 inline-block"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={language.icon.path} fill={language.color.icon} />
          </svg>
          <Paragraph className="p-2 inline align-middle">
            {language.name}
          </Paragraph>
        </>
      ),
      value,
    }
  })

  return (
    // @ts-expect-error options accepts JSX, but it is typed so that it only accepts a string
    <Select
      options={options}
      value={options.filter(({ value }) => value === selectedValue)}
      styles={{
        menu: (base) => ({ ...base, position: 'relative' }),
        option: (base) => ({ ...base, cursor: 'pointer' }),
        control: (base) => ({ ...base, cursor: 'pointer' }),
      }}
      className="z-10"
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: '#171717',
          neutral20: '#565656',
          neutral80: '#a4a4a4',
          primary25: '#282828',
          primary50: '#171717',
          primary75: '#171717',
        },
      })}
      {...props}
    />
  )
}

export default LanguageSelectInput
