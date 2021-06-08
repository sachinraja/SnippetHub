import Select from 'react-select'
import Paragraph from '@components/Paragraph'
import languages from '@lib/language'
import type { Props as ReactSelectProps } from 'react-select'

type LanguageSelectInputProps = {
  value: string
  onChange: ReactSelectProps['onChange']
}

const LanguageSelectInput = ({
  value: languageValue,
  ...props
}: LanguageSelectInputProps) => {
  const options = Object.entries(languages).map(([value, language]) => {
    return {
      value,
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
    }
  })

  return (
    <Select
      options={options as any}
      defaultValue={
        options.filter(({ value }) => value === languageValue) as any
      }
      styles={{ menu: (base) => ({ ...base, position: 'relative' }) }}
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
