import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";

const graphCms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3nsgmys48em01z6h37n5su8/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        username
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export const getStaticPaths = async () => {
  const { posts } = await graphCms.request(SLUGLIST);
  return {
    paths: posts.map((post: any) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const slug = params.slug;
  const data = await graphCms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

const BlogPost = ({ post }: any) => {
  return (
    <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.avatar.url} alt={post.author.name} />
          <div className={styles.authtext}>
            <h6>By {post.author.username} </h6>
            <h6 className={styles.date}>{post.datePublished}</h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
};

export default BlogPost;
