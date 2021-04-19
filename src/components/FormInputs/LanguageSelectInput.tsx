import { Language } from '@prisma/client'
import Paragraph from '@components/Paragraph/Paragraph'
import Select from 'react-select'
import languages from '@lib/language/language'

const LanguageSelectInput = (props: any) => {
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
            <path d={language.icon.path} fill={language.iconColor} />
          </svg>
          <Paragraph className="p-2 inline align-middle" size={3}>
            {language.name}
          </Paragraph>
        </>
      ),
    }
  })
  return (
    <Select
      options={options}
      defaultValue={options.filter(
        ({ value }) => value === Language.javascript,
      )}
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
