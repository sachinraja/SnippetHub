import Heading from '@components/Heading/Heading';
import SearchInput from '@components/Input/SearchInput';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-carbon-800 to-carbon-900 py-10">
      <div className="d-block m-auto ml-14">
        <Heading priority={1} size={4} bold center={false}>
          SnippetHub
        </Heading>

        <Heading
          priority={2}
          className="mt-3"
          size={1}
          bold={false}
          center={false}
        >
          A home for snippets across various languages.
        </Heading>

        <SearchInput placeholder="Search for a snippet..." />
      </div>
    </div>
  );
};

export default Hero;
