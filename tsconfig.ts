{
	"compilerOptions": {
		"target": "es2016",
		"module": "es6",
		"strict": true,
		"noImplicitAny": false,
		"noEmit": true,
		"allowJs": true,
		"jsx": "preserve",
		"importHelpers": true,
		"moduleResolution": "node",
		"experimentalDecorators": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"sourceMap": true,
		"baseUrl": "./src",
		"paths": {
		  "~/*": ["./*"]
		},
		"typeRoots": [
			"node_modules/@types",
			"node_module/phaser/types"
		],
		"types": [
			"phaser"
		]
	},
	"include": [
		"src/**/*"
	]
}