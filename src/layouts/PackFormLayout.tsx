import Heading from '@components/Heading'
import PackForm, { PackFormProps } from '@components/forms/PackForm'
import Paragraph from '@components/Paragraph'

type PackFormLayoutProps = {
  heading: string
  subtitle: string
} & PackFormProps

const PackFormLayout = ({
  heading,
  subtitle,
  ...props
}: PackFormLayoutProps) => (
  <div className="mt-2 mb-16">
    <div className="m-auto w-3/4 sm:w-2/3">
      <header className="mt-6">
        <Heading className="font-inter" priority={1} size="3xl">
          {heading}
        </Heading>
        <Paragraph size="lg">{subtitle}</Paragraph>

        <hr className="my-5 bg-carbon-600" />
      </header>

      <PackForm {...props} />
    </div>
  </div>
)

export default PackFormLayout
