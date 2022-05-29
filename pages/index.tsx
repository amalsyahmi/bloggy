import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/blog-card";

const graphCms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3nsgmys48em01z6h37n5su8/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        username
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;
export const getStaticProps = async () => {
  const { posts } = await graphCms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mr Bloggy</title>
        <meta
          name="description"
          content="Tech Blog. Amal Syahmi. Front-end Developer. Malaysia."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.title}>
          <h1>Mr Bloggy</h1>
        </div>
        <div className={styles.subtitle}>
          <p>Tech Blog · Amal Syahmi · Front-end Developer · Malaysia</p>
        </div>
      </header>
      <main className={styles.main}>
        {posts.map((post: any) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
};

export default Home;
