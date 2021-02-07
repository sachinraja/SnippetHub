import Card from '@components/Card/Card';
import { LanguageEnum } from '@constants/language/language';

const Home = () => {
  return (
      <main className="m-4">
        <div className="mb-1 flex">
          <div className="h-14">
            <svg className="w-auto h-full text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>

          <div className="text-white">
            <h1 className="capitalize font-inter font-bold text-xl">Most Popular Snippets</h1>
            <p>The snippets with the most votes.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-1 break-words text-gray-200">
          <Card title="SnippetsHub" subtitle="xCloudzx" count="513,312" description="A hub for a wide range of code snippets across many languages." language={LanguageEnum.typescript} />
          <Card title="React" subtitle="React Authors" count="456,123" description="A collection of snippets for the React JavaScript Framework." language={LanguageEnum.javascript} />
          <Card title="Vue.js" subtitle="vue_maintainers" count="3,123,412" description="Streamline your Vue.js code with these snippets to boost productivity." language={LanguageEnum.javascript} />
          <Card title="Elixir" subtitle="Elixir Framework" count="5,312" description="The emerging leader in asynchronous technology brings you these amazing snippets." language={LanguageEnum.elixir} />
          <Card title="Phoenix" subtitle="phoenix-devs" count="2,000" description={`Build rich, interactive web applications quickly, with less code and fewer moving parts. Join our growing community of developers using Phoenix to craft APIs, HTML5 apps and more, for fun or at scale.`} language={LanguageEnum.javascript}/>
          <Card title="Python Pack" subtitle="pythonistas" count="62,461,224" description="Code 5x faster than before with these blocks that greatly enhance your python experience." language={LanguageEnum.python} />
          <Card title="Node.js" subtitle="nodejs" count="9,132" description="Essential snippets for the Node.js runtime." language={LanguageEnum.javascript} />
          <Card title="Unity Blocks" subtitle="Unity" count="4,211,223" description="Supercharge your Unity experience with a multitude of easy-to-insert statements." language={LanguageEnum.csharp} />
          <Card title="Flask" subtitle="palletsprojects" count="551,231" description="Flask is a lightweight package for python web development." language={LanguageEnum.python} />
        </div>
      </main>
  )
}

export default Home;