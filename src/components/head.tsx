import * as React from "react"
import { Helmet } from "react-helmet"


interface InputProps {
    title: string;
}

const Head: React.FC<InputProps> = ({ title }) => {
   return(
        <Helmet>
            <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <title>{title}</title>
        </Helmet>
    )
}

export default Head
