import Head from 'next/head'

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
    </>
  )
}

export const getServerSideProps = async ({ draftMode = false }) => {
  let navItems = []

  if (navItems.length === 0) {
    return {
      redirect: {
        destination: '/collection',
        permanent: false,
      },
    }
  }

  return {
    props: {
      navItems,
    },
  }
}
