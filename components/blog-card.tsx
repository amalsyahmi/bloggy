import Link from "next/link";
// import Image from "next/image";
import styles from "../styles/BlogCard.module.css"

const BlogCard = ({
    title,
    author,
    coverPhoto,
    datePublished,
    slug
}: any) => {
    return(
        <div className={styles.card}>
            <Link href={'/posts/' + slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt="" />
                    {/* <Image
                        
                        src={coverPhoto.url}
                        alt="Cover photo"
                        // height= "25vh"
                        // width= "100%"
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        layout="fill"
                    /> */}
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} alt="" />
                        <h3>{author.username}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{datePublished}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;