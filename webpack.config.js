module.exports = {
    entry: "./built/main.js",
    output: {
        path: __dirname,
        filename: "built/bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [			
            { test: /\.css$/, loader: "style!css" },
			{ test: /\.ts$/, loader: "ts-loader" }
        ]
    }
};  