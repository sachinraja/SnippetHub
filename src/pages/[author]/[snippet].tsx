export const getServerSideProps = async () => {
  return {
    props: {
      title: 'Flask | SnippetHub',
    },
  }
}

const SnippetPage = () => {
  return <main />
}

export default SnippetPage
