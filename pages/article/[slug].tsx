import { FunctionComponent } from "react";
import fs from 'fs';
import matter from "gray-matter";
import styles from '../../styles/Article.module.css';
import Markdown from "../../components/Markdown";
import { ArticleInfo } from "../../@types/article";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";

interface IProps {
    article: ArticleInfo;
}

const Article: FunctionComponent<IProps> = ({ article }) => {
    return (
        <>
            <div className="flex">
                <aside className={"h-screen sticky top-0 bg-red-800 p-2"}>
                    <Link href={`/`}>
                        <div className={"rounded-sm bg-red-500 b-2 border-red-700 p-4"}>
                            Home
                        </div>
                    </Link>
                </aside>

                <main className="w-screen">
                    <div className={styles.article}>
                        <div className={styles.thumbnail}>
                            <img src={article.meta.thumbnail} />

                            <div className={styles.title}>
                                <h1>{article.meta.title}</h1>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <Markdown content={article.content} />
                        </div>
                    </div>
                </main>
            </div>
        </>

    )
}

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params;

    const content = fs
        .readFileSync(`uploads/${slug}.md`)
        .toString();

    const info = matter(content);

    const article = {
        meta: {
            ...info.data,
            slug
        },
        content: info.content
    }

    return {
        props: {
            article: article
        }
    }
}

export async function getStaticPaths() {
    const files = fs.readdirSync("uploads");
    const paths = files.map(file => ({
        params: {
            slug: file.split('.')[0]
        }
    }))

    return {
        paths,
        fallback: false,
    }
}

export default Article;