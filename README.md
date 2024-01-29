# Jake Schlaerth's Portfolio

Welcome to my portfolio website.

## Development

### Prerequisites

To run this site locally, the following tools must be installed on your machine:

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [docker](https://docs.docker.com/engine/install/)
- [taskfile](https://taskfile.dev/installation/)

### Starting the Development Server

To begin local development:

```shell
git clone https://github.com/jake-schlaerth/portfolio.git
cd portfolio
task dev
```

- Clone the repository.

- Navigate to the root of the cloned directory.

- Run `task dev`.

This will start the development server. It can be accessed in a browser at https://jakeschlaerth.localhost.

## Deployments

I use AWS CodePipeline to enable continuous deployment. A push to the `main` branch triggers an automatic deployment to [jakeschlaerth.com](https://jakeschlaerth.com).

## Contributing

Feel free to contribute to this project by submitting pull requests or reporting issues. Your contributions are welcome and appreciated. I will be shocked if anyone actually does this.
