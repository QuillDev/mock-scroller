import { FunctionComponent } from "react";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface IProps {
    content: string;
}

const Markdown: FunctionComponent<IProps> = ({ content }) => {
    const components: Partial<NormalComponents & SpecialComponents> = {
        // @ts-ignore
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');

            return (!inline && match) ? (
                <SyntaxHighlighter style={materialDark} PreTag="div" language={match[1]} children={String(children).replace(/\n$/, '')} {...props} />
            ) : (
                <code className={className ? className : ""} {...props}>
                    {children}
                </code>
            )
        }
    }

    return <div className="markdown-body">
        <ReactMarkdown components={components} children={content} />
    </div>
}

export default Markdown;