import Dotenv from 'dotenv-webpack'

export const webpack = {
    //other webpack configuration options
    plugins: [
        new Dotenv()
    ]
}