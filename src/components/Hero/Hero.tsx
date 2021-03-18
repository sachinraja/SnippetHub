import Header from '@components/Header/Header';
import Heading from '@components/Heading/Heading';
import SearchInput from '@components/Input/SearchInput';
import Image from 'next/image';

const Hero = () => {
  return (
    <Header>
      <section className="md:w-1/2">
        <Heading priority={1} size={4} bold center={false}>
          SnippetHub
        </Heading>

        <Heading
          className="mt-3"
          priority={2}
          size={1}
          bold={false}
          center={false}
        >
          A home for snippets across various languages.
        </Heading>

        <SearchInput placeholder="Search for a snippet..." />
      </section>

      <section className="md:w-1/2">
        <div className="relative h-full">
          <Image
            layout="fill"
            objectFit="contain"
            src="/logo.svg"
            alt="SnippetsPlace Logo"
          />
        </div>
      </section>
    </Header>
  );
};

export default Hero;
