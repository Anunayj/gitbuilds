const emptyCommit = require('make-empty-github-commit')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  app.on(
    ["installation_repositories.added"],
    async (context) => {
      const { payload } = context;
      for(repo of payload.repositories_added){
        repo_name = repo.full_name.split('/');
        await context.octokit.repos.createOrUpdateFileContents({
            owner:repo_name[0],
            repo: repo_name[1],
            path:'empty.txt',
            message:"Trigger Docker Build",
            content:'',
        }).catch(e => console.log(e));
      }
    })
};
