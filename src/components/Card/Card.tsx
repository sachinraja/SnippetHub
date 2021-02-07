import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { LanguageEnum, languages } from '@constants/language/language';

enum Language {
  python,
  javascript,
  csharp,
  elixir
}

interface CardProps {
  title: string;
  subtitle: string;
  count: string | number;
  description: string;
  language: LanguageEnum;
}

const Card = ({ title, subtitle, count, description, language }: CardProps) => {
  let header: React.MutableRefObject<HTMLDivElement> = useRef();
  let attributes: React.MutableRefObject<HTMLDivElement> = useRef();
  let [attributesFloatedRight, setAttributesFloatedRight] = useState(true);
  
  const languageData = languages[language];

  //detect flex wrap and style accordingly
  function checkFloat() {
    let attributesElement = attributes.current;

    if (attributesElement.offsetTop > header.current.offsetTop) {
      setAttributesFloatedRight(false);
    }

    else {
      setAttributesFloatedRight(true);
    }
  }

  //continue running on client on resize
  useEffect(() => {
    checkFloat();
    window.addEventListener('resize', checkFloat);
    return () => window.removeEventListener('resize', checkFloat);
  }, []);

  return (
  <div>
    <a href="https://google.com" className="block bg-opacity-80 border-carbon-500 border-1 rounded p-2 transform hover:-translate-y-0.5 hover:border-carbon-50 transition-colors duration-500 motion-reduce:transform-none">
      <div className="flex flex-wrap">
      <div className="flex-grow mr-2" ref={header}>
        <h3 className="font-mono text-gray-400 leading-none tracking-tighter text-sm">{subtitle}/</h3>
        <h2 className="font-extrabold font-mono text-lg">{title}</h2>
      </div>

      <div className={"whitespace-nowrap font-inter font-bold grid grid-cols-1 " + (attributesFloatedRight ? "justify-items-end" : "")} ref={attributes}>
        <div>
          <div className="inline-block border-blue-500 border-2 rounded-sm">
            <svg className="w-6 inline text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
            
            <p className="inline mx-1 text-blue-400">{count}</p>
          </div>
        </div>

        <div className="mt-1">
          <div className={`inline-flex items-center border-${languageData.color}-500 border-2 rounded-sm`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 my-1 w-5 inline-block" viewBox="0 0 24 24">
              <path fill={languageData.iconColor} d={languageData.icon.path}></path>
            </svg>
            
            <p className={`inline-block mx-1 text-${languageData.color}-400`}>{languageData.name}</p>
          </div>
        </div>
      </div>

      <div className="w-full items-end">
        <div className="relative h-10 w-10 top-2 left-2">
          <Image className="rounded-full" layout="fill" objectFit="cover" src="/profile_pic.png" alt="Profile Picture" />
        </div>

        <hr />
      </div>
    </div>

      <p className="mt-3">{description}</p>
    </a>
  </div>
  )
}

export default Card;