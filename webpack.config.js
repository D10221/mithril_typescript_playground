module.exports = {
    entry: "./built/main.js",
    output: {
        path: __dirname,
        filename: "built/bundle.js"
    },
    module: {
        loaders: [			
            { test: /\.css$/, loader: "style!css" },
			{ test: /\.ts$/, loader: "ts-loader" }
        ]
    }
};  